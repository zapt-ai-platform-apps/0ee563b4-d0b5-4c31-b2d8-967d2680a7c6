import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/modules/auth/hooks/useAuth';

function CreateEvent() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    isPrivate: false,
    category: '',
    organizerName: user?.email ? user.email.split('@')[0] : '',
    contactEmail: user?.email || '',
    contactPhone: '',
    image: null
  });
  const [errors, setErrors] = useState({});

  const eventCategories = [
    'Simchas',
    'Business Events',
    'School Calendars',
    'Organizational Events',
    'Charity Campaigns',
    'Shul Schedules',
    'Hall Availability',
    'Classes & Workshops',
    'Community Gatherings'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }

    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.startTime) newErrors.startTime = 'Start time is required';
    
    // If end date is provided but no end time
    if (formData.endDate && !formData.endTime) {
      newErrors.endTime = 'End time is required if end date is provided';
    }
    
    // Validate contact info - at least one contact method is required
    if (!formData.contactEmail && !formData.contactPhone) {
      newErrors.contactEmail = 'Please provide at least one contact method';
      newErrors.contactPhone = 'Please provide at least one contact method';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm() || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Prepare date/time values
      const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
      let endDateTime = null;
      
      if (formData.endDate && formData.endTime) {
        endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);
      } else if (formData.endTime) {
        // If only end time is provided, use start date
        endDateTime = new Date(`${formData.startDate}T${formData.endTime}`);
      }
      
      // In a real app, this would be an API call to create the event
      console.log('Submitting event:', {
        ...formData,
        startDate: startDateTime.toISOString(),
        endDate: endDateTime ? endDateTime.toISOString() : null
      });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to success page or event detail
      navigate('/events');
    } catch (error) {
      console.error('Error creating event:', error);
      setErrors(prev => ({ 
        ...prev, 
        submit: 'Failed to create event. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create a New Event</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="form-group md:col-span-2">
              <label htmlFor="title" className="label">Event Title*</label>
              <input
                type="text"
                id="title"
                name="title"
                className={`input ${errors.title ? 'border-red-500' : ''}`}
                value={formData.title}
                onChange={handleChange}
                maxLength={100}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>
            
            {/* Category */}
            <div className="form-group">
              <label htmlFor="category" className="label">Category*</label>
              <select
                id="category"
                name="category"
                className={`select ${errors.category ? 'border-red-500' : ''}`}
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                {eventCategories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>
            
            {/* Location */}
            <div className="form-group">
              <label htmlFor="location" className="label">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                className="input"
                placeholder="E.g., Community Center, Online via Zoom"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            
            {/* Start Date */}
            <div className="form-group">
              <label htmlFor="startDate" className="label">Start Date*</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                className={`input ${errors.startDate ? 'border-red-500' : ''}`}
                value={formData.startDate}
                onChange={handleChange}
              />
              {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
            </div>
            
            {/* Start Time */}
            <div className="form-group">
              <label htmlFor="startTime" className="label">Start Time*</label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                className={`input ${errors.startTime ? 'border-red-500' : ''}`}
                value={formData.startTime}
                onChange={handleChange}
              />
              {errors.startTime && <p className="text-red-500 text-sm mt-1">{errors.startTime}</p>}
            </div>
            
            {/* End Date */}
            <div className="form-group">
              <label htmlFor="endDate" className="label">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                className="input"
                min={formData.startDate}
                value={formData.endDate}
                onChange={handleChange}
              />
              <p className="text-gray-500 text-sm mt-1">Optional - leave blank for single-day events</p>
            </div>
            
            {/* End Time */}
            <div className="form-group">
              <label htmlFor="endTime" className="label">End Time</label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                className={`input ${errors.endTime ? 'border-red-500' : ''}`}
                value={formData.endTime}
                onChange={handleChange}
              />
              {errors.endTime && <p className="text-red-500 text-sm mt-1">{errors.endTime}</p>}
            </div>
            
            {/* Description */}
            <div className="form-group md:col-span-2">
              <label htmlFor="description" className="label">Description*</label>
              <textarea
                id="description"
                name="description"
                rows="5"
                className={`input ${errors.description ? 'border-red-500' : ''}`}
                value={formData.description}
                onChange={handleChange}
              ></textarea>
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>
            
            {/* Organizer Name */}
            <div className="form-group">
              <label htmlFor="organizerName" className="label">Organizer Name</label>
              <input
                type="text"
                id="organizerName"
                name="organizerName"
                className="input"
                value={formData.organizerName}
                onChange={handleChange}
              />
            </div>
            
            {/* Privacy */}
            <div className="form-group flex items-center">
              <input
                type="checkbox"
                id="isPrivate"
                name="isPrivate"
                className="mr-2 h-4 w-4"
                checked={formData.isPrivate}
                onChange={handleChange}
              />
              <label htmlFor="isPrivate" className="text-sm font-medium text-gray-700">
                This is a private event (only visible to those with the link)
              </label>
            </div>
            
            {/* Contact Email */}
            <div className="form-group">
              <label htmlFor="contactEmail" className="label">Contact Email</label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                className={`input ${errors.contactEmail ? 'border-red-500' : ''}`}
                value={formData.contactEmail}
                onChange={handleChange}
              />
              {errors.contactEmail && <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>}
            </div>
            
            {/* Contact Phone */}
            <div className="form-group">
              <label htmlFor="contactPhone" className="label">Contact Phone</label>
              <input
                type="tel"
                id="contactPhone"
                name="contactPhone"
                className={`input ${errors.contactPhone ? 'border-red-500' : ''}`}
                value={formData.contactPhone}
                onChange={handleChange}
              />
              {errors.contactPhone && <p className="text-red-500 text-sm mt-1">{errors.contactPhone}</p>}
            </div>
            
            {/* Image Upload */}
            <div className="form-group md:col-span-2">
              <label htmlFor="image" className="label">Event Image</label>
              <input
                type="file"
                id="image"
                name="image"
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                accept="image/*"
                onChange={handleChange}
              />
              <p className="text-gray-500 text-sm mt-1">Optional - Max 5MB</p>
            </div>
          </div>
          
          {errors.submit && (
            <div className="mt-4 p-2 bg-red-100 text-red-700 rounded-md">
              {errors.submit}
            </div>
          )}
          
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className={`btn-primary ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Event...
                </span>
              ) : (
                'Create Event'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;