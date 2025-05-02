import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
  const stripHtml = (html) => html.replace(/<[^>]*>?/gm, '');
  const navigate =useNavigate()

  // Troncature à un certain nombre de mots
  const truncate = (text, maxWords) => {
    const cleanText = stripHtml(text || "");
    const words = cleanText.split(" ");
    return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : cleanText;
  };

  // Vérifie s’il y a un logo dans le job, sinon fallback vers un logo par défaut
  const logoUrl = job.logoUrl || assets.company_icon || "/default-logo.png";

  return (
    <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all'>
      {/* Company Logo */}
      <div className='mb-4'>
        <img
          src={logoUrl}
          alt={`${job.companyName || "Company"} Logo`}
          className='w-12 h-12 object-contain'
          onError={(e) => { e.target.onerror = null; e.target.src = "/default-logo.png"; }}
        />
      </div>

      {/* Job Title */}
      <h4 className='font-semibold text-xl text-gray-800 mb-2'>
        {job.title || "Job Title"}
      </h4>

      {/* Job Info */}
      <div className='flex gap-4 mb-4 text-gray-600 text-sm'>
        <span>{job.location || "Location"}</span>
        <span>{job.level || "Level"}</span>
      </div>

      {/* Job Description */}
      <p className='text-gray-500 mb-4'>
        {truncate(job.description, 30)}
      </p>

      {/* Action Buttons */}
      <div className='flex gap-4'>
        <button onClick={()=>{navigate(`/apply-job/${job._id}`);scrollTo(0,0)}} className='bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all'>
          Apply now
        </button>
        <button onClick={()=>{navigate(`/apply-job/${job._id}`);scrollTo(0,0)}}className='border border-blue-500 text-blue-500 py-2 px-6 rounded-lg hover:bg-blue-50 transition-all'>
          Learn more
        </button>
      </div>
    </div>
  );
};

export default JobCard;
