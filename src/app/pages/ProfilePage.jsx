import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import ListingCard from '@/modules/listings/components/ListingCard';
import EventCard from '@/modules/events/components/EventCard';
import JobCard from '@/modules/jobs/components/JobCard';
import BusinessCard from '@/modules/businesses/components/BusinessCard';
import { mockListings } from '@/modules/listings/data/mockListings';
import { mockEvents } from '@/modules/events/data/mockEvents';
import { mockJobs } from '@/modules/jobs/data/mockJobs';
import { mockBusinesses } from '@/modules/businesses/data/mockBusinesses';

function ProfilePage() {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [userItems, setUserItems] = useState({
    listings: [],
    events: [],
    jobs: [],
    businesses: []
  });

  useEffect(() => {
    // Simulate API fetch for user's data
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be API calls filtered by user ID
        setTimeout(() => {
          setUserItems({
            listings: mockListings.slice(0, 2),
            events: mockEvents.slice(0, 1),
            jobs: mockJobs.slice(0, 1),
            businesses: mockBusinesses.slice(0, 1)
          });
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Account</h1>
            <p className="text-gray-600">{user?.email}</p>
          </div>
          <button 
            onClick={handleSignOut}
            className="btn-secondary mt-4 md:mt-0 cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <nav className="bg-gray-50 border-b">
              <div className="flex flex-col">
                <button
                  className={`py-3 px-4 text-left font-medium ${
                    activeTab === 'dashboard'
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  } cursor-pointer`}
                  onClick={() => setActiveTab('dashboard')}
                >
                  Dashboard
                </button>
                <button
                  className={`py-3 px-4 text-left font-medium ${
                    activeTab === 'listings'
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  } cursor-pointer`}
                  onClick={() => setActiveTab('listings')}
                >
                  My Listings
                </button>
                <button
                  className={`py-3 px-4 text-left font-medium ${
                    activeTab === 'events'
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  } cursor-pointer`}
                  onClick={() => setActiveTab('events')}
                >
                  My Events
                </button>
                <button
                  className={`py-3 px-4 text-left font-medium ${
                    activeTab === 'jobs'
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  } cursor-pointer`}
                  onClick={() => setActiveTab('jobs')}
                >
                  My Jobs
                </button>
                <button
                  className={`py-3 px-4 text-left font-medium ${
                    activeTab === 'businesses'
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  } cursor-pointer`}
                  onClick={() => setActiveTab('businesses')}
                >
                  My Businesses
                </button>
                <button
                  className={`py-3 px-4 text-left font-medium ${
                    activeTab === 'settings'
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  } cursor-pointer`}
                  onClick={() => setActiveTab('settings')}
                >
                  Settings
                </button>
              </div>
            </nav>
          </div>
        </div>

        <div className="lg:col-span-3">
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
              
              {isLoading ? (
                <div className="animate-pulse space-y-6">
                  <div className="h-32 bg-gray-200 rounded-lg"></div>
                  <div className="h-64 bg-gray-200 rounded-lg"></div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
                      <p className="text-gray-500 text-sm">Marketplace Listings</p>
                      <p className="text-2xl font-bold">{userItems.listings.length}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
                      <p className="text-gray-500 text-sm">Events</p>
                      <p className="text-2xl font-bold">{userItems.events.length}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500">
                      <p className="text-gray-500 text-sm">Jobs</p>
                      <p className="text-2xl font-bold">{userItems.jobs.length}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-yellow-500">
                      <p className="text-gray-500 text-sm">Businesses</p>
                      <p className="text-2xl font-bold">{userItems.businesses.length}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      <Link to="/marketplace/create" className="btn-primary text-center cursor-pointer">
                        Add Listing
                      </Link>
                      <Link to="/events/create" className="btn-primary text-center cursor-pointer">
                        Create Event
                      </Link>
                      <Link to="/jobs/create" className="btn-primary text-center cursor-pointer">
                        Post Job
                      </Link>
                      <Link to="/businesses/create" className="btn-primary text-center cursor-pointer">
                        Add Business
                      </Link>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      {userItems.listings.length > 0 && (
                        <div className="flex items-start border-b pb-4">
                          <div className="bg-blue-100 text-blue-600 p-2 rounded-md mr-4">🛒</div>
                          <div>
                            <p className="font-medium">Listed an item: {userItems.listings[0].title}</p>
                            <p className="text-sm text-gray-500">2 days ago</p>
                          </div>
                        </div>
                      )}
                      
                      {userItems.events.length > 0 && (
                        <div className="flex items-start border-b pb-4">
                          <div className="bg-green-100 text-green-600 p-2 rounded-md mr-4">📅</div>
                          <div>
                            <p className="font-medium">Created an event: {userItems.events[0].title}</p>
                            <p className="text-sm text-gray-500">5 days ago</p>
                          </div>
                        </div>
                      )}
                      
                      {userItems.jobs.length > 0 && (
                        <div className="flex items-start">
                          <div className="bg-purple-100 text-purple-600 p-2 rounded-md mr-4">💼</div>
                          <div>
                            <p className="font-medium">Posted a job: {userItems.jobs[0].title}</p>
                            <p className="text-sm text-gray-500">1 week ago</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
          
          {activeTab === 'listings' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Marketplace Listings</h2>
                <Link to="/marketplace/create" className="btn-primary cursor-pointer">
                  Add New Listing
                </Link>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[...Array(2)].map((_, index) => (
                    <div key={index} className="card animate-pulse">
                      <div className="bg-gray-200 w-full h-48"></div>
                      <div className="p-4">
                        <div className="h-4 bg-gray-200 rounded mb-2 w-1/4"></div>
                        <div className="h-6 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                        <div className="h-6 bg-gray-200 rounded mb-2 w-1/3"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : userItems.listings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {userItems.listings.map(listing => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-medium text-gray-600 mb-2">No listings yet</h3>
                  <p className="text-gray-500 mb-4">You haven't created any marketplace listings yet.</p>
                  <Link to="/marketplace/create" className="btn-primary cursor-pointer">
                    Create Your First Listing
                  </Link>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'events' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Events</h2>
                <Link to="/events/create" className="btn-primary cursor-pointer">
                  Create New Event
                </Link>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 gap-6">
                  {[...Array(2)].map((_, index) => (
                    <div key={index} className="card animate-pulse">
                      <div className="p-4">
                        <div className="h-6 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2 w-1/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : userItems.events.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {userItems.events.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-medium text-gray-600 mb-2">No events yet</h3>
                  <p className="text-gray-500 mb-4">You haven't created any events yet.</p>
                  <Link to="/events/create" className="btn-primary cursor-pointer">
                    Create Your First Event
                  </Link>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'jobs' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Jobs</h2>
                <Link to="/jobs/create" className="btn-primary cursor-pointer">
                  Post New Job
                </Link>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 gap-6">
                  {[...Array(2)].map((_, index) => (
                    <div key={index} className="card animate-pulse">
                      <div className="p-4">
                        <div className="h-6 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2 w-1/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : userItems.jobs.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {userItems.jobs.map(job => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-medium text-gray-600 mb-2">No jobs yet</h3>
                  <p className="text-gray-500 mb-4">You haven't posted any jobs yet.</p>
                  <Link to="/jobs/create" className="btn-primary cursor-pointer">
                    Post Your First Job
                  </Link>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'businesses' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Businesses</h2>
                <Link to="/businesses/create" className="btn-primary cursor-pointer">
                  Add New Business
                </Link>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 gap-6">
                  {[...Array(2)].map((_, index) => (
                    <div key={index} className="card animate-pulse">
                      <div className="p-4">
                        <div className="h-6 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2 w-1/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : userItems.businesses.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {userItems.businesses.map(business => (
                    <BusinessCard key={business.id} business={business} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-medium text-gray-600 mb-2">No businesses yet</h3>
                  <p className="text-gray-500 mb-4">You haven't added any businesses yet.</p>
                  <Link to="/businesses/create" className="btn-primary cursor-pointer">
                    Add Your First Business
                  </Link>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <form>
                  <div className="form-group">
                    <label htmlFor="displayName" className="label">Display Name</label>
                    <input
                      type="text"
                      id="displayName"
                      name="displayName"
                      className="input"
                      placeholder="Your display name"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email" className="label">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="input"
                      value={user?.email || ''}
                      disabled
                    />
                    <p className="text-gray-500 text-sm mt-1">Cannot be changed</p>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone" className="label">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="input"
                      placeholder="Your phone number"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="location" className="label">Default Location</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      className="input"
                      placeholder="E.g., London, Manchester"
                    />
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button
                      type="submit"
                      className="btn-primary cursor-pointer"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
              
              <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Notification Preferences</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="emailNotifications"
                      name="emailNotifications"
                      className="mr-2 h-4 w-4"
                      defaultChecked
                    />
                    <label htmlFor="emailNotifications">
                      Email notifications for messages
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="newListingAlerts"
                      name="newListingAlerts"
                      className="mr-2 h-4 w-4"
                      defaultChecked
                    />
                    <label htmlFor="newListingAlerts">
                      Alerts for new listings matching your interests
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="eventReminders"
                      name="eventReminders"
                      className="mr-2 h-4 w-4"
                      defaultChecked
                    />
                    <label htmlFor="eventReminders">
                      Event reminders and updates
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="jobAlerts"
                      name="jobAlerts"
                      className="mr-2 h-4 w-4"
                      defaultChecked
                    />
                    <label htmlFor="jobAlerts">
                      Job alerts matching your profile
                    </label>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="btn-primary cursor-pointer"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;