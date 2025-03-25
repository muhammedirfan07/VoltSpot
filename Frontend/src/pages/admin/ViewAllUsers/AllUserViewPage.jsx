import React, { useEffect, useState } from 'react'
import SideBars from '../../../components/admin/SideBars'
import Header from '../../../components/admin/Header'
import { getallUsersAPI } from '../../../Server/allAPI';

function AllUserViewPage() {
  const [allUserDetails, setAllUserDetails] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    getAllUserDetails();
  }, []);

  const getAllUserDetails = async () => {
    try {
      const result = await getallUsersAPI();
      if (result.status === 200) {
        setAllUserDetails(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen font-[DM_Sans] flex flex-col md:flex-row bg-gradient-to-b from-gray-900 to-black">
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
        
        {/* Users Table */}
        <div className="bg-gradient-to-t from-gray-800 to-slate-950 rounded-xl">
          <div className="p-4 md:p-6 border-b border-gray-700">
            <h2 className="text-xl md:text-2xl font-semibold text-white">All Users</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="text-left border-t border-gray-600 text-gray-200 text-sm md:text-lg">
                  <th className="p-3 md:p-4">No</th>
                  <th className="p-3 md:p-4">Name</th>
                  <th className="p-3 md:p-4">Email</th>
                  <th className="p-3 md:p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {allUserDetails?.length > 0 ? (
                  allUserDetails?.map((allUser, index) => (
                    <tr key={allUser._id} className="border-t text-sm md:text-md border-gray-700">
                      <td className="p-3 md:p-4 text-white">{index + 1}</td>
                      <td className="p-3 md:p-4 text-white">{allUser?.fullName}</td>
                      <td className="p-3 md:p-4 text-gray-300">{allUser?.email}</td>
                      <td className="p-3 md:p-4">
                        <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-xs md:text-sm">
                          active
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4">
                      <div className="text-red-700 font-bold text-base md:text-2xl text-center py-4">Users not found yet...!!</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllUserViewPage;