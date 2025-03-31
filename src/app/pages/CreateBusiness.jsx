import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/modules/auth/hooks/useAuth';

function CreateBusiness() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    location: '',
    address: '',
    phone: '',
    email: user?.email || '',
    website: '',
    isFeatured: false,
    hours: '',
    logo: null,
    images: []
  });
  const [errors, setErrors] = useState({});

  const businessCategories = [
    'Kosher Food & Restaurants',
    'Judaica & Gift Shops',
    'Educational Services',
    'Event Venues & Services',
    'Religious Services',
    'Health & Wellness',
    'Professional Services',
    'Home & Family',
    'Technology & Media',
    'Community Organizations'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      if (name === 'logo') {
        setFormData(prev => ({
          ...prev,
          [name]: files[0]
        }));
      } else if (name === 'images') {
        const imageFiles = Array.from(files);
        setFormData(prev => ({
          ...prev,
          [name]: [...prev.images, ...imageFiles].slice(0, 5) // Limit to 5 images
        }));
      }
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

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Business name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    
    // Validate contact info - at least one contact method is required
    if (!formData.email && !formData.phone && !formData.website) {
      newErrors.email = 'Please provide at least one contact method';
      newErrors.phone = 'Please provide at least one contact method';
      newErrors.website = 'Please provide at least one contact method';
    }

    // Validate website format if provided
    if (formData.website && !/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(formData.website)) {
      newErrors.website = 'Please enter a valid website URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm() || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Format website if it doesn't have http/https
      let formattedData = { ...formData };
      if (formData.website && !formData.website.startsWith('http')) {
        formattedData.website = `https://${formData.website}`;
      }
      
      // In a real app, this would be an API call to create the business
      console.log('Submitting business:', formattedData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to success page or business detail
      navigate('/businesses');
    } catch (error) {
      console.error('Error creating business:', error);
      setErrors(prev => ({ 
        ...prev, 
        submit: 'Failed to create business listing. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add Your Business</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Business Name */}
            <div className="form-group md:col-span-2">
              <label htmlFor="name" className="label">Business Name*</label>
              <input
                type="text"
                id="name"
                name="name"
                className={`input ${errors.name ? 'border-red-500' : ''}`}
                value={formData.name}
                onChange={handleChange}
                maxLength={100}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
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
                {businessCategories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>
            
            {/* Location */}
            <div className="form-group">
              <label htmlFor="location" className="label">Location/Area*</label>
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
            
            {/* Address */}
            <div className="form-group md:col-span-2">
              <label htmlFor="address" className="label">Full Address</label>
              <input
                type="text"
                id="address"
                name="address"
                className="input"
                placeholder="Street address, City, Postal code"
                value={formData.address}
                onChange={handleChange}
              />
              <p className="text-gray-500 text-sm mt-1">Optional - providing full address allows customers to get directions</p>
            </div>
            
            {/* Phone */}
            <div className="form-group">
              <label htmlFor="phone" className="label">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={`input ${errors.phone ? 'border-red-500' : ''}`}
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
            
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email" className="label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`input ${errors.email ? 'border-red-500' : ''}`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            
            {/* Website */}
            <div className="form-group">
              <label htmlFor="website" className="label">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                className={`input ${errors.website ? 'border-red-500' : ''}`}
                placeholder="E.g., www.example.com"
                value={formData.website}
                onChange={handleChange}
              />
              {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website}</p>}
            </div>
            
            {/* Hours */}
            <div className="form-group">
              <label htmlFor="hours" className="label">Business Hours</label>
              <textarea
                id="hours"
                name="hours"
                rows="3"
                className="input"
                placeholder="E.g., Monday-Friday: 9am-5pm, Saturday: Closed, Sunday: 10am-4pm"
                value={formData.hours}
                onChange={handleChange}
              ></textarea>
            </div>
            
            {/* Description */}
            <div className="form-group md:col-span-2">
              <label htmlFor="description" className="label">Business Description*</label>
              <textarea
                id="description"
                name="description"
                rows="5"
                className={`input ${errors.description ? 'border-red-500' : ''}`}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your business, services, products, and what makes you unique"
              ></textarea>
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>
            
            {/* Logo Upload */}
            <div className="form-group">
              <label htmlFor="logo" className="label">Business Logo</label>
              <input
                type="file"
                id="logo"
                name="logo"
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                accept="image/*"
                onChange={handleChange}
              />
              <p className="text-gray-500 text-sm mt-1">Optional - Max 2MB</p>
              
              {formData.logo && (
                <div className="mt-2">
                  <div className="w-20 h-20 relative">
                    <img 
                      src={URL.createObjectURL(formData.logo)} 
                      alt="Logo preview"
                      className="w-full h-full object-contain"
                    />
                    <button
                      type="button"
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
                      onClick={() => setFormData(prev => ({ ...prev, logo: null }))}
                    >
                      &times;
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Images Upload */}
            <div className="form-group">
              <label htmlFor="images" className="label">Business Photos</label>
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
                onChange={handleChange}
              />
              <p className="text-gray-500 text-sm mt-1">Optional - Up to 5 images, max 2MB each</p>
              
              {formData.images.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img 
                        src={URL.createObjectURL(image)} 
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
            
            {/* Featured Business */}
            <div className="form-group flex items-center md:col-span-2">
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                className="mr-2 h-4 w-4"
                checked={formData.isFeatured}
                onChange={handleChange}
              />
              <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700">
                List as a featured business (increased visibility)
              </label>
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
                  Adding Business...
                </span>
              ) : (
                'Add Business'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateBusiness;