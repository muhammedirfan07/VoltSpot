import React, { useState } from "react";
import landingImg from "../../assets/bgImg2.jpg";
import chargingImg1 from "../../assets/cola.jpg";
import chargingImg2 from "../../assets/charging.jpg";
import chargingImg3 from "../../assets/faq.webp";
import { WorldMapDemo } from "../common/WorldMapDemo";
import { motion } from "framer-motion";
import img1 from "../../assets/frImg1.png";
import img2 from "../../assets/frImg2.png";
import img3 from "../../assets/frImg3.png";
import img4 from "../../assets/frImg4.png";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from 'lucide-react';

const Landing = () => {
   const navigate = useNavigate()
   
   const [openAccordion, setOpenAccordion] = useState("open");

   const toggleAccordion = (id) => {
     setOpenAccordion(openAccordion === id ? null : id);
   };
 

    const tokenChecking = sessionStorage.getItem('token')
    const GoToHomePage=()=>{
      console.log( "buton clicked");
      
      if(!tokenChecking){
        navigate('/login')
        return
      }else{
        navigate('/home')
        return
      }
    }
 
  return (
    <>
     <Header  />
      {/* ------------------------------------landing page -----------------------------------------------------------------------------*/}
      <section id="home"
        className="relative h-screen bg-cover bg-left bg-no-repeat flex pt-55 ps-10 items-start md:items-center md:pt-0 justify-start px-6"
        style={{ backgroundImage: `url(${landingImg})` }}
      >
        {/* Left-Side Gradient Overlay (40% Opacity) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/100 to-transparent  " />
        <div className="absolute inset-0 bg-gradient-to-t from-black/100 to-transparent  " />
        {/* Content Section */}
        <div className="relative text-white max-w-3xl">
          {/* Added relative to appear above overlay */}
          <div className=" max-w-md"> <p className="font-[DM_Sans] text-green-600 font-bold text-md md:text-xm mb-2 ">For Every One,Everey Business,Every Electic Vechile</p></div>
          <h1 className="font-[Manrope] text-4xl md:text-6xl font-bold leading-tight mb-8 ">
            Keep Your <span className="text-green-500">Electric Vehicle</span> <br />
            Charging Ready for <br />
            Every Adventure
          </h1>
          <div className="max-w-lg">
            <p className="font-[DM_Sans] mt-10 text-sm md:text-md md:mt-4 mb-6">
              Our residential, commercial, and fast charging stations are widely compatible,
              built on open standards, and designed to be accessible for everyone.
            </p>
          </div>
          <button onClick={GoToHomePage} style={{ width: "150px" }} className="font-[DM_Sans] px-4 py-2 bg-gradient-to-r from-green-600 to-gray-900 text-white rounded-md hover:from-gray-900 hover:to-green-500 mb-6">
            Search Now
          </button>
        </div>
      </section>
      {/* --------------------------------------landing page end------------------------------ -----------------------------------------*/}

      {/*  ------------------------------------about page start------------------------------------------------------------------------ */}
      <section
      id="about"
        className="bg-black text-white px-6 py-10 md:px-12">
        {/* users, commpany, banners */}
        <div className="grid gird-cols-1 md:grid-cols-3 gap-4 mb-14  items-center font-[Dm_Sans] ">
          <div className="px-3 py-4 bg-gray-950 text-center hover:bg-gray-800 transition duration-300  delay-150 hover:-translate-y-1 hover:scale-110  ease-in-out rounded-2xl" >
            <h1 className="text-3xl md:text-4xl max-w-md">
              1500+
            </h1>
            <p className="text-gray-400 text-md leading-7">
              Charging Stations
            </p>
          </div>
          <div className="px-3 py-4 bg-gray-950 text-center hover:bg-gray-800 transition duration-300  delay-150 hover:-translate-y-1 hover:scale-110  ease-in-out rounded-2xl" >
            <h1 className="text-3xl md:text-4xl max-w-md">
              200,000+
            </h1>
            <h5 className="text-gray-400 text-md leading-7">
              Vehicles Charged
            </h5>
          </div>
          <div className="px-3 py-4 bg-gray-950 text-center hover:bg-gray-800 transition duration-300  delay-150 hover:-translate-y-1 hover:scale-110  ease-in-out rounded-2xl" >
            <h1 className="text-3xl md:text-4xl max-w-md">
              100,000+
            </h1>
            <p className="text-gray-400 text-md leading-7">
              Happy Customers
            </p>
          </div>
        </div>
        {/* about us heading */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-flow-row-dense font-[DM_Sans]  gap-6 px-3 items-center mb-14">
          {/* Left Side  */}
          <div  >
            <h1 className="  text-3xl md:text-4xl/14  max-w-xl  ">
              A Convenient Solution For Smart Electric Car Charging
            </h1>
          </div>
          {/* Right Side */}
          <div  >
            <p className="text-gray-400  text-md leading-7 ">
              For more than a decade, we've been building the fueling network of the future.
              We have delivered more places to charge than anyone else, and people count on
              us for charging all day.
            </p>
          </div>
        </div>
        {/* charging images and discriptions */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-flow-row-dense font-[DM_Sans] gap-8 px-5 items-center mb-20">
          {/* Left Side -*/}
          <div className="h-100 rounded-2xl overflow-hidden shadow-lg">
          <img className="object-cover h-full w-full rounded-2xl transition-transform duration-300 hover:scale-105" src={chargingImg1} alt="Charging Station" />
        </div>
          {/* Right Side - */}
          <div className=" h-100  py-6 rounded-2xl" >
            <h1 className="  text-3xl md:text-4xl/10  max-w-lg mb-8  ">
              Enhancing Battery Life with Smart Charging
            </h1>
            <p className="text-gray-400  text-md leading-8 ">
              With Smart charging, you don't need to worry about unplugging your device to keep it from staying charged to 100% for longer periods of time—Smart charging handles charging for you. If your device has Smart charging turned on, the battery level will be set to a lower level that's better for the battery overall. give me this note sutable best headings
            </p>
          </div>

        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-flow-row-dense  font-[DM_Sans] gap-8 px-5 items-center mb-20">

          <div className=" h-100  px-3 py-6 rounded-2xl" >
            <h1 className="  text-3xl md:text-4xl/10  max-w-xl mb-8  ">
              A Comprehensive Guide to EV Charger Types and Power Levels
            </h1>
            <p className="text-gray-400  text-md leading-8 ">
              EV chargers come in different types and power levels to meet various charging demands. Their main functions include providing the electrical interface for energy transfer, controlling and monitoring the charging process, and implementing safety features. The most common types of EV chargers are Level 1, Level 2, and DC fast chargers.
            </p>
          </div>
          <div className="h-100 rounded-2xl overflow-hidden shadow-lg">
          <img className="object-cover h-full w-full rounded-2xl transition-transform duration-300 hover:scale-105" src={chargingImg2} alt="Charging Station" />
        </div>

        </div>
      </section>
      {/*------------------------------------- about page end --------------------------------------------------------------------------*/}

      {/*---------------------------------------features page start--------------------------------------------------------------------*/}
      <section id="features"  className="bg-black text-white px-6 py-10 md:px-12">
        {/* features heading */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-flow-row-dense font-[DM_Sans] gap-8 px-5 items-center mb-4">
          <div >
            <h1 className="  text-3xl md:text-4xl/14  max-w-xl  ">
              EV Charging Solution For Every Free Drive & Features
            </h1>
          </div>
          {/* Right Side */}
          <div  >
            <p className="text-gray-400  text-md leading-7 ">
              For more than a decade, we've been building the fueling network of the future.
              We have delivered more places to charge than anyone else, and people count on
              us for charging all day.
            </p>
          </div>
        </div>
        {/* world map */}
        <div className="p-3">
          <WorldMapDemo />
        </div>
        {/* features */}
        <div className=" mx-auto px-4 py-4">
          <div className="grid grid-cols-1 font-[DM_Sans] sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="overflow-hidden rounded-lg drop-shadow-lg hover:bg-gray-950 bg-gray-900 ease-in-out p-4">
              <div className="w-23 mb-4">
                <img
                  src={img1}
                  alt="no image"
                  className="w-full object-cover "
                />
              </div>
              <div >
                <h1 className="text-xl md:text-2xl max-w-md mb-4">
                  Large-Scale Charging Network
                </h1>
                <p className="text-gray-400">Eliminate range anxiety by gaining access to an expansive network of over 1.5k charging stations, strategically positioned wherever your travels take you. </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg drop-shadow-lg hover:bg-gray-950 bg-gray-900 ease-in-out p-4">
              <div className="w-16 mb-4">
                <img
                  src={img2}
                  alt="no image"
                  className="w-full object-cover "
                />
              </div>
              <div >
                <h1 className="text-xl md:text-2xl max-w-md mb-4">
                  Effortless Transactions expirience
                </h1>
                <p className="text-gray-400 ">Seamless EV charging bookings with instant payments and real-time availability. Fast, secure,Enjoy instant payments,real-time availability updates, and a smooth booking process  </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg drop-shadow-lg hover:bg-gray-950 bg-gray-900 ease-in-out p-4">
              <div className="w-22 mb-4">
                <img
                  src={img3}
                  alt="no image"
                  className="w-full object-cover "
                />
              </div>
              <div >
                <h1 className="text-xl md:text-2xl max-w-md mb-4">
                  the Universal Compatibility
                </h1>
                <p className="text-gray-400">Our groundbreaking technology ensures hassle-free charging for every EV, letting you say goodbye to compatibility concerns. </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg drop-shadow-lg hover:bg-gray-950  bg-gray-900  ease-in-out p-4">
              <div className="w-23 mb-4">
                <img
                  src={img4}
                  alt="no image"
                  className="w-full object-cover "
                />
              </div>
              <div >
                <h1 className="text-xl md:text-2xl max-w-md mb-4">
                  Versatile Charging Solutions
                </h1>
                <p className="text-gray-400">We offer a full range of deployment configurations, from single to dual-port for all cars, dual port with e-bike charging, and fast dual-port built for all audience </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* -----------------------------------------------------features page end------------------------------------------------------- */}
      {/* -----------------------------------------------------support page start------------------------------------------------------- */}
      <section id="support" className="bg-black text-white px-6 pb-3 md:px-12">
      {/* Heading */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-flow-row-dense font-[DM_Sans] gap-8 px-5 items-center mb-10">
        <div>
          <h1 className="  text-3xl md:text-4xl/14  max-w-xl  ">
            Let's see what our Customers & Users say about us
          </h1>
        </div>
        <div>
          <p className="text-gray-400 text-md leading-7">
            Here are some testimonials from satisfied customers who have used our EV charging stations.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-flow-row-dense font-[DM_Sans] gap-8 px-5 items-center mb-20">
        {/* Left Side - Image */}
        <div className="h-100 rounded-2xl overflow-hidden shadow-lg">
          <img className="object-cover h-full w-full rounded-2xl transition-transform duration-300 hover:scale-105" src={chargingImg3} alt="Charging Station" />
        </div>

        {/* Right Side - FAQ */}
        <div className="h-100 py-6 rounded-2xl">
          <div className="space-y-4">
            {/* FAQ Items */}
            <div className="border-b border-gray-800">
              <button 
                className="w-full flex justify-between items-center py-4 text-left text-lg font-medium transition-colors duration-200 hover:text-gray-300"
                onClick={() => toggleAccordion("wifi")}
              >
                <span>How do I book a charging station?</span>
                {openAccordion === "wifi" ? <ChevronUp className="flex-shrink-0 text-gray-400" /> : <ChevronDown className="flex-shrink-0 text-gray-400" />}
              </button>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: openAccordion === "wifi" ? "auto" : 0, opacity: openAccordion === "wifi" ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pb-4 text-gray-400">
                You can book a charging station through our mobile app or website. Simply select your location, choose an available slot, and confirm your booking.
                </div>
              </motion.div>
            </div>

            <div className="border-b border-gray-800">
              <button 
                className="w-full flex justify-between items-center py-4 text-left text-lg font-medium transition-colors duration-200 hover:text-gray-300"
                onClick={() => toggleAccordion("opt")}
              >
                <span>Why should I opt for a charging station?</span>
                {openAccordion === "opt" ? <ChevronUp className="flex-shrink-0 text-gray-400" /> : <ChevronDown className="flex-shrink-0 text-gray-400" />}
              </button>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: openAccordion === "opt" ? "auto" : 0, opacity: openAccordion === "opt" ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pb-4 text-gray-400">
                  Charging stations offer faster, safer, and more convenient charging for your electric vehicle. They provide higher power output than standard outlets, reducing charging time significantly and extending battery life.
                </div>
              </motion.div>
            </div>

            <div className="border-b border-gray-800">
              <button 
                className="w-full flex justify-between items-center py-4 text-left text-lg font-medium transition-colors duration-200 hover:text-gray-300"
                onClick={() => toggleAccordion("availability")}
              >
                <span>How can I check the availability of charging stations?</span>
                {openAccordion === "availability" ? <ChevronUp className="flex-shrink-0 text-gray-400" /> : <ChevronDown className="flex-shrink-0 text-gray-400" />}
              </button>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: openAccordion === "availability" ? "auto" : 0, opacity: openAccordion === "availability" ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pb-4 text-gray-400">
                  You can check the availability of charging stations through our mobile app or website. Simply enter your location to view nearby stations.
                </div>
              </motion.div>
            </div>

            <div className="border-b border-gray-800">
              <button 
                className="w-full flex justify-between items-center py-4 text-left text-lg font-medium transition-colors duration-200 hover:text-gray-300"
                onClick={() => toggleAccordion("cancellation")}
              >
                <span>What payment methods are supported?</span>
                {openAccordion === "cancellation" ? <ChevronUp className="flex-shrink-0 text-gray-400" /> : <ChevronDown className="flex-shrink-0 text-gray-400" />}
              </button>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: openAccordion === "cancellation" ? "auto" : 0, opacity: openAccordion === "cancellation" ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pb-4 text-gray-400">
                We support various payment methods, including credit/debit cards, mobile wallets, and UPI payments. You can also set up automatic payments for a seamless experience.
                </div>
              </motion.div>
            </div>
            <div className="border-b border-gray-800">
              <button 
                className="w-full flex justify-between items-center py-4 text-left text-lg font-medium transition-colors duration-200 hover:text-gray-300"
                onClick={() => toggleAccordion("cancellation")}
              >
                <span>What is the cancellation policy for bookings?</span>
                {openAccordion === "cancellation" ? <ChevronUp className="flex-shrink-0 text-gray-400" /> : <ChevronDown className="flex-shrink-0 text-gray-400" />}
              </button>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: openAccordion === "cancellation" ? "auto" : 0, opacity: openAccordion === "cancellation" ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pb-4 text-gray-400">
                  You can cancel your booking up to is currenty not possible but the features added soon .... hand give your back 
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Landing;


