import React from 'react';
import { Link } from 'react-router-dom';
import FeaturedListings from '@/modules/listings/components/FeaturedListings';
import FeaturedEvents from '@/modules/events/components/FeaturedEvents';
import FeaturedJobs from '@/modules/jobs/components/FeaturedJobs';
import FeaturedBusinesses from '@/modules/businesses/components/FeaturedBusinesses';

function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white"></div>
          <div className="absolute bottom-20 right-20 w-56 h-56 rounded-full bg-white"></div>
          <div className="absolute top-1/4 right-1/3 w-24 h-24 rounded-full bg-white"></div>
          <div className="absolute bottom-1/3 left-1/4 w-32 h-32 rounded-full bg-white"></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-white"></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Connect with the <span className="text-yellow-300">Jewish Community</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed">
              Shtetl brings together marketplace listings, community events, job opportunities, and local businesses all in one digital hub.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Link to="/marketplace" className="transition-transform hover:scale-105 duration-200 bg-white rounded-xl shadow-lg hover:shadow-xl overflow-hidden cursor-pointer">
              <div className="p-6 text-center">
                <div className="bg-blue-100 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🛒</span>
                </div>
                <span className="block font-semibold text-blue-700">Marketplace</span>
              </div>
            </Link>
            <Link to="/events" className="transition-transform hover:scale-105 duration-200 bg-white rounded-xl shadow-lg hover:shadow-xl overflow-hidden cursor-pointer">
              <div className="p-6 text-center">
                <div className="bg-green-100 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
                  <span className="text-3xl">📅</span>
                </div>
                <span className="block font-semibold text-green-700">Events</span>
              </div>
            </Link>
            <Link to="/jobs" className="transition-transform hover:scale-105 duration-200 bg-white rounded-xl shadow-lg hover:shadow-xl overflow-hidden cursor-pointer">
              <div className="p-6 text-center">
                <div className="bg-purple-100 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
                  <span className="text-3xl">💼</span>
                </div>
                <span className="block font-semibold text-purple-700">Jobs</span>
              </div>
            </Link>
            <Link to="/businesses" className="transition-transform hover:scale-105 duration-200 bg-white rounded-xl shadow-lg hover:shadow-xl overflow-hidden cursor-pointer">
              <div className="p-6 text-center">
                <div className="bg-amber-100 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🏢</span>
                </div>
                <span className="block font-semibold text-amber-700">Businesses</span>
              </div>
            </Link>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/auth" className="inline-block bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold rounded-full px-8 py-3 shadow-lg transition-colors duration-200 cursor-pointer">
              Join Our Community
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Featured Marketplace Listings Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Marketplace Items</h2>
            <Link to="/marketplace" className="text-blue-600 hover:underline">
              View all
            </Link>
          </div>
          <FeaturedListings />
        </section>
        
        {/* Featured Events Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Upcoming Events</h2>
            <Link to="/events" className="text-blue-600 hover:underline">
              View all
            </Link>
          </div>
          <FeaturedEvents />
        </section>
        
        {/* Featured Jobs Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Latest Jobs</h2>
            <Link to="/jobs" className="text-blue-600 hover:underline">
              View all
            </Link>
          </div>
          <FeaturedJobs />
        </section>
        
        {/* Featured Businesses Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Businesses</h2>
            <Link to="/businesses" className="text-blue-600 hover:underline">
              View all
            </Link>
          </div>
          <FeaturedBusinesses />
        </section>
        
        {/* Community Banner */}
        <section className="py-12 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg my-8 p-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-blue-800">Join Our Community</h2>
            <p className="text-lg mb-6 text-blue-700">
              Shtetl is more than a platform - it's a movement to unify and empower the Jewish community through digital innovation.
            </p>
            <Link to="/auth" className="btn-primary text-lg px-8 py-3 rounded-full shadow-lg cursor-pointer">
              Sign Up Now
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;