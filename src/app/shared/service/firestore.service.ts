import { Injectable } from '@angular/core';
import { Firestore, collection, query, orderBy, where, collectionData } from '@angular/fire/firestore';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Attraction } from '../../models/attraction.model';
import { Location } from '../../models/location.model';
import { Event } from '../../models/event.model';
import { Timestamp } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  // Helyszínek lekérdezése
  getLocations(): Observable<Location[]> {
    const locationsQuery = query(
      collection(this.firestore, 'locations'),
      orderBy('name', 'asc')
    );
    return collectionData(locationsQuery, { idField: 'id' }) as Observable<Location[]>;
  }

  // Látnivalók lekérdezése egy adott régióhoz
  getAttractionsByRegion(region: string): Observable<Attraction[]> {
    const locationsQuery = query(
      collection(this.firestore, 'locations'),
      where('region', '==', region)
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

    return combineLatest([locations$, attractions$, events$]).pipe(
      map(([locations, attractions, events]) => {
        const filteredAttractions = attractions
          .filter(attraction => locations.some(location => String(location.id) === String(attraction.locationId)))
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
    );
  }

  // Látnivalók lekérdezése szűrőkkel (város és esemény neve alapján)
  getFilteredAttractions(filters: { city: string; eventName: string }): Observable<Attraction[]> {
    const locationsQuery = query(
      collection(this.firestore, 'locations'),
      orderBy('name', 'asc')
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

    return combineLatest([locations$, attractions$, events$]).pipe(
      map(([locations, attractions, events]) => {
        const enrichedAttractions = attractions.map(attraction => {
          const attractionEvents = events
            .filter(event => String(event.attractionId) === String(attraction.id))
            .map(event => ({
              ...event,
              date: event.date instanceof Timestamp ? event.date.toDate() : new Date(event.date)
            }));
          return { ...attraction, events: attractionEvents };
        });

        return enrichedAttractions.filter(attraction => {
          const matchesCity = !filters.city || String(attraction.locationId) === String(filters.city);
          const matchesEvent =
            !filters.eventName ||
            attraction.events.some(event =>
              event.name.toLowerCase().includes(filters.eventName.toLowerCase())
            );
          return matchesCity && matchesEvent;
        });
      })
    );
  }
}