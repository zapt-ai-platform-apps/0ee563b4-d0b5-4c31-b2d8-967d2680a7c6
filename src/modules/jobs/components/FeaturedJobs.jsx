import React from 'react';
import JobCard from './JobCard';
import { mockJobs } from '../data/mockJobs';

function FeaturedJobs() {
  // In a real app, we would fetch the featured jobs from the API
  const featuredJobs = mockJobs.filter(job => job.isFeatured).slice(0, 3);
  
  // If we don't have enough featured jobs, add some regular ones
  const displayJobs = featuredJobs.length < 3 
    ? [...featuredJobs, ...mockJobs.filter(job => !job.isFeatured).slice(0, 3 - featuredJobs.length)]
    : featuredJobs;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">      
      {displayJobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default FeaturedJobs;