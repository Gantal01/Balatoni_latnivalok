import { Event } from './event.model';

export class Attraction {
  id: number;
  name: string;
  description: string;
  locationId: number;
  categoryId: number;
  imageUrl?: string;
  events: Event[];

  constructor(
    id: number,
    name: string,
    description: string,
    locationId: number,
    categoryId: number,
    imageUrl?: string,
    events: Event[] = []
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.locationId = locationId;
    this.categoryId = categoryId;
    this.imageUrl = imageUrl;
    this.events = events;
  }
}