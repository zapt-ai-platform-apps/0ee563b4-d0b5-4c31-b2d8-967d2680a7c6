import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone, FaGlobe } from 'react-icons/fa';

function BusinessCard({ business }) {
  return (
    <Link to={`/businesses/${business.id}`} className="block h-full">
      <div className="card h-full flex flex-col transition-shadow hover:shadow-lg">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-1/3 bg-gray-100 flex items-center justify-center p-4">
            {business.logo ? (
              <img 
                src={business.logo} 
                alt={business.name}
                className="max-w-full max-h-32 object-contain"
              />
            ) : (
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center">
                <span className="text-4xl">{business.categoryIcon || '🏢'}</span>
              </div>
            )}
          </div>
          
          <div className="p-4 flex-grow sm:w-2/3">
            <div className="mb-2">
              <span className="badge badge-primary">{business.category}</span>
              {business.isFeatured && (
                <span className="badge bg-yellow-100 text-yellow-800 ml-2">Featured</span>
              )}
            </div>
            
            <h3 className="text-lg font-semibold mb-2">{business.name}</h3>
            
            <p className="text-gray-600 mb-4 line-clamp-2">
              {business.description}
            </p>
            
            <div className="mt-auto text-sm text-gray-500 space-y-1">
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-1" />
                <span>{business.location}</span>
              </div>
              
              {business.phone && (
                <div className="flex items-center">
                  <FaPhone className="mr-1" />
                  <span>{business.phone}</span>
                </div>
              )}
              
              {business.website && (
                <div className="flex items-center">
                  <FaGlobe className="mr-1" />
                  <span className="text-blue-600 truncate">{business.website.replace(/^https?:\/\//, '')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BusinessCard;