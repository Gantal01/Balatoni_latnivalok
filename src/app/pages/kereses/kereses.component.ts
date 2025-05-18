import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { Attraction } from '../../models/attraction.model';
import { Location } from '../../models/location.model';
import { FirestoreService } from '../../shared/service/firestore.service';
import { AttractionCardComponent } from '../../shared/attraction-card/attraction-card.component';

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

  constructor(private fb: FormBuilder, private firestoreService: FirestoreService) {
    this.filterForm = this.fb.group({
      city: [''],
      eventName: ['']
    });
  }

  ngOnInit(): void {
    // Helyszínek betöltése
    this.firestoreService.getLocations().subscribe({
      next: locations => {
        this.locations = locations;
        console.log('Helyszínek betöltve:', this.locations);
      },
      error: error => {
        this.error = 'Hiba a helyszínek betöltése közben: ' + error.message;
        console.error('Hiba:', error);
      }
    });

    // Szűrt látnivalók betöltése
    this.filterForm.valueChanges.subscribe(filters => {
      this.isLoading = true;
      this.firestoreService.getFilteredAttractions(filters).subscribe({
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
    });

    // Kezdeti szűrés üres szűrőkkel
    this.firestoreService.getFilteredAttractions({ city: '', eventName: '' }).subscribe({
      next: filteredAttractions => {
        this.filteredAttractions = filteredAttractions;
        this.isLoading = false;
        console.log('Kezdeti szűrt látnivalók:', this.filteredAttractions);
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