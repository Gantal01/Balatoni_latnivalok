import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { Attraction } from '../../models/attraction.model';
import { CalendarPipe } from '../pipes/calendar.pipe';
import { UppercasePipe } from '../pipes/uppercase.pipe';

@Component({
  selector: 'app-attraction-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatExpansionModule, CalendarPipe, UppercasePipe],
  templateUrl: './attraction-card.component.html',
  styleUrls: ['./attraction-card.component.scss']
})
export class AttractionCardComponent {
  // @Input tulajdonságok
  @Input() attraction!: Attraction;
  @Input() showEventsByDefault: boolean = false;
  @Input() truncateLength: number = 100;

  // @Output tulajdonságok
  @Output() panelStateChanged = new EventEmitter<{ attractionId: number, isOpen: boolean }>(); // Módosítva
  @Output() attractionClicked = new EventEmitter<number>();
  @Output() imageClicked = new EventEmitter<number>(); // Új

  isEventsOpen = false;

  ngOnInit(): void {
    this.isEventsOpen = this.showEventsByDefault;
  }

  onPanelOpened(): void {
    this.isEventsOpen = true;
    this.panelStateChanged.emit({ attractionId: this.attraction.id, isOpen: true });
  }

  onPanelClosed(): void {
    this.isEventsOpen = false;
    this.panelStateChanged.emit({ attractionId: this.attraction.id, isOpen: false });
  }

  onCardClick(): void {
    this.attractionClicked.emit(this.attraction.id);
  }

  onImageClick(): void {
    this.imageClicked.emit(this.attraction.id);
  }

  getTruncatedDescription(): string {
    if (!this.attraction.description) return '';
    if (this.attraction.description.length <= this.truncateLength) return this.attraction.description;
    return this.attraction.description.substring(0, this.truncateLength) + '...';
  }
}