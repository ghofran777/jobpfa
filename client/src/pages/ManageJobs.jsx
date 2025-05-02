import React from 'react';
import { manageJobsData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const ManageJobs = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto">
        <table className="w-full text-sm text-left border">
          <thead className="bg-gray-100 text-gray-600 border-b">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Job Title</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Applicants</th>
              <th className="py-3 px-4">Visible</th>
            </tr>
          </thead>
          <tbody>
            {manageJobsData.map((job, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{job.title}</td>
                <td className="py-3 px-4">{job.date}</td>
                <td className="py-3 px-4">{job.location}</td>
                <td className="py-3 px-4">{String(job.applicants).padStart(2, '0')}</td>
                <td className="py-3 px-4">
                  <input type="checkbox" className="accent-blue-500 w-5 h-5" checked={job.visible} readOnly />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-right mt-4">
        <button
          onClick={() => navigate('/dashboard/add-job')}
          className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800"
        >
          Add new job
        </button>
      </div>
    </div>
  );
};

export default ManageJobs;
