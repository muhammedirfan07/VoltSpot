import React, { useState } from 'react';
import { patnersRegisterAPI,patnersLoginAPI } from '../../../Server/allAPI';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { FaSpinner } from "react-icons/fa"; // Import spinner icon

const Authen = ({InsideTheRegister}) => {
  const [isLoading, setIsLoading] = useState(false);
   const [patnerInput,setPatnerInput]= useState({
    StationName:"",
    email:"",
    password:"",
    address:""
   })
   console.log(patnerInput);
 
   const navigate =useNavigate()

const panterRegisterHandle= async(e)=>{
    e.preventDefault();
    // console.log("button clicked");
    
    if( patnerInput.StationName && patnerInput.email && patnerInput.password && patnerInput.address){
       try{
        const result =await patnersRegisterAPI(patnerInput)
        console.log(result);
        if(result.status===200){
            toast.success(result.data.message,{position:"top-right",theme:"dark"})
             navigate("/optVerifyPage")
             setPatnerInput({
                StationName:"",
                email:"",
                password:"",
                address:""
               })
        }else{
            if(result.status===406 || result.status === 400){
                toast.error(result.response.data.message,{position:"top-right",theme:"dark"})
            }
        }
       }catch(err){
        console.log("error",err);
       }
      }else{
        toast.warning("fill the  form completity ..... ",{position:"top-right",theme:"dark"})
      }
      console.log("paterdtails",patnerInput);
}

const PatnerLoginHandle =async(e)=>{
  e.preventDefault();
  console.log("inside the PatnerLoginHandle.......... ");
   
  if (!patnerInput.email || !patnerInput.password) {
    toast.info("Please enter your email and password!", { position: "top-right" ,theme:"dark" });
    return;
}
setIsLoading(true); // Start loading
try {
    const result = await patnersLoginAPI(patnerInput);
    console.log("Login Response:",result);

    if (result.status === 200) {
        const { partner, token } = result.data;

        // Store user & token in session storage
        sessionStorage.setItem("partner", JSON.stringify(partner));
        sessionStorage.setItem("token", token);

        toast.success(`Welcome, ! 🎉`, { position:"top-right", theme:"dark" });   
            navigate("/homecolab");

        // Clear input fields
        setPatnerInput({ email: "", password: "" });

    } else if (result.status === 406  || result.status ===400 ) {
        toast.warning(result.response.data.message, { position: "top-right" ,theme:"dark"});
    }

} catch (err) {
  console.error("Login Error:", err);
  toast.error("Something went wrong! Please try again.", { position: "top-right", theme: "dark" });
}
setIsLoading(false);  
}



  return (
    <div className="bg-gradient-to-b from-gray-900 p-3 to-black min-h-screen text-white flex items-center justify-center">
   <div className="w-full max-w-md mx-auto p-6  bg-gradient-to-r from-slate-700 to-neutral-900 drop-shadow-lg rounded-lg shadow-md">
      <h2 className="text-2xl  font-bold mb-6 text-center font-[DM_Sans] text-gray-200"> {InsideTheRegister ? "RGISTER PAGE ":" LOGIN PAGE"} </h2>
      
      <form autocomplete="off" >
        {/* Name Field */}
        {
          InsideTheRegister && <div className="relative mb-4">
          <input
          id='StationName'
            type="text"
            value={patnerInput.StationName}
            onChange={(e)=>setPatnerInput({...patnerInput,StationName:e.target.value})}
            className="block  px-2.5 pb-2.5 pt-4 w-full text-gray-400 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 peer"
            placeholder="  "
          />
          <label 
            htmlFor="StationName"
            className="absolute  text-gray-200 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] rounded-full bg-slate-700  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-gray-200 left-1"
          >
            Company Name
          </label>
        
        </div>
        }

        {/* Email Field */}
        <div className="relative mb-4">
          <input
          id='email'
            style={{displaya:"none"}}
            value={patnerInput.email}
            type="email" 
            onChange={(e)=>setPatnerInput({...patnerInput,email:e.target.value})}
            className="block px-2.5 pb-2.5 pt-4 w-full text-gray-400 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 peer"
            placeholder=" "
          />
          <label 
            htmlFor="email"
            className="absolute text-gray-200 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] rounded-full  bg-slate-700 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75  peer-focus:text-gray-200 left-1"
          >
           Email
          </label>
          
        </div>

        {/* Password Field */}
        <div className="relative mb-4">
          <input
          id='password'
            name="pass" type="password" autocomplete="new-password"
            value={patnerInput.password}
            onChange={(e)=>setPatnerInput({...patnerInput,password:e.target.value})}
            className="block px-2.5 pb-2.5 pt-4 w-full text-gray-400 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 peer"
            placeholder=" "
          />
           <label 
            htmlFor="password"
            className="absolute text-gray-200 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] rounded-full bg-slate-700 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75  peer-focus:text-gray-200 left-1"
          >
            Password
          </label>
        </div>

        {/* Address Field */}
        {
          InsideTheRegister &&
          <div className="relative mb-6">
          <textarea
          id='address'
            value={patnerInput.address}
            onChange={(e)=>setPatnerInput({...patnerInput,address:e.target.value})}
            className="block px-2.5 pb-2.5 pt-4 w-full text-gray-400 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-2  peer focus:ring-green-600 focus:border-green-600"
            placeholder=" "
            rows="3"
          />
          <label 
            htmlFor="address"
            className="absolute text-gray-200 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  bg-slate-700 rounded-full px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75  peer-focus:text-gray-200 left-1"
          >
            Address
          </label>
        </div>
        }

        {/* alert message      */}
{/* 
        <div className=' mb-2 w-full py-4 px-1 0 bg-red-400/10 text-red-500 rounded-lg text-sm'>
           <h1 className='text-center'> Cheack your email and verify .. </h1>
        </div> */}
    
        {/* Submit Button */}
        {
          InsideTheRegister ?  <button
          onClick={panterRegisterHandle}
            className="w-full font-[DM_Sans]  bg-green-500 hover:-translate-y-1 hover:scale-108 text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-300 ease-in-out hover:bg-green-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Register
          </button>
          :
          <button
            onClick={PatnerLoginHandle}
            disabled={isLoading}
            className="w-full font-[DM_Sans] bg-green-500 hover:-translate-y-1 hover:scale-108 text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-300 ease-in-out hover:bg-green-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            {isLoading ? (
  <div className="flex justify-center items-center">
    <FaSpinner className="animate-spin mr-2" /> Logging in...
  </div>
) : (
  "Login"
)}

          </button>
        }
      </form>
      <div className="mt-6 text-center text-sm text-zinc-400">
          {
            InsideTheRegister?<p>Already have an account? <Link className=' text-indigo-500' to={'/logPatners'}>Sign in here</Link></p> :<p  > Not a member?<Link className=' text-indigo-500' to={'/regPatners'}> Create an account</Link></p> 
          }
        </div>
    </div>
  </div>
        
  );
};

export default Authen;