import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Attraction } from '../../models/attraction.model';
import { Location } from '../../models/location.model';
import { attractions, locations } from '../../data/data.data';
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
  locations: Location[] = locations;
  allAttractions: Attraction[] = attractions;
  filteredAttractions: Attraction[] = [];

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      city: [''],
      eventName: ['']
    });
  }

  ngOnInit(): void {
    this.filteredAttractions = [...this.allAttractions];
    this.filterForm.valueChanges.subscribe(filters => {
      this.applyFilters(filters);
    });
  }

  applyFilters(filters: { city: string, eventName: string }): void {
    this.filteredAttractions = this.allAttractions.filter(attraction => {
      // Város szűrés
      const matchesCity = !filters.city || attraction.locationId === parseInt(filters.city, 10);

      // Esemény szűrés
      const matchesEvent = !filters.eventName || attraction.events.some(event =>
        event.name.toLowerCase().includes(filters.eventName.toLowerCase())
      );

      return matchesCity && matchesEvent;
    });
  }

  onEventsToggled(event: { attractionId: number, isOpen: boolean }): void {
    const attraction = this.allAttractions.find(attr => attr.id === event.attractionId);
    console.log(`Események ${event.isOpen ? 'lenyitva' : 'bezárva'} a következő látnivalónál: ${attraction?.name}`);
  }
}