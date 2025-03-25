import React, { useEffect, useState } from 'react';

import Header from './Header';
import SideBars from './SideBars';
import { getNumberOfPatnersAPI, getNumberOfStationAPI, getNumberOfUserAPI } from '../../Server/allAPI';
import Chart from '../../pages/admin/chart&garph/Chart';

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [patnerCount, setPatnerCount] = useState(0);
  const [stationCount, setStationCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    getUserAllCount();
    getpanterAllCount();
    getStationAllCount();
  }, []);

  const getUserAllCount = async () => {
    try {
      const result = await getNumberOfUserAPI();
      if (result.data !== undefined) {
        setUserCount(result.data.conunt);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getStationAllCount = async () => {
    try {
      const result = await getNumberOfStationAPI();
      if (result.data !== undefined) {
        setStationCount(result.data.conunt);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getpanterAllCount = async () => {
    try {
      const result = await getNumberOfPatnersAPI();
      if (result.data !== undefined) {
        setPatnerCount(result.data.conunt);
      }
    } catch (err) {
      console.log(err);
    }
  };

 

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen font-[Manrope] flex flex-col md:flex-row bg-gradient-to-b from-gray-900 to-black">
      {/* Mobile Sidebar Toggle */}
      <button 
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 p-2 rounded-md text-white"
        onClick={toggleSidebar}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      {/* Sidebar - Hidden on mobile by default, shown when toggled */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block fixed md:relative z-40 h-full`}>
        <SideBars />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-3 md:p-4 w-full">
        {/* Header */}
        <Header />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-gradient-to-b from-gray-700 to-black p-4 md:p-6 rounded-xl">
            <div className="text-gray-400 mb-2 text-sm md:text-base">Total Users</div>
            <div className="text-xl md:text-2xl font-bold text-white">{userCount}</div>
            <div className="text-emerald-500 text-xs md:text-sm">↑ 15% this week</div>
          </div>
          <div className="bg-gradient-to-b from-gray-700 to-black p-4 md:p-6 rounded-xl">
            <div className="text-gray-400 mb-2 text-sm md:text-base">Total patners</div>
            <div className="text-xl md:text-2xl font-bold text-white">{patnerCount}</div>
            <div className="text-emerald-500 text-xs md:text-sm">↑ 2% this week</div>
          </div>
          <div className="bg-gradient-to-b from-gray-700 to-black p-4 md:p-6 rounded-xl sm:col-span-2 md:col-span-1">
            <div className="text-gray-400 mb-2 text-sm md:text-base">Total Ev-Stations</div>
            <div className="text-xl md:text-2xl font-bold text-white">{stationCount}</div>
            <div className="text-emerald-500 text-xs md:text-sm">↑2% this month</div>
          </div>
        </div>

        {/* Charts */}
         <Chart/>
      </div>
    </div>
  );
};

export default AdminDashboard;