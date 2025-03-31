import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaCalendarAlt, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';
import { format } from 'date-fns';
import { mockEvents } from '@/modules/events/data/mockEvents';

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    // Simulate API fetch
    const fetchEvent = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          const foundEvent = mockEvents.find(item => item.id === id);
          setEvent(foundEvent || null);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching event:', error);
        setIsLoading(false);
      }
    };

    fetchEvent();
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

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
        <p className="text-gray-600 mb-6">The event you're looking for doesn't exist or has been removed.</p>
        <Link to="/events" className="btn-primary cursor-pointer">
          Browse All Events
        </Link>
      </div>
    );
  }

  const formattedStartDate = format(new Date(event.startDate), 'EEEE, MMMM d, yyyy');
  const formattedStartTime = format(new Date(event.startDate), 'h:mm a');
  const formattedEndTime = event.endDate ? format(new Date(event.endDate), 'h:mm a') : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/events" className="text-blue-600 hover:underline">
          &larr; Back to events
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
          
          <div className="mb-6">
            <span className="badge badge-primary mr-2">{event.category}</span>
            {event.isPrivate && (
              <span className="badge badge-secondary">Private Event</span>
            )}
          </div>

          <div className="mb-6">
            {event.image ? (
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full rounded-lg max-h-96 object-cover"
              />
            ) : (
              <div className="w-full h-80 flex items-center justify-center bg-blue-100 rounded-lg">
                <span className="text-6xl">{event.categoryIcon || '📅'}</span>
              </div>
            )}
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">About This Event</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {event.description}
            </p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Organizer</h2>
            <p className="text-gray-700 mb-2">
              {event.organizerName}
            </p>
            
            {showContact && (
              <div className="mt-4 space-y-2">
                {event.contactEmail && (
                  <div className="flex items-center">
                    <FaEnvelope className="mr-2 text-gray-600" />
                    <a 
                      href={`mailto:${event.contactEmail}`}
                      className="text-blue-600 hover:underline"
                    >
                      {event.contactEmail}
                    </a>
                  </div>
                )}
                
                {event.contactPhone && (
                  <div className="flex items-center">
                    <FaPhone className="mr-2 text-gray-600" />
                    <a 
                      href={`tel:${event.contactPhone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {event.contactPhone}
                    </a>
                  </div>
                )}
              </div>
            )}
            
            <button 
              onClick={() => setShowContact(!showContact)}
              className="btn-secondary mt-4 cursor-pointer"
            >
              {showContact ? 'Hide Contact Info' : 'Contact Organizer'}
            </button>
          </div>
        </div>
        
        <div className="md:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h3 className="text-xl font-semibold mb-4">Event Details</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <FaCalendarAlt className="mt-1 mr-2 text-blue-600" />
                <div>
                  <p className="font-medium">Date</p>
                  <p>{formattedStartDate}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FaClock className="mt-1 mr-2 text-blue-600" />
                <div>
                  <p className="font-medium">Time</p>
                  <p>{formattedStartTime} {formattedEndTime ? `- ${formattedEndTime}` : ''}</p>
                </div>
              </div>
              
              {event.location && (
                <div className="flex items-start">
                  <FaMapMarkerAlt className="mt-1 mr-2 text-blue-600" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p>{event.location}</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-start">
                <FaUser className="mt-1 mr-2 text-blue-600" />
                <div>
                  <p className="font-medium">Organized By</p>
                  <p>{event.organizerName}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <button 
                className="btn-primary w-full cursor-pointer"
                onClick={() => window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${new Date(event.startDate).toISOString().replace(/-|:|\.\d+/g, '')}/${new Date(event.endDate || event.startDate).toISOString().replace(/-|:|\.\d+/g, '')}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location || '')}&sf=true&output=xml`, '_blank')}
              >
                Add to Calendar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;