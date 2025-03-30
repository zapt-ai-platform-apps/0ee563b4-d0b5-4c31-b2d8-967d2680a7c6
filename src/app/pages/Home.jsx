import React from 'react';
import { Link } from 'react-router-dom';
import CategoryList from '@/modules/listings/components/CategoryList';
import FeaturedListings from '@/modules/listings/components/FeaturedListings';

function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            The Jewish Community Marketplace
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Buy, sell, and connect within the Jewish community. Find kosher goods, Judaica, holiday items, and more.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/listings" className="btn-primary bg-white text-blue-600 hover:bg-blue-100 text-lg px-6 py-3 cursor-pointer">
              Browse Listings
            </Link>
            <Link to="/create-listing" className="btn-primary bg-blue-700 hover:bg-blue-800 text-lg px-6 py-3 cursor-pointer">
              Post an Ad
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Categories Section */}
        <CategoryList />
        
        {/* Featured Listings Section */}
        <FeaturedListings />
        
        {/* How It Works Section */}
        <section className="py-12">
          <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-4xl mb-4 text-blue-600">1</div>
              <h3 className="text-xl font-semibold mb-3">Post Your Listing</h3>
              <p className="text-gray-600">
                Create an account and post items you want to sell or services you're offering to the community.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-4xl mb-4 text-blue-600">2</div>
              <h3 className="text-xl font-semibold mb-3">Connect With Buyers</h3>
              <p className="text-gray-600">
                Interested community members will contact you through our secure messaging system.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-4xl mb-4 text-blue-600">3</div>
              <h3 className="text-xl font-semibold mb-3">Complete the Sale</h3>
              <p className="text-gray-600">
                Arrange to meet safely or ship items to complete your transaction within the community.
              </p>
            </div>
          </div>
        </section>
        
        {/* Community Banner */}
        <section className="py-12 bg-blue-50 rounded-lg my-8 p-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
            <p className="text-lg mb-6">
              Jewish Gumtree is more than a marketplace - it's a way to connect with the broader Jewish community, support local businesses, and find the items you need for holidays, celebrations, and everyday life.
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