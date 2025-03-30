import React from 'react';
import ListingCard from './ListingCard';
import { mockListings } from '../data/mockListings';

function FeaturedListings() {
  // In a real app, we would fetch the featured listings from the API
  const featuredListings = mockListings.slice(0, 4);

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Featured Listings</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredListings.map(listing => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}

export default FeaturedListings;