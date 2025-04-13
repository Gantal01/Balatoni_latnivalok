import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Attraction } from '../../models/attraction.model';
import { attractions, locations } from '../../data/data.data';
import { AttractionCardComponent } from '../../shared/attraction-card/attraction-card.component';

@Component({
  selector: 'app-del',
  standalone: true,
  imports: [MatCardModule, CommonModule, AttractionCardComponent],
  templateUrl: './del.component.html',
  styleUrls: ['./del.component.scss']
})
export class DelComponent implements OnInit {
  southAttractions: Attraction[] = [];

  ngOnInit(): void {
    const southLocations = locations.filter(location => location.region === 'south');
    this.southAttractions = attractions.filter(attraction =>
      southLocations.some(location => location.id === attraction.locationId)
    );
  }
}