import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ListingGrid from '@/modules/listings/components/ListingGrid';
import ListingFilter from '@/modules/listings/components/ListingFilter';
import { mockListings } from '@/modules/listings/data/mockListings';

function ListingsPage() {
  const [searchParams] = useSearchParams();
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get search term from URL if it exists
  const searchTerm = searchParams.get('search') || '';

  // Initialize filters from URL params
  const initialFilters = {
    categoryId: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    location: searchParams.get('location') || '',
    isShabbatRestricted: searchParams.get('isShabbatRestricted') === 'true'
  };

  useEffect(() => {
    // Simulate API fetch
    const fetchListings = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setListings(mockListings);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching listings:', error);
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  useEffect(() => {
    if (listings.length > 0) {
      applyFilters(initialFilters, searchTerm);
    }
  }, [listings, searchTerm]);

  const applyFilters = (filters, searchQuery = searchTerm) => {
    let filtered = [...listings];

    // Apply search term filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(listing => 
        listing.title.toLowerCase().includes(query) || 
        listing.description.toLowerCase().includes(query) ||
        listing.location.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (filters.categoryId) {
      filtered = filtered.filter(listing => 
        listing.categoryId === parseInt(filters.categoryId)
      );
    }

    // Apply price filters
    if (filters.minPrice) {
      filtered = filtered.filter(listing => 
        listing.price >= parseInt(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(listing => 
        listing.price <= parseInt(filters.maxPrice)
      );
    }

    // Apply location filter
    if (filters.location) {
      const locationQuery = filters.location.toLowerCase();
      filtered = filtered.filter(listing => 
        listing.location.toLowerCase().includes(locationQuery)
      );
    }

    // Apply Shabbat restricted filter
    if (filters.isShabbatRestricted) {
      filtered = filtered.filter(listing => listing.isShabbatRestricted);
    }

    setFilteredListings(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {searchTerm ? `Search Results for "${searchTerm}"` : 'Browse All Listings'}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <ListingFilter onFilter={applyFilters} initialFilters={initialFilters} />
        </div>

        <div className="lg:col-span-3">
          <ListingGrid 
            listings={filteredListings} 
            isLoading={isLoading} 
          />
        </div>
      </div>
    </div>
  );
}

export default ListingsPage;