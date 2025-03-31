import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaPhone, FaEnvelope, FaGlobe, FaLocationArrow } from 'react-icons/fa';
import { mockBusinesses } from '@/modules/businesses/data/mockBusinesses';

function BusinessDetail() {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    // Simulate API fetch
    const fetchBusiness = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          const foundBusiness = mockBusinesses.find(item => item.id === id);
          setBusiness(foundBusiness || null);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching business:', error);
        setIsLoading(false);
      }
    };

    fetchBusiness();
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

  if (!business) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Business Not Found</h1>
        <p className="text-gray-600 mb-6">The business you're looking for doesn't exist or has been removed.</p>
        <Link to="/businesses" className="btn-primary cursor-pointer">
          Browse All Businesses
        </Link>
      </div>
    );
  }

  const allImages = business.logo 
    ? [business.logo, ...(business.images || [])]
    : business.images || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/businesses" className="text-blue-600 hover:underline">
          &larr; Back to businesses
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <div className="mb-6">
            <span className="badge badge-primary mr-2">{business.category}</span>
            {business.isFeatured && (
              <span className="badge bg-yellow-100 text-yellow-800">Featured</span>
            )}
          </div>
          
          <h1 className="text-3xl font-bold mb-4">{business.name}</h1>

          <div className="mb-6">
            {allImages.length > 0 ? (
              <div>
                <div className="w-full rounded-lg overflow-hidden bg-gray-100 mb-2">
                  <img 
                    src={allImages[activeImage]} 
                    alt={business.name}
                    className="w-full h-96 object-contain"
                  />
                </div>
                
                {allImages.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {allImages.map((image, index) => (
                      <button 
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`w-24 h-24 rounded overflow-hidden flex-shrink-0 ${index === activeImage ? 'ring-2 ring-blue-500' : ''}`}
                      >
                        <img 
                          src={image} 
                          alt={`${business.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-96 flex items-center justify-center bg-blue-100 rounded-lg">
                <span className="text-6xl">{business.categoryIcon || '🏢'}</span>
              </div>
            )}
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">About</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {business.description}
            </p>
          </div>
          
          {business.address && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Location</h2>
              <p className="text-gray-700 mb-4">
                {business.address}
              </p>
              <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Map"
                  src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(business.address || business.location)}`}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
        
        <div className="md:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h3 className="text-xl font-semibold mb-4">Business Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-2 text-blue-600" />
                <div>
                  <p className="font-medium">Location</p>
                  <p>{business.location}</p>
                </div>
              </div>
              
              {business.hours && (
                <div className="flex items-start">
                  <FaClock className="mt-1 mr-2 text-blue-600" />
                  <div>
                    <p className="font-medium">Hours</p>
                    <p className="whitespace-pre-line">{business.hours}</p>
                  </div>
                </div>
              )}
              
              {business.phone && (
                <div className="flex items-start">
                  <FaPhone className="mt-1 mr-2 text-blue-600" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href={`tel:${business.phone}`} className="text-blue-600 hover:underline">
                      {business.phone}
                    </a>
                  </div>
                </div>
              )}
              
              {business.email && (
                <div className="flex items-start">
                  <FaEnvelope className="mt-1 mr-2 text-blue-600" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href={`mailto:${business.email}`} className="text-blue-600 hover:underline">
                      {business.email}
                    </a>
                  </div>
                </div>
              )}
              
              {business.website && (
                <div className="flex items-start">
                  <FaGlobe className="mt-1 mr-2 text-blue-600" />
                  <div>
                    <p className="font-medium">Website</p>
                    <a 
                      href={business.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {business.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex flex-col space-y-3">
              {business.phone && (
                <a 
                  href={`tel:${business.phone}`}
                  className="btn-primary text-center cursor-pointer"
                >
                  Call Now
                </a>
              )}
              
              {business.address && (
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(business.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center justify-center cursor-pointer"
                >
                  <FaLocationArrow className="mr-2" />
                  Get Directions
                </a>
              )}
              
              {business.website && (
                <a 
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-center cursor-pointer"
                >
                  Visit Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessDetail;