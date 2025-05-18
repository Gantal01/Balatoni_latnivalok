import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, setDoc, doc } from '@angular/fire/firestore';
import { Attraction } from '../../models/attraction.model';
import { Location } from '../../models/location.model';
import { Category } from '../../models/category.model';
import { Event } from '../../models/event.model';
import { attractions, locations, categories, events } from '../../data/data.data';

@Injectable({
  providedIn: 'root'
})
export class DataUploadService {
  constructor(private firestore: Firestore) {}

  async uploadData(): Promise<void> {
    try {
      // 1. Helyek feltöltése
      const locationsCollection = collection(this.firestore, 'locations');
      for (const location of locations) {
        const locationRef = doc(this.firestore, `locations/${location.id}`);
        await setDoc(locationRef, {
          id: location.id,
          name: location.name,
          region: location.region,
          address: location.address || null
        });
        console.log(`Hely feltöltve: ${location.name}`);
      }

      // 2. Kategóriák feltöltése
      const categoriesCollection = collection(this.firestore, 'categories');
      for (const category of categories) {
        const categoryRef = doc(this.firestore, `categories/${category.id}`);
        await setDoc(categoryRef, {
          id: category.id,
          name: category.name,
          description: category.description || null
        });
        console.log(`Kategória feltöltve: ${category.name}`);
      }

      // 3. Látnivalók feltöltése (események nélkül)
      const attractionsCollection = collection(this.firestore, 'attractions');
      for (const attraction of attractions) {
        const attractionRef = doc(this.firestore, `attractions/${attraction.id}`);
        await setDoc(attractionRef, {
          id: attraction.id,
          name: attraction.name,
          description: attraction.description,
          locationId: attraction.locationId,
          categoryId: attraction.categoryId,
          imageUrl: attraction.imageUrl || null
        });
        console.log(`Látnivaló feltöltve: ${attraction.name}`);
      }

      // 4. Események feltöltése
      const eventsCollection = collection(this.firestore, 'events');
      for (const event of events) {
        const eventRef = doc(this.firestore, `events/${event.id}`);
        await setDoc(eventRef, {
          id: event.id,
          attractionId: event.attractionId,
          name: event.name,
          date: event.date.toISOString(), // Dátumot ISO stringként tároljuk
          description: event.description
        });
        console.log(`Esemény feltöltve: ${event.name}`);
      }

      console.log('Adatok sikeresen feltöltve!');
    } catch (error) {
      console.error('Hiba történt az adatok feltöltése közben:', error);
    }
  }
}