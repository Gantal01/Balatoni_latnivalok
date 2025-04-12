export class Location {
    id: number;
    name: string;
    address?: string;
    region: 'north' | 'south';
  
    constructor(id: number, name: string, region: 'north' | 'south', address?: string) {
      this.id = id;
      this.name = name;
      this.region = region;
      this.address = address;
    }
  }