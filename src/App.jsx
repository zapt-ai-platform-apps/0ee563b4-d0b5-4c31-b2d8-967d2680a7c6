import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './modules/core/components/Header';
import Footer from './modules/core/components/Footer';
import Home from './app/pages/Home';
import ListingsPage from './app/pages/ListingsPage';
import ListingDetail from './app/pages/ListingDetail';
import CreateListing from './app/pages/CreateListing';
import CategoryPage from './app/pages/CategoryPage';
import ProfilePage from './app/pages/ProfilePage';
import AuthPage from './app/pages/AuthPage';
import NotFound from './app/pages/NotFound';
import EventsPage from './app/pages/EventsPage';
import EventDetail from './app/pages/EventDetail';
import CreateEvent from './app/pages/CreateEvent';
import JobsPage from './app/pages/JobsPage';
import JobDetail from './app/pages/JobDetail';
import CreateJob from './app/pages/CreateJob';
import BusinessesPage from './app/pages/BusinessesPage';
import BusinessDetail from './app/pages/BusinessDetail';
import CreateBusiness from './app/pages/CreateBusiness';

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
          
          {/* Marketplace Routes */}
          <Route path="/marketplace" element={<ListingsPage />} />
          <Route path="/marketplace/:id" element={<ListingDetail />} />
          <Route path="/marketplace/category/:categorySlug" element={<CategoryPage />} />
          <Route path="/marketplace/create" element={
            <ProtectedRoute>
              <CreateListing />
            </ProtectedRoute>
          } />
          
          {/* Calendar Routes */}
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/events/create" element={
            <ProtectedRoute>
              <CreateEvent />
            </ProtectedRoute>
          } />
          
          {/* Jobs Routes */}
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/jobs/create" element={
            <ProtectedRoute>
              <CreateJob />
            </ProtectedRoute>
          } />
          
          {/* Business Directory Routes */}
          <Route path="/businesses" element={<BusinessesPage />} />
          <Route path="/businesses/:id" element={<BusinessDetail />} />
          <Route path="/businesses/create" element={
            <ProtectedRoute>
              <CreateBusiness />
            </ProtectedRoute>
          } />
          
          {/* User Routes */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
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