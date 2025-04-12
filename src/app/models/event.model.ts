export class Event {
    id: number;
    attractionId: number;
    name: string;
    date: Date;
    description: string;
  
    constructor(
      id: number,
      attractionId: number,
      name: string,
      date: Date,
      description: string
    ) {
      this.id = id;
      this.attractionId = attractionId;
      this.name = name;
      this.date = date;
      this.description = description;
    }
  }