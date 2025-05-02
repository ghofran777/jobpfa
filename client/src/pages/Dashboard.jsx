import React from 'react';
import { assets } from '../assets/assets';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate=useNavigate()

  return (
    <div className='min-h-screen'> 
      {/* Navbar for Recruiter Panel */}
      <div className='shadow py-4'>
        <div className='px-5 flex justify-between items-center'>
        <img onClick={() => navigate('/')} className='max-sm:w-32 cursor-pointer' src={assets.logo} alt='' />

          
          <div className='flex items-center gap-3'>
            <p className='max-sm:hidden'>Welcome, GreatStack</p>

            <div className='relative group'>
              {/* Company Icon */}
              <img 
                className='w-10 h-10 rounded-full cursor-pointer' 
                src={assets.company_icon} 
                alt='Company Icon' 
              />

              {/* Dropdown content (appears on hover) */}
              <div className='absolute hidden group-hover:block right-0 mt-2 bg-white shadow-lg rounded'>
                <ul className='p-2'>
                  <li className='cursor-pointer hover:text-blue-600'>Logout</li>
                </ul>
              </div>

            </div>
          </div>

        </div>
      </div>
      <div className='flex items-start'>
        {/*left sidebar with option to add job , manage jobs,view applications */}
        <div className='inline-block min-h-screen border-r-2'> 
            <ul className='flex flex-col items-start pt-5 text-gray-800'>
                <NavLink  className={({ isActive }) =>`flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive ? 'bg-blue-100 border-r-4 border-blue-500' : ''}`}to ={'/dashboard/add-job'}>
                <img  className='min-w-4' src={assets.add_icon}alt='' />
                <p className='max-sm:hidden'>Add Job</p>
                </NavLink>

                <NavLink className={({ isActive }) =>`flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive ? 'bg-blue-100 border-r-4 border-blue-500' : ''}`} to ={'/dashboard/manage-jobs'}>
                <img  className='min-w-4' src={assets.home_icon}alt='' />
                <p className='max-sm:hidden'>Manage Jobs </p>
                </NavLink>


                <NavLink className={({ isActive }) =>`flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive ? 'bg-blue-100 border-r-4 border-blue-500' : ''}`} to ={'/dashboard/view-applications'}>
                <img  className='min-w-4' src={assets.person_tick_icon}alt='' />
                <p className='max-sm:hidden'>View Applications</p>
                </NavLink>
            </ul>
        </div>
        <div>
            <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 