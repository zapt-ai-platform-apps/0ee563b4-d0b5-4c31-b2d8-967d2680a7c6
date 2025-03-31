import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarPlus } from 'react-icons/fa';
import EventCard from '@/modules/events/components/EventCard';
import { mockEvents } from '@/modules/events/data/mockEvents';

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    dateRange: 'upcoming',
    privateEvents: false
  });

  useEffect(() => {
    // Simulate API fetch
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setEvents(mockEvents);
          setFilteredEvents(mockEvents);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching events:', error);
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, events]);

  const applyFilters = () => {
    let filtered = [...events];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.location?.toLowerCase().includes(searchLower) ||
        event.organizerName.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(event => 
        event.category === filters.category
      );
    }

    // Apply date range filter
    const now = new Date();
    if (filters.dateRange === 'upcoming') {
      filtered = filtered.filter(event => 
        new Date(event.startDate) >= now
      );
    } else if (filters.dateRange === 'today') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.startDate);
        return eventDate >= today && eventDate < tomorrow;
      });
    } else if (filters.dateRange === 'week') {
      const weekLater = new Date(now);
      weekLater.setDate(weekLater.getDate() + 7);
      
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.startDate);
        return eventDate >= now && eventDate <= weekLater;
      });
    } else if (filters.dateRange === 'month') {
      const monthLater = new Date(now);
      monthLater.setMonth(monthLater.getMonth() + 1);
      
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.startDate);
        return eventDate >= now && eventDate <= monthLater;
      });
    }

    // Apply private events filter
    if (!filters.privateEvents) {
      filtered = filtered.filter(event => !event.isPrivate);
    }

    setFilteredEvents(filtered);
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

  // Get unique categories from events
  const categories = [...new Set(events.map(event => event.category))];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold mb-2 sm:mb-0">Community Events</h1>
        
        <Link 
          to="/events/create" 
          className="btn-primary flex items-center cursor-pointer"
        >
          <FaCalendarPlus className="mr-2" />
          Create Event
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <h3 className="text-lg font-semibold mb-4">Filter Events</h3>
            
            <form onSubmit={handleSearchSubmit}>
              <div className="form-group">
                <label htmlFor="search" className="label">Search</label>
                <input
                  type="text"
                  id="search"
                  name="search"
                  className="input"
                  placeholder="Search events..."
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
                <label htmlFor="dateRange" className="label">Date Range</label>
                <select
                  id="dateRange"
                  name="dateRange"
                  className="select"
                  value={filters.dateRange}
                  onChange={handleFilterChange}
                >
                  <option value="upcoming">All Upcoming</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="all">All Events</option>
                </select>
              </div>
              
              <div className="form-group flex items-center">
                <input
                  type="checkbox"
                  id="privateEvents"
                  name="privateEvents"
                  className="mr-2 h-4 w-4"
                  checked={filters.privateEvents}
                  onChange={handleFilterChange}
                />
                <label htmlFor="privateEvents" className="text-sm font-medium text-gray-700">
                  Include Private Events
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
                    <div className="sm:w-1/3 bg-gray-200 h-48"></div>
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
          ) : filteredEvents.length > 0 ? (
            <div className="space-y-6">
              {filteredEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-medium text-gray-600 mb-2">No events found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your filters or create a new event</p>
              <Link to="/events/create" className="btn-primary cursor-pointer">
                Create an Event
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventsPage;