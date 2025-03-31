import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaCalendarAlt } from 'react-icons/fa';
import { format } from 'date-fns';

function EventCard({ event }) {
  const formattedStartDate = format(new Date(event.startDate), 'MMM d, yyyy • h:mm a');
  
  return (
    <Link to={`/events/${event.id}`} className="block h-full">
      <div className="card h-full flex flex-col transition-shadow hover:shadow-lg">
        <div className="flex flex-col sm:flex-row">
          {event.image ? (
            <div className="sm:w-1/3">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-48 sm:h-full object-cover"
              />
            </div>
          ) : (
            <div className="sm:w-1/3 bg-blue-100 flex items-center justify-center">
              <span className="text-6xl">{event.categoryIcon || '📅'}</span>
            </div>
          )}
          
          <div className="p-4 flex-grow sm:w-2/3">
            <div className="mb-2">
              <span className="badge badge-primary">{event.category}</span>
              {event.isPrivate && (
                <span className="badge badge-secondary ml-2">Private Event</span>
              )}
            </div>
            
            <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
            
            <p className="text-gray-600 mb-4 line-clamp-2">
              {event.description}
            </p>
            
            <div className="mt-auto text-sm text-gray-500 space-y-1">
              <div className="flex items-center">
                <FaCalendarAlt className="mr-1" />
                <span>{formattedStartDate}</span>
              </div>
              
              {event.location && (
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-1" />
                  <span>{event.location}</span>
                </div>
              )}
              
              <div className="flex items-center">
                <FaClock className="mr-1" />
                <span>By {event.organizerName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default EventCard;