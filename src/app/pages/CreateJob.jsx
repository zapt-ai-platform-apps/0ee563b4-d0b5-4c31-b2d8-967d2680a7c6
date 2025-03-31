import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/modules/auth/hooks/useAuth';

function CreateJob() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    description: '',
    location: '',
    jobType: '',
    salary: '',
    isFeatured: false,
    contactEmail: user?.email || '',
    contactPhone: '',
    website: ''
  });
  const [errors, setErrors] = useState({});

  const jobTypes = [
    'Full-time',
    'Part-time',
    'Contract',
    'Temporary',
    'Volunteer',
    'Internship'
  ];

  const jobCategories = [
    'Education',
    'Healthcare',
    'Technology',
    'Finance',
    'Hospitality',
    'Retail',
    'Religious Services',
    'Community Services',
    'Administrative',
    'Other'
  ];

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
    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.description.trim()) newErrors.description = 'Job description is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.jobType) newErrors.jobType = 'Job type is required';
    
    // Validate contact info - email is required
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Contact email is required';
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
      // In a real app, this would be an API call to create the job
      console.log('Submitting job:', formData);
      
      // Format website if it doesn't have http/https
      let formattedData = { ...formData };
      if (formData.website && !formData.website.startsWith('http')) {
        formattedData.website = `https://${formData.website}`;
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to success page or job detail
      navigate('/jobs');
    } catch (error) {
      console.error('Error creating job:', error);
      setErrors(prev => ({ 
        ...prev, 
        submit: 'Failed to create job listing. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Post a Job</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Job Title */}
            <div className="form-group md:col-span-2">
              <label htmlFor="title" className="label">Job Title*</label>
              <input
                type="text"
                id="title"
                name="title"
                className={`input ${errors.title ? 'border-red-500' : ''}`}
                value={formData.title}
                onChange={handleChange}
                maxLength={100}
                placeholder="E.g., Marketing Manager, Hebrew Teacher"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>
            
            {/* Company Name */}
            <div className="form-group">
              <label htmlFor="companyName" className="label">Company Name*</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                className={`input ${errors.companyName ? 'border-red-500' : ''}`}
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Your company or organization name"
              />
              {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
            </div>
            
            {/* Location */}
            <div className="form-group">
              <label htmlFor="location" className="label">Location*</label>
              <input
                type="text"
                id="location"
                name="location"
                className={`input ${errors.location ? 'border-red-500' : ''}`}
                placeholder="E.g., London, Remote, Hybrid"
                value={formData.location}
                onChange={handleChange}
              />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>
            
            {/* Job Type */}
            <div className="form-group">
              <label htmlFor="jobType" className="label">Job Type*</label>
              <select
                id="jobType"
                name="jobType"
                className={`select ${errors.jobType ? 'border-red-500' : ''}`}
                value={formData.jobType}
                onChange={handleChange}
              >
                <option value="">Select job type</option>
                {jobTypes.map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.jobType && <p className="text-red-500 text-sm mt-1">{errors.jobType}</p>}
            </div>
            
            {/* Salary */}
            <div className="form-group">
              <label htmlFor="salary" className="label">Salary/Compensation</label>
              <input
                type="text"
                id="salary"
                name="salary"
                className="input"
                placeholder="E.g., £30,000-£35,000, Competitive, £15 per hour"
                value={formData.salary}
                onChange={handleChange}
              />
              <p className="text-gray-500 text-sm mt-1">Optional - providing salary information increases applicant interest</p>
            </div>
            
            {/* Description */}
            <div className="form-group md:col-span-2">
              <label htmlFor="description" className="label">Job Description*</label>
              <textarea
                id="description"
                name="description"
                rows="8"
                className={`input ${errors.description ? 'border-red-500' : ''}`}
                value={formData.description}
                onChange={handleChange}
                placeholder="Include details about responsibilities, qualifications, benefits, and how to apply"
              ></textarea>
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>
            
            {/* Contact Email */}
            <div className="form-group">
              <label htmlFor="contactEmail" className="label">Contact Email*</label>
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
                className="input"
                value={formData.contactPhone}
                onChange={handleChange}
              />
              <p className="text-gray-500 text-sm mt-1">Optional</p>
            </div>
            
            {/* Website */}
            <div className="form-group">
              <label htmlFor="website" className="label">Company Website</label>
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
              <p className="text-gray-500 text-sm mt-1">Optional</p>
            </div>
            
            {/* Featured Job */}
            <div className="form-group flex items-center">
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                className="mr-2 h-4 w-4"
                checked={formData.isFeatured}
                onChange={handleChange}
              />
              <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700">
                List as a featured job (increased visibility)
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
                  Posting Job...
                </span>
              ) : (
                'Post Job'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateJob;