import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Navbar from '../components/Navbar'
import Loading from '../components/Loading'
import { assets } from '../assets/assets'
import kconvert from 'k-convert'
import moment from 'moment'
import JobCard from '../components/JobCard'
import Footer from '../components/Footer'

const ApplyJob = () => {
  const { id } = useParams()
  const [jobData, setJobData] = useState(null)
  const { jobs } = useContext(AppContext)

  const fetchJob = () => {
    const data = jobs.find(job => job._id === id)
    if (data) {
      setJobData(data)
      console.log(data)
    }
  }

  useEffect(() => {
    if (jobs.length > 0) {
      fetchJob()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, jobs])

  return jobData ? (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col py-10 container px-4 2xl:px-20">
        <div className="bg-white text-black rounded-lg w-full">
          {/* Header section */}
          <div className="flex flex-wrap justify-center md:justify-between gap-8 px-14 py-20 mb-6 bg-sky-50 border border-sky-400 rounded-xl">
            <div className="flex flex-col md:flex-row items-center">
              <img 
                className="h-24 bg-white rounded-lg p-4 mr-4 mb-4 border"
                src={jobData.companyId.image}
                alt="Company logo" 
              />
              <div>
                <h1 className="text-2xl font-semibold mb-2">{jobData.title}</h1>
                <div className="flex flex-wrap gap-4 text-gray-700">
                  <span className="flex items-center gap-2">
                    <img src={assets.suitcase_icon} alt="Company icon" />
                    {jobData.companyId.name}
                  </span>
                  <span className="flex items-center gap-2">
                    <img src={assets.location_icon} alt="Location icon" />
                    {jobData.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <img src={assets.money_icon} alt="Money icon" />
                    CTC: {kconvert.convertTo(jobData.salary)}
                  </span>
                  <span className="flex items-center gap-2">
                    <img src={assets.person_icon} alt="Level icon" />
                    {jobData.level}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-all">
                Apply Now
              </button>
              <p className="text-sm text-gray-500">
                Posted {moment(jobData.date).fromNow()}
              </p>
            </div>
          </div>

          {/* Body section */}
          <div className="flex flex-col lg:flex-row px-6 pb-10 gap-10">
            {/* Left: Job description */}
            <div className="w-full lg:w-2/3">
              <h2 className="font-bold text-2xl mb-4">Job description</h2>
              <div className="rich-text mb-4" dangerouslySetInnerHTML={{ __html: jobData.description }} />
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-all">
                Apply Now
              </button>
            </div>

            {/* Right: More jobs */}
            <div className="w-full lg:w-1/3 mt-8 lg:mt-0 space-y-5">
              <h2 className="text-lg font-semibold">More jobs from {jobData.companyId.name}</h2>
              {jobs
                .filter(job => job._id !== jobData._id && job.companyId._id === jobData.companyId._id)
                .slice(0, 4)
                .map((job, index) => (
                  <JobCard key={index} job={job} />
                ))}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  ) : (
    <Loading />
  )
}

export default ApplyJob
