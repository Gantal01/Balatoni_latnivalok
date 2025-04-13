import { Category } from './category.model';

describe('Category', () => {
  it('should create an instance', () => {
    const category = new Category(1, 'Teszt', 'Teszt');
    expect(category).toBeTruthy();
  });
});