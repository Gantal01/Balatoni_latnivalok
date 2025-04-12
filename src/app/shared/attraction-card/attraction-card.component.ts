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
  template: `
    <mat-card class="card">
      <mat-card-title>{{ attraction.name }}</mat-card-title>
      <mat-card-content>{{ attraction.description }}</mat-card-content>
      <img *ngIf="attraction.imageUrl" mat-card-image [src]="attraction.imageUrl" alt="{{ attraction.name }}">
      <mat-expansion-panel (opened)="onPanelOpened()" (closed)="onPanelClosed()">
        <mat-expansion-panel-header>
          <mat-panel-title>Események</mat-panel-title>
        </mat-expansion-panel-header>
        <div>
          <p *ngFor="let event of attraction.events">
            {{ event | CalendarPipe }}
          </p>
        </div>
      </mat-expansion-panel>
    </mat-card>
  `,
  styles: [
    `
      .card {
        width: 300px;
        margin: 8px;
      }
      img {
        max-height: 200px;
        object-fit: cover;
      }
      mat-expansion-panel {
        margin-top: 16px;
      }
    `
  ]
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