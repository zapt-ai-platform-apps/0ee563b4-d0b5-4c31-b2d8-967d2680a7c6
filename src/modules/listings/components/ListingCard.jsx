import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { categories } from '../data/categories';
import { formatDistanceToNow } from 'date-fns';

function ListingCard({ listing }) {
  const category = categories.find(c => c.id === listing.categoryId) || { name: 'Uncategorized', icon: '🔍' };
  const formattedDate = formatDistanceToNow(new Date(listing.createdAt), { addSuffix: true });

  return (
    <Link to={`/listings/${listing.id}`} className="block h-full">
      <div className="card h-full flex flex-col transition-shadow hover:shadow-lg">
        <div className="aspect-w-16 aspect-h-9 relative bg-gray-100">
          {listing.images && listing.images.length > 0 ? (
            <img 
              src={listing.images[0]} 
              alt={listing.title}
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 flex items-center justify-center bg-gray-200">
              <span className="text-3xl">{category.icon}</span>
            </div>
          )}
          {listing.isShabbatRestricted && (
            <div className="absolute top-2 right-2 badge badge-primary">
              Shabbat Observant
            </div>
          )}
        </div>
        
        <div className="flex-grow p-4 flex flex-col">
          <div className="mb-2">
            <span className="badge badge-secondary">{category.name}</span>
          </div>
          
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{listing.title}</h3>
          
          <p className="text-gray-600 mb-3 line-clamp-2">
            {listing.description}
          </p>
          
          <div className="mt-auto pt-2">
            <div className="font-bold text-lg text-blue-600">
              {listing.priceText || (listing.price === 0 ? 'Free' : `£${listing.price}`)}
            </div>
            
            <div className="mt-2 flex flex-col text-sm text-gray-500">
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-1" />
                <span>{listing.location}</span>
              </div>
              
              <div className="flex items-center mt-1">
                <FaClock className="mr-1" />
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ListingCard;