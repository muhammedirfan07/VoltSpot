import React, { useContext, useEffect, useState } from "react";
import SideBars from "../../../components/admin/SideBars";
import Header from "../../../components/admin/Header";
import { viewAllStayionAPI } from "../../../Server/allAPI";
import { MapPinned } from "lucide-react";
import SERVER_URL from "../../../Server/serverURL";
import {
  addStaionResponseContext,
  updateStaionResponseContext,
} from "../../../context/ContextAPI";
import { approveAndRejectAPI } from "../../../Server/allAPI";

const ViewAllStationList = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewStationDetails, setViewStationDetails] = useState([]);
  const { addStaionResponse, setAddStaionResponse } = useContext(
    addStaionResponseContext
  );
  const { updateStaionResponse, setUpdateStaionResponse } = useContext(
    updateStaionResponseContext
  );

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    handleViewStationDetails();
  }, [addStaionResponse, updateStaionResponse]);

  //diaplay all the station list
  const handleViewStationDetails = async () => {
    console.log("indise the view station details.....😍😍");
    try {
      const result = await viewAllStayionAPI();
      if (result.status === 200) {
        console.log("view station details:", result.data);
        setViewStationDetails(result.data);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const HandleApprove = async (StationId, status) => {
    console.log("inside the Handle approve .....(❁´◡`❁)");
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      const reqHeaders = {
        Authorization: `Bearer ${token}`,
      };

      const result = await approveAndRejectAPI(
        StationId,
        { status },
        reqHeaders
      );
      console.log("result :", result);

      if (result.status === 200) {
        console.log(`Station ${status} successfully`);
        setUpdateStaionResponse((prev) => !prev); // Trigger refresh
      }
    } catch (err) {
      console.log("error updating.. ", err);
    }
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
        <div className="bg-gradient-to-t from-gray-800 to-slate-950  drop-shadow-lg rounded-xl">
          <div className="p-4 md:p-6 border-b border-gray 700">
            <h2 className="text-xl md:text-2xl font-semibold text-white">
              All EV Stations
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="text-left border-t border-gray-600 text-gray-200 text-sm md:text-lg">
                  <th className="p-3 md:p-4"># </th>
                  <th className="p-3 md:p-4">Station Name</th>
                  <th className="p-3 md:p-4">Image</th>
                  <th className="p-3 md:p-4">Location</th>
                  <th className="p-3 md:p-4">Map</th>
                  <th className="p-3 md:p-4">Sockets</th>
                  <th className="p-3 md:p-4">Vehicle Type</th>
                  <th className="p-3 md:p-4">Rate/hr</th>
                  <th className="p-3 md:p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {viewStationDetails?.length > 0 ? (
                  viewStationDetails?.map((station, index) => (
                    <tr key={station?._id} className="border-t border-gray-600">
                      <td className="p-3 md:p-4 text-white">{index + 1}</td>
                      <td className="p-3 md:p-4 text-white">
                        {station?.stationName}
                      </td>
                      <td className="p-3 md:p-4 text-gray-300">
                        <img
                          className="w-15 h-15"
                          src={`${SERVER_URL}/${station?.image}`}
                          alt=""
                        />
                      </td>
                      <td className="p-3 md:p-4 text-gray-300">
                        {`${station?.city},${station?.state}`}{" "}
                      </td>
                      <td className="p-3 md:p-4 text-purple-300">
                        <a className="text-xm flex" href={station?.mapUrl}>
                          {" "}
                          <MapPinned /> map
                        </a>
                      </td>
                      <td className="p-3 md:p-4 text-gray-300">
                        {station?.chargingType}
                      </td>
                      <td className="p-3 md:p-4 text-gray-300">
                        {station?.vehicleType}
                      </td>
                      <td className="p-3 md:p-4 text-gray-300">
                        {station?.pricePerHour}
                      </td>
                      <td className="p-3 md:p-4">
                        {station.status === "pending" ? (
                          <div className="flex flex-col sm:flex-row gap-2">
                            <button
                              onClick={() =>
                                HandleApprove(station._id, "approved")
                              }
                              className="px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-xs md:text-sm whitespace-nowrap"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                HandleApprove(station._id, "rejected")
                              }
                              className="px-2 py-1 bg-red-500/10 text-red-500 rounded-full text-xs md:text-sm whitespace-nowrap"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span
                            className={`text-sm font-semibold ${
                              station.status === "approved"
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {station.status}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>
                      <div className="text-red-700 ps-2"> staion ont yet </div>
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

export default ViewAllStationList;
