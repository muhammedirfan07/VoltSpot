import React, { useEffect, useState } from "react";
import SideBars from "../../../components/admin/SideBars";
import Header from "../../../components/admin/Header";
import { getallPatnersAPI } from "../../../Server/allAPI";
import socket from "../../../Server/socket";

const AllPatnersViewPage = () => {
  const [patnerdetails, setPatnerDetails] = useState([]);
  const [partnerStatus, setPartnerStatus] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Connect to the Socket.IO server
    socket.connect();

    // Fetch partner details
    getPatnerDetails();

    // Listen for real-time status updates
    socket.on("updatePartnerStatus", ({ partnerId, status }) => {
      console.log("Received updatePartnerStatus event:", partnerId, status);
      setPartnerStatus((prev) => ({ ...prev, [partnerId]: status }));
    });

    // Cleanup on unmount
    return () => {
      socket.off("updatePartnerStatus");
      socket.disconnect();
    };
  }, []);

  const getPatnerDetails = async () => {
    try {
      const result = await getallPatnersAPI();
      if (result.status === 200) {
        setPatnerDetails(result.data);

        // Emit registerPartner event for each partner
        result.data.forEach((partner) => {
          socket.emit("registerPartner", partner._id);
        });
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar - Hidden on mobile by default, shown when toggled */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block fixed md:relative z-40 h-full`}
      >
        <SideBars />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-3 md:p-4 w-full">
        {/* Header */}
        <Header />

        {/* Users Table */}
        <div className="bg-gradient-to-t from-gray-800 to-slate-950 drop-shadow-lg rounded-xl">
          <div className="p-4 md:p-6 border-b border-gray-700">
            <h2 className="text-xl md:text-2xl font-semibold text-white">
              All Partners
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="text-left border-t border-gray-600 text-gray-200 text-sm md:text-lg">
                  <th className="p-3 md:p-4">No</th>
                  <th className="p-3 md:p-4">Stations Name</th>
                  <th className="p-3 md:p-4">Email</th>
                  <th className="p-3 md:p-4">Location</th>
                  <th className="p-3 md:p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {patnerdetails?.length > 0 ? (
                  patnerdetails?.map((allpatner, index) => (
                    <tr
                      key={allpatner._id}
                      className="border-t border-gray-600"
                    >
                      <td className="p-3 md:p-4 text-white">{index + 1}</td>
                      <td className="p-3 md:p-4 text-white">
                        {allpatner?.StationName}
                      </td>
                      <td className="p-3 md:p-4 text-gray-300">
                        {allpatner?.email}
                      </td>
                      <td className="p-3 md:p-4 text-gray-300">
                        {allpatner?.address}
                      </td>
                      <td className="p-3 md:p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            partnerStatus[allpatner._id] === "Active"
                              ? "bg-green-500/10 text-green-500"
                              : "bg-red-500/10 text-red-500"
                          }`}
                        >
                          {partnerStatus[allpatner._id] || "Inactive"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-4">
                      <div className="text-red-700 font-bold text-base md:text-xl text-center py-4">
                        Partners not found yet...!!
                      </div>
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
};

export default AllPatnersViewPage;