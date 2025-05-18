import { Pipe, PipeTransform } from '@angular/core';
import { Event } from '../../models/event.model';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({
  name: 'CalendarPipe',
  standalone: true
})
export class CalendarPipe implements PipeTransform {
  transform(event: Event): string {
    if (!event || !event.name || !event.date) {
      console.warn('Érvénytelen esemény vagy hiányzó adatok:', event);
      return '';
    }

    let date: Date;

    // Dátum konverzió
    if (typeof event.date === 'string') {
      date = new Date(event.date); // ISO string konverzió
    } else if (event.date instanceof Timestamp) {
      date = event.date.toDate(); // Firestore Timestamp konverzió
    } else if (event.date instanceof Date) {
      date = event.date; // Már Date objektum
    } else {
      console.error('Ismeretlen dátumformátum:', event.date);
      return '';
    }

    // Ellenőrizzük, hogy a dátum érvényes-e
    if (isNaN(date.getTime())) {
      console.error('Érvénytelen dátum:', event.date);
      return '';
    }

    const formattedDate = date.toLocaleDateString('hu-HU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    return `${event.name.toUpperCase()} - 📅 ${formattedDate}`;
  }
}