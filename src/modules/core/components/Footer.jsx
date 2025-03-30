import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/modules/listings/data/categories';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Jewish Gumtree</h3>
            <p className="text-gray-300 mb-4">
              Buy and sell items within the Jewish community. Find kosher goods, Judaica items, holiday supplies, and more.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              {categories.slice(0, 6).map(category => (
                <li key={category.slug}>
                  <Link 
                    to={`/category/${category.slug}`}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/listings" className="text-gray-300 hover:text-white transition-colors">
                  Browse All
                </Link>
              </li>
              <li>
                <Link to="/create-listing" className="text-gray-300 hover:text-white transition-colors">
                  Post an Ad
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-gray-300 hover:text-white transition-colors">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Community</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Safety Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Community Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gray-700 my-6" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {year} Jewish Gumtree. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;