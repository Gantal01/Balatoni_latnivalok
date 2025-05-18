import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, query, where, orderBy, collectionData } from '@angular/fire/firestore';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Attraction } from '../../models/attraction.model';
import { Location } from '../../models/location.model';
import { Event } from '../../models/event.model';
import { AttractionCardComponent } from '../../shared/attraction-card/attraction-card.component';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-del',
  standalone: true,
  imports: [MatCardModule, CommonModule, AttractionCardComponent],
  templateUrl: './del.component.html',
  styleUrls: ['./del.component.scss']
})
export class DelComponent implements OnInit {
  southAttractions: Attraction[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const locationsQuery = query(
      collection(this.firestore, 'locations'),
      where('region', '==', 'south')
    );
    const locations$ = collectionData(locationsQuery, { idField: 'id' }) as Observable<Location[]>;

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

    combineLatest([locations$, attractions$, events$])
      .pipe(
        map(([locations, attractions, events]) => {
          console.log('Lekért helyszínek:', locations);
          console.log('Lekért látnivalók:', attractions);
          console.log('Lekért események:', events);
          const southLocations = locations;
          const filteredAttractions = attractions
            .filter(attraction => southLocations.some(location => String(location.id) === String(attraction.locationId)))
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
          this.southAttractions = attractions;
          this.isLoading = false;
          console.log('Déli látnivalók:', this.southAttractions);
        },
        error: error => {
          this.error = 'Hiba az adatok betöltése közben: ' + error.message;
          this.isLoading = false;
          console.error('Hiba:', error);
        }
      });
  }

  onEventsToggled(event: { attractionId: number, isOpen: boolean }): void {
    const attraction = this.southAttractions.find(attr => attr.id === event.attractionId);
    console.log(`Események ${event.isOpen ? 'lenyitva' : 'bezárva'} a következő látnivalónál: ${attraction?.name}`);
  }
}