import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBriefcase } from 'react-icons/fa';
import JobCard from '@/modules/jobs/components/JobCard';
import { mockJobs } from '@/modules/jobs/data/mockJobs';

function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    jobType: '',
    location: '',
    featured: false
  });

  useEffect(() => {
    // Simulate API fetch
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setJobs(mockJobs);
          setFilteredJobs(mockJobs);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, jobs]);

  const applyFilters = () => {
    let filtered = [...jobs];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower) ||
        job.companyName.toLowerCase().includes(searchLower)
      );
    }

    // Apply job type filter
    if (filters.jobType) {
      filtered = filtered.filter(job => 
        job.jobType === filters.jobType
      );
    }

    // Apply location filter
    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(locationLower)
      );
    }

    // Apply featured filter
    if (filters.featured) {
      filtered = filtered.filter(job => job.isFeatured);
    }

    setFilteredJobs(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    applyFilters();
  };

  // Get unique job types from jobs
  const jobTypes = [...new Set(jobs.map(job => job.jobType))];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold mb-2 sm:mb-0">Jobs Board</h1>
        
        <Link 
          to="/jobs/create" 
          className="btn-primary flex items-center cursor-pointer"
        >
          <FaBriefcase className="mr-2" />
          Post a Job
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <h3 className="text-lg font-semibold mb-4">Filter Jobs</h3>
            
            <form onSubmit={handleSearchSubmit}>
              <div className="form-group">
                <label htmlFor="search" className="label">Search</label>
                <input
                  type="text"
                  id="search"
                  name="search"
                  className="input"
                  placeholder="Search jobs..."
                  value={filters.search}
                  onChange={handleFilterChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="jobType" className="label">Job Type</label>
                <select
                  id="jobType"
                  name="jobType"
                  className="select"
                  value={filters.jobType}
                  onChange={handleFilterChange}
                >
                  <option value="">All Types</option>
                  {jobTypes.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="location" className="label">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="input"
                  placeholder="E.g., London, Manchester"
                  value={filters.location}
                  onChange={handleFilterChange}
                />
              </div>
              
              <div className="form-group flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  className="mr-2 h-4 w-4"
                  checked={filters.featured}
                  onChange={handleFilterChange}
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                  Featured Jobs Only
                </label>
              </div>
              
              <button
                type="submit"
                className="btn-primary w-full mt-4 cursor-pointer"
              >
                Apply Filters
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="card animate-pulse">
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2 w-1/4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-medium text-gray-600 mb-2">No jobs found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your filters or post a new job</p>
              <Link to="/jobs/create" className="btn-primary cursor-pointer">
                Post a Job
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobsPage;