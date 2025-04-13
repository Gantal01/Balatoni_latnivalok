import { Attraction } from './attraction.model';
import { Event } from './event.model';

describe('Attraction', () => {
  it('should create an instance', () => {
    const event = new Event(1, 1, 'Balatonfüredi Borfesztivál', new Date('2025-07-15'), 'Borfesztivál Balatonfüreden.');
    const attraction = new Attraction(
      1,
      'Tagore Sétány',
      'Sétálj végig Balatonfüred híres sétányán, ahol gyönyörű kilátás és hangulatos kávézók várnak!',
      1,
      1,
      '../assets/images/tagore_setany.jpg',
      [event]
    );
    expect(attraction).toBeTruthy();
  });
});


