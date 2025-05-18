import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Firestore, collection, query, orderBy, collectionData } from '@angular/fire/firestore';
import { Observable, combineLatest } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { Attraction } from '../../models/attraction.model';
import { Location } from '../../models/location.model';
import { Event } from '../../models/event.model';
import { AttractionCardComponent } from '../../shared/attraction-card/attraction-card.component';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-kereses',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    AttractionCardComponent
  ],
  templateUrl: './kereses.component.html',
  styleUrls: ['./kereses.component.scss']
})
export class KeresesComponent implements OnInit {
  filterForm: FormGroup;
  locations: Location[] = [];
  filteredAttractions: Attraction[] = [];
  isLoading = true;
  error: string | null = null;
  showEventsByDefault = false;
  truncateLength = 100;
  private snackBarQueue: { message: string; action: string; duration: number }[] = [];
  private isShowingSnackBar = false;

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private snackBar: MatSnackBar
  ) {
    this.filterForm = this.fb.group({
      city: [''],
      eventName: ['']
    });
  }

  ngOnInit(): void {
    // Helyszínek betöltése
    const locationsQuery = query(collection(this.firestore, 'locations'), orderBy('name', 'asc'));
    const locations$ = collectionData(locationsQuery, { idField: 'id' }) as Observable<Location[]>;

    locations$.subscribe({
      next: locations => {
        this.locations = locations;
        console.log('Helyszínek betöltve:', this.locations);
      },
      error: error => {
        this.error = 'Hiba a helyszínek betöltése közben: ' + error.message;
        console.error('Hiba:', error);
      }
    });

    // Szűrők figyelése és szűrt látnivalók betöltése
    this.filterForm.valueChanges.pipe(debounceTime(300)).subscribe(filters => {
      this.isLoading = true;
      this.loadFilteredAttractions(filters);
    });

    // Kezdeti szűrés üres szűrőkkel
    this.loadFilteredAttractions({ city: '', eventName: '' });
  }

  private loadFilteredAttractions(filters: { city: string; eventName: string }): void {
    const attractionsQuery = query(
      collection(this.firestore, 'attractions'),
      orderBy('name', 'asc')
    );
    const attractions$ = collectionData(attractionsQuery, { idField: 'id' }) as Observable<Attraction[]>;

    const eventsQuery = query(
      collection(this.firestore, 'events'),
      orderBy('date', 'asc')
    );
    const events$ = collectionData(eventsQuery, { idField: 'id' }) as Observable<Event[]>;

    combineLatest([attractions$, events$])
      .pipe(
        map(([attractions, events]) => {
          const filteredAttractions = attractions
            .filter(attraction => {
              const matchesCity = filters.city ? String(attraction.locationId) === String(filters.city) : true;
              const attractionEvents = events.filter(event => String(event.attractionId) === String(attraction.id));
              const matchesEventName = filters.eventName
                ? attractionEvents.some(event =>
                    event.name.toLowerCase().includes(filters.eventName.toLowerCase())
                  ) || attraction.name.toLowerCase().includes(filters.eventName.toLowerCase())
                : true;
              return matchesCity && matchesEventName;
            })
            .map(attraction => {
              const attractionEvents = events
                .filter(event => String(event.attractionId) === String(attraction.id))
                .map(event => ({
                  ...event,
                  date: event.date instanceof Timestamp ? event.date.toDate() : new Date(event.date)
                }));
              return { ...attraction, events: attractionEvents };
            });
          return filteredAttractions;
        })
      )
      .subscribe({
        next: attractions => {
          this.filteredAttractions = attractions;
          this.isLoading = false;
          console.log('Szűrt látnivalók:', this.filteredAttractions);
        },
        error: error => {
          this.error = 'Hiba az adatok betöltése közben: ' + error.message;
          this.isLoading = false;
          console.error('Hiba:', error);
        }
      });
  }

  private showNextSnackBar(): void {
    if (this.snackBarQueue.length === 0 || this.isShowingSnackBar) {
      return;
    }

    this.isShowingSnackBar = true;
    const { message, action, duration } = this.snackBarQueue.shift()!;
    this.snackBar.open(message, action, { duration }).afterDismissed().subscribe(() => {
      this.isShowingSnackBar = false;
      this.showNextSnackBar();
    });
  }

  private queueSnackBar(message: string, action: string = 'OK', duration: number = 3000): void {
    this.snackBarQueue.push({ message, action, duration });
    this.showNextSnackBar();
  }

  onPanelStateChanged(event: { attractionId: number, isOpen: boolean }): void {
    const attraction = this.filteredAttractions.find(attr => attr.id === event.attractionId);
    const message = `Események panel ${event.isOpen ? 'lenyitva' : 'bezárva'}: ${attraction?.name || 'Ismeretlen látnivaló'}`;
    console.log(message);
    this.queueSnackBar(message);
  }

  onAttractionClicked(attractionId: number): void {
    const attraction = this.filteredAttractions.find(attr => attr.id === attractionId);
    const message = `${attraction?.name || 'Ismeretlen látnivaló'}`;
    console.log(message);
    this.queueSnackBar(message);
  }

  onImageClicked(attractionId: number): void {
    const attraction = this.filteredAttractions.find(attr => attr.id === attractionId);
    const message = `${attraction?.name || 'Ismeretlen látnivaló'}`;
    console.log(message);
    this.queueSnackBar(message);
  }
}