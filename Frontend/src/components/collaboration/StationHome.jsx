import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import StationListPage from '../../pages/collaboration/StationListPage';
import AddStationpage from '../../pages/collaboration/AddStationpage';
import Headerr from './Headerr';
import socket from '../../Server/socket';

const StationHome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [partnerId, setPartnerId] = useState(null);
  
  useEffect(() => {
    const storedPartnerId = sessionStorage.getItem("partnerId"); 
    console.log("Partner ID:", storedPartnerId);
  
    if (storedPartnerId) {
      setPartnerId(storedPartnerId);
      socket.emit("registerPartner", storedPartnerId);
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900  overflow-hidden  to-black flex flex-col md:flex-row">
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
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block fixed md:static z-40 h-screen`}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 h-screen overflow-y-auto    p-4 md:p-8 w-full">
        {/* Header */}
        <Headerr />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8"> 
          <div className="bg-gradient-to-b from-gray-700 to-black p-4 md:p-6 rounded-xl">
            <div className="text-gray-300 mb-2">ADD new Station</div>
            <AddStationpage />
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-gradient-to-t from-gray-800 to-slate-950  overflow-hidden  rounded-xl">
          <div className="p-4 md:p-6 border-b border-gray-700">
            <h2 className="text-lg md:text-xl font-[DM_Sans] font-semibold text-white">All Stations</h2>
          </div>
          <div >
            <div className=" h-full overflow-y-auto">
              <StationListPage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StationHome;