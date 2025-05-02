import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { assets, jobsApplied } from '../assets/assets';
import moment from 'moment';

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  return (
    <>
      <Navbar />
      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        <h2 className="text-xl font-semibold">Your Resume</h2>

        <div className="flex flex-col gap-2 mb-6 mt-3">
          {isEdit ? (
            <>
              <label htmlFor="resumeUpload" className="flex items-center cursor-pointer">
                <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2">Select Resume</p>
                <input
                  id="resumeUpload"
                  type="file"
                  accept="application/pdf"
                  onChange={e => setResume(e.target.files[0])}
                  hidden
                />
                <img src={assets.profile_upload_icon} alt="Upload Icon" />
              </label>

              {resume && (
                <p className="text-sm text-gray-600 mt-1">Selected file: {resume.name}</p>
              )}

              <button
                onClick={() => setIsEdit(false)}
                className="bg-green-100 border border-green-400 rounded-lg px-4 py-2 w-fit"
              >
                Save
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <a
                href="#"
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg"
                download={resume ? resume.name : false}
              >
                Resume
              </a>
              <button
                onClick={() => setIsEdit(true)}
                className="text-gray-500 border border-gray-300 rounded-lg px-4 py-2"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        <h2 className="text-xl font-semibold mb-4">Jobs Applied</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Job Title</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {jobsApplied.map((job, index) => (
                <tr key={index} className="border-t">
                  <td className="py-3 px-4 flex items-center gap-2">
                    <img src={job.logo} alt="Logo" className="w-6 h-6" />
                    {job.company}
                  </td>
                  <td className="py-3 px-4">{job.title}</td>
                  <td className="py-3 px-4">{job.location}</td>
                  <td className="py-3 px-4">{moment(job.date).format('LL')}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-4 py-1.5 rounded ${
                        job.status === 'Accepted'
                          ? 'bg-green-100 text-green-700'
                          : job.status === 'Rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Applications;
