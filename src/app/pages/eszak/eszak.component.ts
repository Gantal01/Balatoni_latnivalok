import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Attraction } from '../../models/attraction.model';
import { FirestoreService } from '../../shared/service/firestore.service';
import { AttractionCardComponent } from '../../shared/attraction-card/attraction-card.component';

@Component({
  selector: 'app-eszak',
  standalone: true,
  imports: [MatCardModule, CommonModule, AttractionCardComponent],
  templateUrl: './eszak.component.html',
  styleUrls: ['./eszak.component.scss']
})
export class EszakComponent implements OnInit {
  northAttractions: Attraction[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    this.firestoreService.getAttractionsByRegion('north').subscribe({
      next: attractions => {
        this.northAttractions = attractions;
        this.isLoading = false;
        console.log('Északi látnivalók:', this.northAttractions);
      },
      error: error => {
        this.error = 'Hiba az adatok betöltése közben: ' + error.message;
        this.isLoading = false;
        console.error('Hiba:', error);
      }
    });
  }

  onEventsToggled(event: { attractionId: number, isOpen: boolean }): void {
    const attraction = this.northAttractions.find(attr => attr.id === event.attractionId);
    console.log(`Események ${event.isOpen ? 'lenyitva' : 'bezárva'} a következő látnivalónál: ${attraction?.name}`);
  }
}