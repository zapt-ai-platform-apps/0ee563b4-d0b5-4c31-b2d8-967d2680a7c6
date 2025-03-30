import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './modules/core/components/Header';
import Footer from './modules/core/components/Footer';
import Home from './app/pages/Home';
import ListingsPage from './app/pages/ListingsPage';
import ListingDetail from './app/pages/ListingDetail';
import CreateListing from './app/pages/CreateListing';
import CategoryPage from './app/pages/CategoryPage';
import Profile from './app/pages/Profile';
import AuthPage from './app/pages/AuthPage';
import NotFound from './app/pages/NotFound';
import ProtectedRoute from './modules/auth/ProtectedRoute';
import { useAuth } from './modules/auth/hooks/useAuth';
import ZaptBadge from './modules/core/components/ZaptBadge';

export default function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/listings/:id" element={<ListingDetail />} />
          <Route path="/category/:categorySlug" element={<CategoryPage />} />
          <Route path="/create-listing" element={
            <ProtectedRoute>
              <CreateListing />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <ZaptBadge />
      <Footer />
    </div>
  );
}