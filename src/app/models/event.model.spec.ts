import { Event } from './event.model';

describe('Event', () => {
  it('should create an instance', () => {
    const event = new Event(1, 1, 'Teszt', new Date('2025-07-15'), 'Teszt');
    expect(event).toBeTruthy();
  });
});