import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ListingGrid from '@/modules/listings/components/ListingGrid';
import ListingFilter from '@/modules/listings/components/ListingFilter';
import { mockListings } from '@/modules/listings/data/mockListings';
import { categories } from '@/modules/listings/data/categories';

function CategoryPage() {
  const { categorySlug } = useParams();
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const category = categories.find(c => c.slug === categorySlug);

  useEffect(() => {
    if (!category) return;

    // Simulate API fetch
    const fetchCategoryListings = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call with the category ID
        setTimeout(() => {
          const categoryListings = mockListings.filter(
            listing => listing.categoryId === category.id
          );
          setListings(categoryListings);
          setFilteredListings(categoryListings);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching category listings:', error);
        setIsLoading(false);
      }
    };

    fetchCategoryListings();
  }, [categorySlug, category]);

  const applyFilters = (filters) => {
    let filtered = [...listings];

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

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
        <p className="text-gray-600 mb-6">The category you're looking for doesn't exist.</p>
        <Link to="/" className="btn-primary cursor-pointer">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="text-blue-600 hover:underline">
          &larr; Back to categories
        </Link>
      </div>

      <div className="flex items-center mb-6">
        <span className="text-4xl mr-3">{category.icon}</span>
        <h1 className="text-3xl font-bold">{category.name}</h1>
      </div>
      
      {category.description && (
        <p className="text-gray-600 mb-8">{category.description}</p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <ListingFilter 
            onFilter={applyFilters} 
            initialFilters={{ categoryId: category.id.toString() }}
          />
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

export default CategoryPage;