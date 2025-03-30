import React, { useState } from 'react';
import { categories } from '../data/categories';

function ListingFilter({ onFilter, initialFilters = {} }) {
  const [filters, setFilters] = useState({
    categoryId: initialFilters.categoryId || '',
    minPrice: initialFilters.minPrice || '',
    maxPrice: initialFilters.maxPrice || '',
    location: initialFilters.location || '',
    isShabbatRestricted: initialFilters.isShabbatRestricted || false,
    ...initialFilters
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    const resetFilters = {
      categoryId: '',
      minPrice: '',
      maxPrice: '',
      location: '',
      isShabbatRestricted: false
    };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold mb-4">Filter Listings</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="form-group">
            <label htmlFor="categoryId" className="label">Category</label>
            <select
              id="categoryId"
              name="categoryId"
              className="select"
              value={filters.categoryId}
              onChange={handleChange}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="minPrice" className="label">Min Price (£)</label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              className="input"
              placeholder="Min"
              min="0"
              value={filters.minPrice}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="maxPrice" className="label">Max Price (£)</label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              className="input"
              placeholder="Max"
              min="0"
              value={filters.maxPrice}
              onChange={handleChange}
            />
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
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group flex items-center">
            <input
              type="checkbox"
              id="isShabbatRestricted"
              name="isShabbatRestricted"
              className="mr-2 h-4 w-4"
              checked={filters.isShabbatRestricted}
              onChange={handleChange}
            />
            <label htmlFor="isShabbatRestricted" className="text-sm font-medium text-gray-700">
              Shabbat Observant Only
            </label>
          </div>
        </div>
        
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={handleReset}
            className="btn-secondary cursor-pointer"
          >
            Reset
          </button>
          <button
            type="submit"
            className="btn-primary cursor-pointer"
          >
            Apply Filters
          </button>
        </div>
      </form>
    </div>
  );
}

export default ListingFilter;