import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import {  useNavigate } from 'react-router-dom';
import { Button, Link } from "react-scroll";

const Header = ({isloging}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate =useNavigate()

  // useEffect(() => {
  //   setIsLoggedIn(!!sessionStorage.getItem("token"));
  // }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/")
  };

  return (
    <nav className="w-full z-40 font-[DM_Sans] backdrop-blur-lg text-white fixed top-0 left-0 font-manrope">
      <div className="mx-auto px-10 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/">
          <h3 className="text-xl text-green-100 font-bold">
          <i class="fa-solid fa-bolt text-2xl" style={{color: "#f0efef"}}></i> 
            <span className="text-2xl  text-green-600 font-michroma">Volt</span>Spot
          </h3>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-md font-bold">
          {!isloging ? (
            <>
              <Link to="home" smooth={true} duration={500} className="hover:text-green-400">Home</Link>
              <Link to="about" smooth={true} duration={500} className="hover:text-green-300">About</Link>
              <button  onClick={()=>{navigate("/homecolab")}} smooth={true} duration={500} className="hover:text-green-300">Patners</button>
              <Link to="features" smooth={true} duration={500} className="hover:text-green-300">features</Link>
              <Link to="support" smooth={true} duration={500} className="hover:text-green-300">support</Link>
                <button onClick={()=>{navigate("/login")}} className="bg-emerald-600 text-white px-4 py-1 rounded-lg font-semibold hover:bg-green-600 transition w-25">
                  Sign Up
                </button>
             
            </>
          ) : (
            <div className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center bg-emerald-600 text-white px-4 py-1 rounded-lg font-semibold hover:bg-green-600 transition">
                Profile <ChevronDown className="ml-2" />
              </button>
              {dropdownOpen && (
                <div className="absolute top-8 right-0 mt-2 w-48 bg bg-neutral-800 shadow-xl  rounded-xl">
                  <ul>
                    <li><button onClick={()=>{navigate("/profile")}}  className="block w-full px-4 py-2 text-center hover:rounded-t-xl hover:text-gray-700 hover:bg-gray-300">Profile</button></li>
                    <li><button onClick={handleLogout} className="block w-full text-center px-4 py-2  hover:text-gray-700 hover:rounded-b-xl hover:bg-gray-300">Logout</button></li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black py-4 px-6 text-lg">
          <ul className="flex flex-col space-y-4">
            {!isloging ? (
              <>
              <Link to="home" smooth={true} duration={500} className="hover:text-green-400">Home</Link>
              <Link to="about" smooth={true} duration={500} className="hover:text-green-300">About</Link>
              <button onClick={()=>{navigate("/homecolab")}}smooth={true} duration={500} className="hover:text-green-300">Patners</button>
              <Link to="features" smooth={true} duration={500} className="hover:text-green-300">features</Link>
              <Link to="support" smooth={true} duration={500} className="hover:text-green-300">support</Link>
                  <button onClick={()=>{navigate("/login")}} className="w-full bg-emerald-600 text-white py-2 font-semibold rounded-lg hover:bg-green-600 transition">
                    Sign Up
                  </button>
              </>
            ) : (
              <>
                <button onClick={()=>{navigate("/profile")}} className="block py-2 px-4 hover:bg-gray-700">Profile</button>
                <button onClick={handleLogout} className="block w-full  py-2 px-4 hover:bg-gray-700">Logout</button>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;
