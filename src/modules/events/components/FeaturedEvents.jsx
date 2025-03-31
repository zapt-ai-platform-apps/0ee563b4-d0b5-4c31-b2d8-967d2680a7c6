import React from 'react';
import EventCard from './EventCard';
import { mockEvents } from '../data/mockEvents';

function FeaturedEvents() {
  // In a real app, we would fetch the featured events from the API
  const upcomingEvents = mockEvents.slice(0, 3);

  return (
    <div className="space-y-4">      
      {upcomingEvents.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default FeaturedEvents;