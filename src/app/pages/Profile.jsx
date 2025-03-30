import React, { useState, useEffect } from 'react';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { mockListings } from '@/modules/listings/data/mockListings';
import ListingCard from '@/modules/listings/components/ListingCard';

function Profile() {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('listings');
  const [userListings, setUserListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch for user's listings
    const fetchUserListings = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call filtered by user ID
        setTimeout(() => {
          // For demo, just use first 3 listings
          setUserListings(mockListings.slice(0, 3));
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching user listings:', error);
        setIsLoading(false);
      }
    };

    fetchUserListings();
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

      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className={`py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'listings'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } cursor-pointer`}
              onClick={() => setActiveTab('listings')}
            >
              My Listings
            </button>
            <button
              className={`py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'favorites'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } cursor-pointer`}
              onClick={() => setActiveTab('favorites')}
            >
              Favorites
            </button>
            <button
              className={`py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'settings'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } cursor-pointer`}
              onClick={() => setActiveTab('settings')}
            >
              Settings
            </button>
          </nav>
        </div>
      </div>

      <div>
        {activeTab === 'listings' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">My Listings</h2>
              <button className="btn-primary cursor-pointer">
                Create New Listing
              </button>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, index) => (
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
            ) : userListings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {userListings.map(listing => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-medium text-gray-600 mb-2">No listings yet</h3>
                <p className="text-gray-500 mb-4">You haven't created any listings yet.</p>
                <button className="btn-primary cursor-pointer">
                  Create Your First Listing
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'favorites' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Favorites</h2>
            
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-medium text-gray-600 mb-2">No favorites yet</h3>
              <p className="text-gray-500 mb-4">You haven't saved any listings as favorites.</p>
              <button className="btn-primary cursor-pointer">
                Browse Listings
              </button>
            </div>
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
  );
}

export default Profile;