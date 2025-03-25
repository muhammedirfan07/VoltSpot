import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
useNavigate

const ProjectManagementApp = () => {
  const navigate= useNavigate()
  const tokenChecked = sessionStorage.getItem('token')

  const verifactionHandile=()=>{
    console.log("tokenChecked");
    
    if(!tokenChecked){
      return navigate('/logPatners')
    }else{
      return navigate('/patnerDashboard')
    }

  }

  return (
    <div className=" bg-gradient-to-b from-gray-900 to-black min-h-screen text-white flex items-center justify-center relative">
      <div  className='  absolute top-5  left-5'>
        <Link   to={'/'} ><i class="fa-solid fa-bolt text-2xl" style={{color: "#f0efef"}}></i> 
        <span className="text-3xl font-bold text-white"><span className='text-green-600'>Volt</span>Spot</span></Link>
      </div>
      <section className="py-16 ">
      
        <div className="container mx-auto px-6 text-center">
          <div className="uppercase text-green-500 text-sm font-semibold tracking-wide mb-4">
            welcome... your work together 💪
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Revolutionize are you Intrseted to</span>
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-green-500">Collaboration</span>
            <span className="text-white"> with Us..</span>
          </h2>
          
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            EVstation is the ultimate tool for modern team collaboration. Our platform brings together  Join us in creating a seamless, efficient, and sustainable EV charging network. Together, we can drive the future of electric mobility!
          </p>
          
          <div  className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <button  onClick={verifactionHandile}  className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-md font-medium">
              lest go..
            </button>
            <button onClick={()=>{navigate("/logPatners")}}   className="bg-gray-800 hover:bg-gray-700 text-white py-3 px-8 rounded-md font-medium border border-gray-700">
              Sing in
            </button>
          </div>
        </div>
      </section>

     
      
    </div>
  );
};

export default ProjectManagementApp;

