import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '@/modules/listings/data/categories';
import { useAuth } from '@/modules/auth/hooks/useAuth';

function CreateListing() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    priceText: '',
    location: '',
    categoryId: '',
    contactEmail: user?.email || '',
    contactPhone: '',
    isShabbatRestricted: false,
    images: []
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.categoryId) newErrors.categoryId = 'Category is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    
    // Validate price - either price or priceText should be provided
    if (!formData.price && !formData.priceText.trim()) {
      newErrors.price = 'Please provide either a specific price or price description';
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
      // In a real app, this would be an API call to create the listing
      console.log('Submitting listing:', formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to success page or listing detail
      // For now, just go back to listings
      navigate('/listings');
    } catch (error) {
      console.error('Error creating listing:', error);
      setErrors(prev => ({ 
        ...prev, 
        submit: 'Failed to create listing. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // In a real app, we would upload these files to storage
    // For now, just create local URLs
    const imageUrls = files.map(file => URL.createObjectURL(file));
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create a New Listing</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="form-group md:col-span-2">
              <label htmlFor="title" className="label">Title*</label>
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
              <label htmlFor="categoryId" className="label">Category*</label>
              <select
                id="categoryId"
                name="categoryId"
                className={`select ${errors.categoryId ? 'border-red-500' : ''}`}
                value={formData.categoryId}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>}
            </div>
            
            {/* Location */}
            <div className="form-group">
              <label htmlFor="location" className="label">Location*</label>
              <input
                type="text"
                id="location"
                name="location"
                className={`input ${errors.location ? 'border-red-500' : ''}`}
                placeholder="E.g., Golders Green, London"
                value={formData.location}
                onChange={handleChange}
              />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>
            
            {/* Price */}
            <div className="form-group">
              <label htmlFor="price" className="label">Price (£)</label>
              <input
                type="number"
                id="price"
                name="price"
                className={`input ${errors.price ? 'border-red-500' : ''}`}
                placeholder="Enter amount"
                min="0"
                value={formData.price}
                onChange={handleChange}
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>
            
            {/* Price Text (alternative) */}
            <div className="form-group">
              <label htmlFor="priceText" className="label">Price Description</label>
              <input
                type="text"
                id="priceText"
                name="priceText"
                className="input"
                placeholder="E.g., 'Free', 'Price negotiable', 'Per hour'"
                value={formData.priceText}
                onChange={handleChange}
              />
              <p className="text-gray-500 text-sm mt-1">Optional - use if exact price doesn't apply</p>
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
            
            {/* Shabbat Restricted */}
            <div className="form-group md:col-span-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isShabbatRestricted"
                  name="isShabbatRestricted"
                  className="mr-2 h-4 w-4"
                  checked={formData.isShabbatRestricted}
                  onChange={handleChange}
                />
                <label htmlFor="isShabbatRestricted" className="text-sm font-medium text-gray-700">
                  I observe Shabbat and cannot respond to inquiries from Friday evening to Saturday night
                </label>
              </div>
            </div>
            
            {/* Image Upload */}
            <div className="form-group md:col-span-2">
              <label htmlFor="images" className="label">Images</label>
              <input
                type="file"
                id="images"
                name="images"
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
              <p className="text-gray-500 text-sm mt-1">Up to 5 images, max 5MB each</p>
              
              {formData.images.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img 
                        src={image} 
                        alt={`Upload preview ${index + 1}`}
                        className="h-20 w-20 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
                        onClick={() => removeImage(index)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
                  Creating Listing...
                </span>
              ) : (
                'Create Listing'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateListing;