import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaBriefcase, FaBuilding, FaPoundSign, FaGlobe, FaPhone, FaEnvelope } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import { mockJobs } from '@/modules/jobs/data/mockJobs';

function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    // Simulate API fetch
    const fetchJob = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          const foundJob = mockJobs.find(item => item.id === id);
          setJob(foundJob || null);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching job:', error);
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
            </div>
            <div className="md:w-1/3">
              <div className="bg-gray-200 w-full h-60 rounded-lg mb-4"></div>
              <div className="h-10 bg-gray-200 rounded mb-2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Job Not Found</h1>
        <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
        <Link to="/jobs" className="btn-primary cursor-pointer">
          Browse All Jobs
        </Link>
      </div>
    );
  }

  const formattedDate = formatDistanceToNow(new Date(job.createdAt), { addSuffix: true });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/jobs" className="text-blue-600 hover:underline">
          &larr; Back to jobs
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <div className="mb-6">
            <span className="badge badge-primary mr-2">{job.jobType}</span>
            {job.isFeatured && (
              <span className="badge bg-yellow-100 text-yellow-800">Featured</span>
            )}
          </div>
          
          <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
          <h2 className="text-xl text-gray-600 mb-6">{job.companyName}</h2>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">Job Description</h3>
            <p className="text-gray-700 whitespace-pre-line">
              {job.description}
            </p>
          </div>
          
          {job.website && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Company Website</h3>
              <a 
                href={job.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center"
              >
                <FaGlobe className="mr-2" />
                {job.website}
              </a>
            </div>
          )}
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">How to Apply</h3>
            
            {showContact ? (
              <div className="space-y-4">
                {job.contactEmail && (
                  <div className="flex items-center">
                    <FaEnvelope className="mr-2 text-gray-600" />
                    <a 
                      href={`mailto:${job.contactEmail}?subject=Application for ${job.title} position`}
                      className="text-blue-600 hover:underline"
                    >
                      {job.contactEmail}
                    </a>
                  </div>
                )}
                
                {job.contactPhone && (
                  <div className="flex items-center">
                    <FaPhone className="mr-2 text-gray-600" />
                    <a 
                      href={`tel:${job.contactPhone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {job.contactPhone}
                    </a>
                  </div>
                )}
                
                <button 
                  onClick={() => setShowContact(false)}
                  className="btn-secondary mt-4 cursor-pointer"
                >
                  Hide Contact Info
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowContact(true)}
                className="btn-primary cursor-pointer"
              >
                Show Contact Information
              </button>
            )}
          </div>
        </div>
        
        <div className="md:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h3 className="text-xl font-semibold mb-4">Job Details</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <FaBuilding className="mt-1 mr-2 text-blue-600" />
                <div>
                  <p className="font-medium">Company</p>
                  <p>{job.companyName}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-2 text-blue-600" />
                <div>
                  <p className="font-medium">Location</p>
                  <p>{job.location}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FaBriefcase className="mt-1 mr-2 text-blue-600" />
                <div>
                  <p className="font-medium">Job Type</p>
                  <p>{job.jobType}</p>
                </div>
              </div>
              
              {job.salary && (
                <div className="flex items-start">
                  <FaPoundSign className="mt-1 mr-2 text-blue-600" />
                  <div>
                    <p className="font-medium">Salary</p>
                    <p>{job.salary}</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-start">
                <FaClock className="mt-1 mr-2 text-blue-600" />
                <div>
                  <p className="font-medium">Posted</p>
                  <p>{formattedDate}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <button 
                onClick={() => setShowContact(true)}
                className="btn-primary w-full cursor-pointer"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetail;