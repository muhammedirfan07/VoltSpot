import React, { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Battery,
  ChevronDown,
  MessageCircle,
  X,
} from "lucide-react";
import station1 from "../../assets/station1.jpg";
import { Link } from "react-router-dom";
import Header from "./Header";
import { feachApproveStationAPI, filterStationAPI } from "../../Server/allAPI";
import SERVER_URL from "../../Server/serverURL";


const Home = () => {
  const [isloging, setLoaging] = useState(true);
  const [isloding, setLoading] = useState(true);
  const [viewStation, setViewStation] = useState([]);
  const [viewStations, setViewStations] = useState([]);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [searchStation, setSearchStation] = useState("");
  const [suggestions, setSuggestions] = useState([]); //auto suggection
  const [showMap, setShowMap] = useState(false);
  const [filters, setFilters] = useState({
    city: "",
    state: "",
    chargingType: "",
    vehicleType: "",
  });

  useEffect(() => {
    fetchViewStations();
  }, []);

  useEffect(() => {
    if (searchStation.trim() !== "") {
      // Filter stations based on search input
      const filtered = viewStation.filter((station) =>
        station.city.toLowerCase().includes(searchStation.toLowerCase())
      );
      setViewStations(filtered);

      // Generate autocomplete suggestions
      const citySuggestions = [
        ...new Set(viewStation.map((station) => station.city)),
      ].filter((city) =>
        city.toLowerCase().includes(searchStation.toLowerCase())
      );
      setSuggestions(citySuggestions);
    } else {
      // Reset to all stations if search input is empty
      setViewStations(viewStation);
      setSuggestions([]);
    }
  }, [searchStation]);

  useEffect(() => {
    if (filters.city || filters.state || filters.chargingType || filters.vehicleType) {
      fetchFilteredStations();
    } else {
      setViewStations(viewStation); // Reset to all stations when no filters are applied
    }
  }, [filters]);



  // Fetch all approved stations
  const fetchViewStations = async () => {
    console.log("Fetching approved stations...");
    const token = sessionStorage.getItem("token");

    if (!token) {
      console.log("No token found!");
      setLoading(false);
      return;
    }

    const reqHeaders = {
      Authorization: `Bearer ${token}`,
    };

    try {
      setLoading(true); // Start loading
      const result = await feachApproveStationAPI(reqHeaders);
      console.log("API Result:", result);

      if (result.status === 200) {
        setViewStation(result.data);
        setViewStations(result.data); // Initialize viewStations with all stations
        // Extract unique cities and states
        const uniqueCities = [
          ...new Set(result.data.map((station) => station.city)),
        ];
        const uniqueStates = [
          ...new Set(result.data.map((station) => station.state)),
        ];

        setCities(uniqueCities);
        setStates(uniqueStates);
      } else {
        console.log("Failed to fetch stations, status:", result.status);
      }
    } catch (error) {
      console.log("Error fetching stations:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Filter stations based on user inputs
  const fetchFilteredStations = async () => {
    console.log("Fetching filtered stations...");
    const token = sessionStorage.getItem("token");

    if (!token) {
      console.log("No token found!");
      return;
    }

    const reqHeaders = {
      Authorization: `Bearer ${token}`,
    };

    try {
      setLoading(true);
      const result = await filterStationAPI(
        filters.city,
        filters.state,
        filters.chargingType,
        filters.vehicleType,
        reqHeaders
      );

      console.log("Filtered API Response:", result);
      if (result.status === 200) {
        setViewStations(result.data);
      } else {
        console.log("No stations found!");
        setViewStations([]);
      }
    } catch (error) {
      console.error("Error fetching stations:", error);
    } finally {
      setLoading(false);
    }
  };
   // Handle city selection from autocomplete suggestions
   const handleCitySelect = (city) => {
    setSearchStation(city);
    setSuggestions([]); // Clear suggestions after selection
  };

  return (
    <>
      <Header isloging={isloging} />
      <div className="min-h-screen font-[DM_Sans] pt-15 bg-neutral-950">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar - Full width on mobile, fixed width on desktop */}
          <div className="w-full  md:w-64  p-4">
            <div className="text-gray-400 font-medium mb-4">Filters</div>

            {/* Filter Options - Horizontal scrolling on mobile */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0">
              <div className="min-w-[200px] md:min-w-0 space-y-2">
                <label className="block w-full text-gray-300 text-sm mb-1">
                  Vehicle Type
                </label>
                <select
                  className="p-2 w-full bg-neutral-800 text-white rounded"
                  onChange={(e) =>
                    setFilters({ ...filters, vehicleType: e.target.value })
                  }
                >
                  <option value="">All Vehicles</option>
                  <option value="2-wheeler">2-Wheeler</option>
                  <option value="3-wheeler">3-Wheeler</option>
                  <option value="4-wheeler">4-Wheeler</option>
                </select>
              </div>

              <div className="min-w-[200px]  md:min-w-0 space-y-2">
                <label className="block text-gray-300 text-sm mb-1">
                  Socket Type
                </label>
                <select
                  className="p-2 w-full bg-neutral-800 text-white rounded"
                  onChange={(e) =>
                    setFilters({ ...filters, chargingType: e.target.value })
                  }
                >
                  <option value="">All Charging Types</option>
                  <option value="slow">Slow</option>
                  <option value="fast">Fast</option>
                  <option value="superfast">Superfast</option>
                </select>
              </div>

              <div className="min-w-[200px] md:min-w-0 space-y-2">
                <label className="block text-gray-300 text-sm mb-1">City</label>
                <select
                  className="w-full bg-neutral-800 text-white rounded p-2"
                  onChange={(e) =>
                    setFilters({ ...filters, city: e.target.value })
                  }
                >
                  <option value="">Select City</option>
                  {cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div className="min-w-[200px] md:min-w-0 space-y-2">
                <label className="block text-gray-300 text-sm mb-1">
                  State
                </label>
                <select
                  className="w-full bg-neutral-800 text-white rounded p-2"
                  onChange={(e) =>
                    setFilters({ ...filters, state: e.target.value })
                  }
                >
                  <option value="">Select State</option>
                  {states.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Main Content - Takes remaining width */}
          <div className="flex-1  p-4">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <h1 className="text-xl font-[Manrope] md:text-2xl font-bold text-white">
                Explore EV Charging station in India
              </h1>
              <button 
                onClick={() => setShowMap(!showMap)}
                className="w-full md:w-auto bg-emerald-800 text-white px-4 py-2 rounded-2xl hover:bg-emerald-600"
              >
                {showMap ? "Hide Map" : "Explore Map"}
              </button>
            </div>

            {/* Map View - Conditionally rendered */}
            {showMap && (
              <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
                <div className="relative">
                  <button 
                    onClick={() => setShowMap(false)}
                    className="absolute top-2 right-2 z-10 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75"
                  >
                    <X size={20} />
                  </button>
                  <iframe 
                    src="https://www.google.com/maps/d/u/0/embed?mid=1ZJAUHIjyykkJtqurWZ8SlSCZrBENF7g&ehbc=2E312F" 
                    width="100%" 
                    height="480"
                    className="border-0"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            )}

            {/* Search */}
            <div className="mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by city or state"
                  className="w-full px-4 py-3 bg-neutral-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={searchStation}
                  onChange={(e) => setSearchStation(e.target.value)} // Update state on input
                />
                <button>
                  <Search className="absolute right-4 top-3 text-gray-400" />
                </button>
                {/* Autocomplete Suggestions */}
                {suggestions.length > 0 && (
                  <div className="absolute z-10 w-full bg-neutral-800 rounded-lg mt-1 max-h-40 overflow-y-auto">
                    {suggestions.map((city, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 text-white hover:bg-neutral-700 cursor-pointer"
                        onClick={() => handleCitySelect(city)}
                      >
                        {city}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Pagination */}
            <div className="my-4 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400">Showing {viewStations.length} charging stations</div>
              <button className="text-emerald-400 hover:text-emerald-300">
                {" "}
                -- 1/4 --
              </button>
            </div>

            {/* Charging Stations Grid */}
            <>
              <div className=" grid gird-cols-1 md:grid-cols-2 gap-2 mb-2  items-center font-[Dm_Sans] overflow-x-auto md:overflow-x-visible ">
                {isloding ? (
                  <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-0 z-50">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 border-solid"></div>
                  </div>
                ) : viewStations.length > 0 ? (
                  viewStations.map((station) => (
                    <div
                      key={station?._id}
                      class="mx-auto  max-w-lg overflow-hidden rounded-xl bg-neutral-900 shadow-md md:max-w-2xl transition duration-300  delay-150 hover:-translate-y-1 hover:scale-105  ease-in-out"
                    >
                      <div class="md:flex">
                        <div class="md:shrink-0">
                          <img
                            class="h-50 w-full object-cover md:h-[260px] md:w-60"
                            src={`${SERVER_URL}/${station?.image}`}
                            alt="image not get"
                          />
                        </div>
                        <div class="p-4  w-100 ">
                          <h1 class="text-xl font-semibold tracking-wide text-white uppercase">
                            {station?.stationName}
                          </h1>
                          <a
                            href="#"
                            class="mt-1 block  leading-tight text-sm font-medium text-gray-300 hover:underline "
                          ></a>
                          <div class="mt-2 flex mb-2 items-center">
                            <h3 className="text-md font-bold me-1 text-gray-200  ">
                              Location :
                            </h3>
                            <span className="text-[12px] text-gray-400">{`${station?.city} ,${station?.state}`}</span>
                          </div>
                          <div className="flex items-center mb-2">
                            <h3 className="text-md font-bold me-1 text-gray-200 ">
                              {" "}
                              Sockets :
                            </h3>
                            <span className="text-[12px] text-gray-400">
                              {station?.chargingType}
                            </span>
                          </div>
                          <div className="flex items-center mb-2">
                            <h3 className="text-md font-bold me-1 text-gray-200 ">
                              {" "}
                              Vechile Type :
                            </h3>
                            <span className=" text-[12px] text-gray-400">
                              {station?.vehicleType}
                            </span>
                          </div>
                          <div className="flex items-center mb-2">
                            <h3 className="text-md font-bold me-1 text-gray-200 ">
                              {" "}
                              Price:
                            </h3>
                            <span className=" text-[12px] text-gray-300">
                              ₹{station?.pricePerHour}
                            </span>
                          </div>
                          <div className="flex flex-row items-center mb-2">
                            <a href={station?.mapUrl} target="_blank" className="text-[12px] text-fuchsia-400 items-end flex me-1 ">
                              <MapPin className=" text-[10px]"/>location
                            </a>
                          </div>
                          <div className="flex justify-end">
                            <Link to={`/${station?._id}/view`}>
                              <button className=" bg-emerald-700 cursor-pointer hover:bg-emerald-600  p-1 w-25 text-amber-50 rounded-lg">
                                {" "}
                                Booking{" "}
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-red-600">No stations available.</div>
                )}
              </div>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;