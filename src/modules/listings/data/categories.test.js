import { describe, it, expect } from 'vitest';
import { categories } from './categories';

describe('Categories Data', () => {
  it('has categories data', () => {
    expect(categories).toBeDefined();
    expect(categories.length).toBeGreaterThan(0);
    
    // Verify some specific categories exist
    const categoryNames = categories.map(cat => cat.name);
    expect(categoryNames).toContain('Judaica');
    expect(categoryNames).toContain('Kosher Food');
    
    // Check that each category has the required properties
    categories.forEach(category => {
      expect(category).toHaveProperty('id');
      expect(category).toHaveProperty('name');
      expect(category).toHaveProperty('slug');
      expect(category).toHaveProperty('icon');
    });
  });
});