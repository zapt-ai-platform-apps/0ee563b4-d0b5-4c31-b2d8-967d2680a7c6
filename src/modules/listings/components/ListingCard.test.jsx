import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import ListingCard from './ListingCard';

// Mock the dependencies
vi.mock('../data/categories', () => ({
  categories: [
    { id: 1, name: 'Judaica', icon: '✡️' }
  ]
}));

vi.mock('date-fns', () => ({
  formatDistanceToNow: () => '2 days ago'
}));

describe('ListingCard Component', () => {
  const mockListing = {
    id: 'test-id',
    title: 'Test Listing',
    description: 'Test description',
    price: 100,
    location: 'Test Location',
    categoryId: 1,
    createdAt: '2023-01-01T00:00:00.000Z',
    isShabbatRestricted: false
  };

  it('renders the listing card', () => {
    render(
      <BrowserRouter>
        <ListingCard listing={mockListing} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Test Listing')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('£100')).toBeInTheDocument();
    expect(screen.getByText('Test Location')).toBeInTheDocument();
  });
});