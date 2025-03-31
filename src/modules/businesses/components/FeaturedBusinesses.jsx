import React from 'react';
import BusinessCard from './BusinessCard';
import { mockBusinesses } from '../data/mockBusinesses';

function FeaturedBusinesses() {
  // In a real app, we would fetch the featured businesses from the API
  const featuredBusinesses = mockBusinesses.filter(business => business.isFeatured).slice(0, 3);
  
  // If we don't have enough featured businesses, add some regular ones
  const displayBusinesses = featuredBusinesses.length < 3 
    ? [...featuredBusinesses, ...mockBusinesses.filter(business => !business.isFeatured).slice(0, 3 - featuredBusinesses.length)]
    : featuredBusinesses;

  return (
    <div className="space-y-4">      
      {displayBusinesses.map(business => (
        <BusinessCard key={business.id} business={business} />
      ))}
    </div>
  );
}

export default FeaturedBusinesses;