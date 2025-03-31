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
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to Shtetl
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            The digital hub connecting the Jewish community. Find marketplace items, events, jobs, and local businesses all in one place.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Link to="/marketplace" className="btn-primary bg-white text-blue-600 hover:bg-blue-100 text-lg px-4 py-3 rounded-lg cursor-pointer flex flex-col items-center justify-center">
              <span className="text-2xl mb-1">🛒</span>
              <span>Marketplace</span>
            </Link>
            <Link to="/events" className="btn-primary bg-white text-blue-600 hover:bg-blue-100 text-lg px-4 py-3 rounded-lg cursor-pointer flex flex-col items-center justify-center">
              <span className="text-2xl mb-1">📅</span>
              <span>Events</span>
            </Link>
            <Link to="/jobs" className="btn-primary bg-white text-blue-600 hover:bg-blue-100 text-lg px-4 py-3 rounded-lg cursor-pointer flex flex-col items-center justify-center">
              <span className="text-2xl mb-1">💼</span>
              <span>Jobs</span>
            </Link>
            <Link to="/businesses" className="btn-primary bg-white text-blue-600 hover:bg-blue-100 text-lg px-4 py-3 rounded-lg cursor-pointer flex flex-col items-center justify-center">
              <span className="text-2xl mb-1">🏢</span>
              <span>Businesses</span>
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
        <section className="py-12 bg-blue-50 rounded-lg my-8 p-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
            <p className="text-lg mb-6">
              Shtetl is more than a platform - it's a movement to unify and empower the Jewish community through digital innovation.
            </p>
            <Link to="/auth" className="btn-primary cursor-pointer">
              Sign Up Now
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;