import { Pipe, PipeTransform } from '@angular/core';
import { Event } from '../../models/event.model';

@Pipe({
  name: 'CalendarPipe',
  standalone: true
})
export class CalendarPipe implements PipeTransform {
  transform(event: Event): string {
    if (!event || !event.name || !event.date) return '';
    // Az esemény nevét nagybetűssé tesszük, a dátum elé tesszük a naptár ikont
    const formattedDate = event.date.toLocaleDateString('hu-HU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    return `${event.name.toUpperCase()} - 📅 ${formattedDate}`;
  }
}