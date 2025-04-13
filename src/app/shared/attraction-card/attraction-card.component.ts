import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion'; // Hozzáadjuk
import { Attraction } from '../../models/attraction.model';
import { CalendarPipe } from '../pipes/calendar.pipe';

@Component({
  selector: 'app-attraction-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatExpansionModule, CalendarPipe],
  templateUrl: './attraction-card.component.html',
  styleUrls: [ `./attraction-card.component.scss`  ]
})
export class AttractionCardComponent {
  @Input() attraction!: Attraction;
  @Output() eventsToggled = new EventEmitter<{ attractionId: number, isOpen: boolean }>();

  onPanelOpened(): void {
    this.eventsToggled.emit({ attractionId: this.attraction.id, isOpen: true });
  }

  onPanelClosed(): void {
    this.eventsToggled.emit({ attractionId: this.attraction.id, isOpen: false });
  }
}