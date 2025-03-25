import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Headerr = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    
    navigate("/");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative mb-4 md:mb-6">
      <div className="flex w-full font-[Manrope] justify-between bg-gradient-to-t from-gray-800 to-black py-3 md:py-4 px-3 md:px-4 rounded-b-xl items-center">
        <h1 className="text-lg sm:text-xl md:text-2xl md:ps-5 ps-12 font-bold text-white">Patner Page</h1>
        <div className="relative" ref={dropdownRef}>
          <button
            className="bg-gray-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-md flex items-center gap-2 text-sm md:text-base"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-28 md:w-32 bg-gradient-to-b from-gray-900 to-zinc-900 shadow-xl rounded-md py-1 md:py-2 z-50">
              <button
                className="w-full text-center px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base font-bold text-white hover:text-gray-500 transition delay-150 duration-300 ease-in-out"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Headerr;