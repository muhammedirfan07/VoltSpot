import React from 'react';
import { BadgeIndianRupee, MapPinHouse, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
const Sidebar = () => {
  const location = useLocation();
  
  // Check if current path matches the link path
  const isActive = (path) => {
    return location.pathname === path;
  };
  return (
    <>
      <div className="w-64 max-w-full font-[Manrope] pt-6 md:pt-2 bg-gradient-to-t from-gray-800 to-black rounded-e-lg p-3 md:p-4 min-h-screen overflow-y-auto">
      <div className="flex items-center ps-14 md:ps-0 gap-2 mb-6 md:mb-8">
        <i className="fa-solid fa-bolt text-lg md:text-xl" style={{color: "#f0efef"}}></i><span className="text-lg md:text-xl font-bold  text-white"><span className='text-green-600'>Volt</span>Spot</span>
      </div>

      <nav className="space-y-1 md:space-y-2">
        <Link to="/patnerDashboard">
          <button className={`w-full flex items-center gap-2 md:gap-3 mb-2  px-2 md:px-3 py-1.5 md:py-2 text-sm md:text-base rounded-lg ${isActive('/patnerDashboard') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
          <MapPinHouse className="w-5 h-5" /> Stations
          </button>
        </Link>
        <Link to="/notifation">
          <button className={`w-full flex items-center gap-2 md:gap-3 mb-2  px-2 md:px-3 py-1.5 md:py-2 text-sm md:text-base rounded-lg ${isActive('/notifation') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
          <BadgeIndianRupee className="w-5 h-5" /> Notification
          </button>
        </Link> 
      </nav>
    </div>
    </>
  )
}

export default Sidebar