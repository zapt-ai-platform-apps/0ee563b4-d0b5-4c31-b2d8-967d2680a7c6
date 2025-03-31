import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaBriefcase, FaPoundSign } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';

function JobCard({ job }) {
  const formattedDate = formatDistanceToNow(new Date(job.createdAt), { addSuffix: true });

  return (
    <Link to={`/jobs/${job.id}`} className="block h-full">
      <div className="card h-full flex flex-col transition-shadow hover:shadow-lg">
        <div className="p-4 flex-grow">
          <div className="flex justify-between mb-2">
            <span className="badge badge-primary">{job.jobType}</span>
            {job.isFeatured && (
              <span className="badge bg-yellow-100 text-yellow-800">Featured</span>
            )}
          </div>
          
          <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
          <p className="text-gray-700 mb-2">{job.companyName}</p>
          
          <p className="text-gray-600 mb-4 line-clamp-2">
            {job.description}
          </p>
          
          <div className="mt-auto text-sm text-gray-500 space-y-1">
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-1" />
              <span>{job.location}</span>
            </div>
            
            {job.salary && (
              <div className="flex items-center">
                <FaPoundSign className="mr-1" />
                <span>{job.salary}</span>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FaClock className="mr-1" />
                <span>Posted {formattedDate}</span>
              </div>
              
              <div className="text-blue-600 font-medium">View Details</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default JobCard;