import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets, JobCategories, JobLocations } from '../assets/assets';
import JobCard from './JobCard';


const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const jobsPerPage = 6;
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  const handleLocationChange = (location) => {
    setSelectedLocations(prev =>
      prev.includes(location)
        ? prev.filter(l => l !== location)
        : [...prev, location]
    );
    setCurrentPage(1);
  };

  useEffect(() => {
    const matchesCategory = job =>
      selectedCategories.length === 0 || selectedCategories.includes(job.category);

    const matchesLocation = job =>
      selectedLocations.length === 0 || selectedLocations.includes(job.location);

    const matchesTitle = job =>
      searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase());

    const matchesSearchLocation = job =>
      searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

    const newFilteredJobs = jobs.slice().reverse().filter(
      job =>
        matchesCategory(job) &&
        matchesLocation(job) &&
        matchesTitle(job) &&
        matchesSearchLocation(job)
    );

    setFilteredJobs(newFilteredJobs);
    setCurrentPage(1);
  }, [jobs, selectedCategories, selectedLocations, searchFilter]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  return (
    <div className="container mx-auto py-8 px-4 2xl:px-20 lg:flex lg:space-x-6">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 space-y-6">
        {/* Filtrage actif */}
        {isSearched && (searchFilter.title || searchFilter.location) && (
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-medium text-lg mb-4">Current Search</h3>
            <div className="mb-4 text-gray-600 space-x-2">
              {searchFilter.title && (
                <span className="inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded">
                  {searchFilter.title}
                  <img
                    onClick={() => setSearchFilter(prev => ({ ...prev, title: "" }))}
                    className="cursor-pointer"
                    src={assets.cross_icon}
                    alt="clear title"
                  />
                </span>
              )}
              {searchFilter.location && (
                <span className="inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded">
                  {searchFilter.location}
                  <img
                    onClick={() => setSearchFilter(prev => ({ ...prev, location: "" }))}
                    className="cursor-pointer"
                    src={assets.cross_icon}
                    alt="clear location"
                  />
                </span>
              )}
            </div>
          </div>
        )}

        {/* Filtres par catégorie */}
        <div className="bg-white p-4 rounded shadow">
          <h4 className="font-medium text-lg py-4">Search by Categories</h4>
          <ul className="space-y-4 text-gray-600">
            {JobCategories.map((category, index) => (
              <li className="flex gap-3 items-center" key={index}>
                <input
                  className="scale-125"
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Filtres par localisation */}
        <div className="bg-white p-4 rounded shadow">
          <h4 className="font-medium text-lg py-4">Search by Location</h4>
          <ul className="space-y-4 text-gray-600">
            {JobLocations.map((location, index) => (
              <li className="flex gap-3 items-center" key={index}>
                <input
                  className="scale-125"
                  type="checkbox"
                  checked={selectedLocations.includes(location)}
                  onChange={() => handleLocationChange(location)}
                />
                {location}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Liste des offres */}
      <section className="w-full lg:w-3/4 text-gray-800">
        <h3 className="font-medium text-3xl py-2" id="job-list">Latest jobs</h3>
        <p className="mb-8">Get your desired job from top companies</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {paginatedJobs.length > 0 ? (
            paginatedJobs.map((job, index) => (
              <JobCard key={index} job={job} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No jobs available at the moment.</p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            <button
              className="px-3 py-1 border rounded disabled:opacity-30"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`px-3 py-1 border rounded ${page === currentPage ? 'bg-blue-200' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="px-3 py-1 border rounded disabled:opacity-30"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;
