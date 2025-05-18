import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Firestore, collection, query, orderBy, collectionData } from '@angular/fire/firestore';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
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

  constructor(private fb: FormBuilder, private firestore: Firestore) {
    this.filterForm = this.fb.group({
      city: [''],
      eventName: ['']
    });
  }

  ngOnInit(): void {
    // 1. Lekérdezés: Helyszínek rendezése (orderBy)
    const locationsQuery = query(
      collection(this.firestore, 'locations'),
      orderBy('name', 'asc')
    );
    const locations$ = collectionData(locationsQuery, { idField: 'id' }) as Observable<Location[]>;

    // 2. Lekérdezés: Látnivalók rendezése (orderBy)
    const attractionsQuery = query(
      collection(this.firestore, 'attractions'),
      orderBy('name', 'asc')
    );
    const attractions$ = collectionData(attractionsQuery, { idField: 'id' }) as Observable<Attraction[]>;

    // 3. Lekérdezés: Események rendezése (orderBy)
    const eventsQuery = query(
      collection(this.firestore, 'events'),
      orderBy('date', 'asc')
    );
    const events$ = collectionData(eventsQuery, { idField: 'id' }) as Observable<Event[]>;

    // Helyszínek külön előfizetése a legördülő menühöz
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

    // Kombináljuk a lekérdezéseket a szűrési logikához
    combineLatest([locations$, attractions$, events$, this.filterForm.valueChanges])
      .pipe(
        map(([locations, attractions, events, filters]) => {
          console.log('Lekért helyszínek:', locations);
          console.log('Lekért látnivalók:', attractions);
          console.log('Lekért események:', events);
          console.log('Aktuális szűrők:', filters);

          // Látnivalókhoz eseményeket rendelünk
          const enrichedAttractions = attractions.map(attraction => {
            const attractionEvents = events
              .filter(event => String(event.attractionId) === String(attraction.id))
              .map(event => ({
                ...event,
                date: event.date instanceof Timestamp ? event.date.toDate() : new Date(event.date)
              }));
            return { ...attraction, events: attractionEvents };
          });

          // Szűrési logika
          return enrichedAttractions.filter(attraction => {
            // Város szűrés
            const matchesCity = !filters.city || String(attraction.locationId) === String(filters.city);

            // Esemény szűrés
            const matchesEvent = !filters.eventName || attraction.events.some(event =>
              event.name.toLowerCase().includes(filters.eventName.toLowerCase())
            );

            return matchesCity && matchesEvent;
          });
        })
      )
      .subscribe({
        next: filteredAttractions => {
          this.filteredAttractions = filteredAttractions;
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

  onEventsToggled(event: { attractionId: number, isOpen: boolean }): void {
    const attraction = this.filteredAttractions.find(attr => attr.id === event.attractionId);
    console.log(`Események ${event.isOpen ? 'lenyitva' : 'bezárva'} a következő látnivalónál: ${attraction?.name}`);
  }
}