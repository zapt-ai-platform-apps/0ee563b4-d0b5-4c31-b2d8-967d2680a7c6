import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { FaSearch, FaUser, FaPlus, FaSignOutAlt, FaBars } from 'react-icons/fa';

function Header() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold flex items-center">
              <img 
                src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=40&height=40" 
                alt="Shtetl" 
                className="mr-2 h-10 w-10"
              />
              Shtetl
            </Link>
            <button 
              className="md:hidden text-white cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <FaBars size={24} />
            </button>
          </div>

          <div className={`mt-4 md:mt-0 flex-grow mx-4 ${isMobileMenuOpen ? 'block' : 'hidden md:block'}`}>
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for items, events, jobs, or businesses..."
                className="w-full py-2 px-4 pr-10 rounded-md text-gray-800 box-border"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute right-0 top-0 h-full px-3 text-gray-600 cursor-pointer"
              >
                <FaSearch />
              </button>
            </form>
          </div>

          <nav className={`mt-4 md:mt-0 ${isMobileMenuOpen ? 'block' : 'hidden md:flex'}`}>
            <ul className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
              <li>
                <Link 
                  to="/marketplace" 
                  className="block py-1 hover:text-blue-200 transition-colors"
                >
                  Marketplace
                </Link>
              </li>
              <li>
                <Link 
                  to="/events" 
                  className="block py-1 hover:text-blue-200 transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link 
                  to="/jobs" 
                  className="block py-1 hover:text-blue-200 transition-colors"
                >
                  Jobs
                </Link>
              </li>
              <li>
                <Link 
                  to="/businesses" 
                  className="block py-1 hover:text-blue-200 transition-colors"
                >
                  Businesses
                </Link>
              </li>

              {user ? (
                <>
                  <li>
                    <Link 
                      to="/profile" 
                      className="flex items-center py-1 hover:text-blue-200 transition-colors"
                    >
                      <FaUser className="mr-1" /> My Account
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={handleSignOut}
                      className="flex items-center py-1 hover:text-blue-200 transition-colors cursor-pointer"
                    >
                      <FaSignOutAlt className="mr-1" /> Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link 
                    to="/auth" 
                    className="py-1 px-3 bg-white text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                  >
                    Sign In
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;