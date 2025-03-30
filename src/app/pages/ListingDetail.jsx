import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';
import { categories } from '@/modules/listings/data/categories';
import { mockListings } from '@/modules/listings/data/mockListings';
import { formatDistanceToNow } from 'date-fns';

function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    // Simulate API fetch
    const fetchListing = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          const foundListing = mockListings.find(item => item.id === id);
          setListing(foundListing || null);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching listing:', error);
        setIsLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <div className="bg-gray-200 w-full h-80 rounded-lg mb-6"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
            </div>
            <div className="md:w-1/3">
              <div className="bg-gray-200 w-full h-60 rounded-lg mb-4"></div>
              <div className="h-10 bg-gray-200 rounded mb-2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Listing Not Found</h1>
        <p className="text-gray-600 mb-6">The listing you're looking for doesn't exist or has been removed.</p>
        <Link to="/listings" className="btn-primary cursor-pointer">
          Browse All Listings
        </Link>
      </div>
    );
  }

  const category = categories.find(c => c.id === listing.categoryId) || { name: 'Uncategorized', icon: '🔍' };
  const formattedDate = formatDistanceToNow(new Date(listing.createdAt), { addSuffix: true });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/listings" className="text-blue-600 hover:underline">
          &larr; Back to listings
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
          
          <div className="mb-6">
            <span className="badge badge-secondary mr-2">{category.name}</span>
            {listing.isShabbatRestricted && (
              <span className="badge badge-primary">Shabbat Observant</span>
            )}
          </div>

          <div className="mb-6">
            {listing.images && listing.images.length > 0 ? (
              <img 
                src={listing.images[0]} 
                alt={listing.title}
                className="w-full rounded-lg max-h-96 object-contain bg-gray-100"
              />
            ) : (
              <div className="w-full h-80 flex items-center justify-center bg-gray-200 rounded-lg">
                <span className="text-6xl">{category.icon}</span>
              </div>
            )}
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {listing.description}
            </p>
          </div>
          
          <div className="text-gray-600 flex flex-col space-y-2">
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              <span>{listing.location}</span>
            </div>
            
            <div className="flex items-center">
              <FaClock className="mr-2" />
              <span>Posted {formattedDate}</span>
            </div>
            
            <div className="flex items-center">
              <FaUser className="mr-2" />
              <span>Listing ID: {listing.id}</span>
            </div>
          </div>
        </div>
        
        <div className="md:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <div className="text-2xl font-bold text-blue-600 mb-4">
              {listing.priceText || (listing.price === 0 ? 'Free' : `£${listing.price}`)}
            </div>
            
            {showContact ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contact Information</h3>
                
                {listing.contactEmail && (
                  <div className="flex items-center">
                    <FaEnvelope className="mr-2 text-gray-600" />
                    <a 
                      href={`mailto:${listing.contactEmail}`}
                      className="text-blue-600 hover:underline"
                    >
                      {listing.contactEmail}
                    </a>
                  </div>
                )}
                
                {listing.contactPhone && (
                  <div className="flex items-center">
                    <FaPhone className="mr-2 text-gray-600" />
                    <a 
                      href={`tel:${listing.contactPhone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {listing.contactPhone}
                    </a>
                  </div>
                )}
                
                <button 
                  onClick={() => setShowContact(false)}
                  className="btn-secondary w-full mt-4 cursor-pointer"
                >
                  Hide Contact Info
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowContact(true)}
                className="btn-primary w-full cursor-pointer"
              >
                Show Contact Info
              </button>
            )}
            
            <div className="mt-6 text-sm text-gray-600">
              <p>
                Remember to meet in a public place and inspect items before purchasing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingDetail;