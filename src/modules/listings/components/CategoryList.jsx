import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/categories';

function CategoryList() {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Browse by Category</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map(category => (
          <Link 
            key={category.id}
            to={`/category/${category.slug}`}
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <span className="text-3xl mb-2">{category.icon}</span>
            <span className="text-center font-medium">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;