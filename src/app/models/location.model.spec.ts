import { Location } from './location.model';

describe('Location', () => {
  it('should create an instance', () => {
    const location = new Location(1, 'Teszt', 'north', 'Teszt, Teszt');
    expect(location).toBeTruthy();
  });
});