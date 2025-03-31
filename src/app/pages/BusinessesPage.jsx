import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBuilding } from 'react-icons/fa';
import BusinessCard from '@/modules/businesses/components/BusinessCard';
import { mockBusinesses } from '@/modules/businesses/data/mockBusinesses';

function BusinessesPage() {
  const [businesses, setBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    location: '',
    featured: false
  });

  useEffect(() => {
    // Simulate API fetch
    const fetchBusinesses = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setBusinesses(mockBusinesses);
          setFilteredBusinesses(mockBusinesses);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching businesses:', error);
        setIsLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, businesses]);

  const applyFilters = () => {
    let filtered = [...businesses];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(business => 
        business.name.toLowerCase().includes(searchLower) ||
        business.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(business => 
        business.category === filters.category
      );
    }

    // Apply location filter
    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      filtered = filtered.filter(business => 
        business.location.toLowerCase().includes(locationLower)
      );
    }

    // Apply featured filter
    if (filters.featured) {
      filtered = filtered.filter(business => business.isFeatured);
    }

    setFilteredBusinesses(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    applyFilters();
  };

  // Get unique categories from businesses
  const categories = [...new Set(businesses.map(business => business.category))];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold mb-2 sm:mb-0">Business Directory</h1>
        
        <Link 
          to="/businesses/create" 
          className="btn-primary flex items-center cursor-pointer"
        >
          <FaBuilding className="mr-2" />
          Add Your Business
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <h3 className="text-lg font-semibold mb-4">Filter Businesses</h3>
            
            <form onSubmit={handleSearchSubmit}>
              <div className="form-group">
                <label htmlFor="search" className="label">Search</label>
                <input
                  type="text"
                  id="search"
                  name="search"
                  className="input"
                  placeholder="Search businesses..."
                  value={filters.search}
                  onChange={handleFilterChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="category" className="label">Category</label>
                <select
                  id="category"
                  name="category"
                  className="select"
                  value={filters.category}
                  onChange={handleFilterChange}
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="location" className="label">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="input"
                  placeholder="E.g., London, Manchester"
                  value={filters.location}
                  onChange={handleFilterChange}
                />
              </div>
              
              <div className="form-group flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  className="mr-2 h-4 w-4"
                  checked={filters.featured}
                  onChange={handleFilterChange}
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                  Featured Businesses Only
                </label>
              </div>
              
              <button
                type="submit"
                className="btn-primary w-full mt-4 cursor-pointer"
              >
                Apply Filters
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="card animate-pulse">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-1/3 bg-gray-200 h-32"></div>
                    <div className="p-4 flex-grow sm:w-2/3">
                      <div className="h-4 bg-gray-200 rounded mb-2 w-1/4"></div>
                      <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredBusinesses.length > 0 ? (
            <div className="space-y-6">
              {filteredBusinesses.map(business => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-medium text-gray-600 mb-2">No businesses found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your filters or add your business</p>
              <Link to="/businesses/create" className="btn-primary cursor-pointer">
                Add Your Business
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BusinessesPage;