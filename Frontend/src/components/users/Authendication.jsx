import React, {  useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {  loginAPI, registerAPI } from '../../Server/allAPI';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




const autho = ({insideRegister}) => {
    const navigate =useNavigate()
    const [inputData, setInputData] = useState({
      fullName:"",
      email:"",
      password:"",
      confirmPassword:""
    });
    console.log(inputData);

   
  
  const handleRegister= async(e)=>{
    e.preventDefault()
    console.log("registre Button clicked");
    if (inputData.fullName && inputData.email && inputData.password && inputData.confirmPassword) {  
      try {
          const result = await registerAPI(inputData);
          console.log(result);

          if (result.status === 200) {
              toast.success(result.data.message,{position:"top-right" ,theme:"dark"});
              navigate('/login');
              setInputData({
                  fullName: "",
                  email: "",
                  password: "",
                  confirmPassword: ""
              });
          } else if (result.status === 400 || result.status === 406) {
            toast.warning(result.response.data.error,{position:"top-right",theme:"dark"});  // incrrect pass amd already exist
          } else {
            toast.warning("Something went wrong. Please try again!", { position: "top-right",theme:"dark" });
          }
      } catch (err) {
          console.log("Error:", err);
      }
  }else{
    toast.dark("Please fill out the form 😊", { position: "top-right" });
    
  }
 

  console.log("Form Data:", inputData);
}
 

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login button clicked");

    if (!inputData.email || !inputData.password) {
        toast.info("Please enter your email and password!", { position: "top-right" ,theme:"dark" });
        return;
    }

    try {
        const result = await loginAPI(inputData);
        console.log("Login Response:", result);

        if (result.status === 200) {
            const { user, token } = result.data;

            // Store user & token in session storage
            sessionStorage.setItem("user", JSON.stringify(user));
            sessionStorage.setItem("token", token);

            toast.success(`Welcome, ! 🎉`, { position:"top-right", theme:"dark" });

            // Redirect based on role
            if (user.role === "admin") {
                navigate("/AdminDashboard");
            } else {
                navigate("/");
            }

            // Clear input fields
            setInputData({ email: "", password: "" });

        } else if (result.status === 406  || result.status ===400 ) {
            toast.warning(result.response.data.message, { position: "top-right" ,theme:"dark"});
        }

    } catch (err) {
        console.log("Login Error:", err);
        // toast.error("Something went wrong! Please try again.", { position: "top-right", theme:"dark" });
    }
}



  return (
    <div className="min-h-screen flex items-center font-[DM_Sans] justify-center bg-zinc-950 p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800  rounded-lg p-6 drop-shadow-lg">
        <h2 className=" font-[Manrope] text-2xl font-bold text-center text-white">Welcome Back</h2>
        <p className="text-zinc-400 text-center mb-6">Sign {insideRegister ? "up" :"in"}  to continue</p>
        <form  className="space-y-4">
          {
              insideRegister &&<div className="relative">
              <input
                id="fullName"
                type="text"
                value={inputData.fullName}
                onChange={e=>setInputData({...inputData,fullName:e.target.value})}
                className=" w-full bg-zinc-800 border border-zinc-700 rounded-md p-3 text-white focus:border-white focus:outline-none"
              />
              <label
                htmlFor="fullName"
                className={`absolute left-3 transition-all text-sm ${inputData.fullName ? "top-1 text-xs text-gray-300" : "top-3 text-base text-zinc-500"}`}
              >
                Full Name
              </label>
            </div>
          }
           {/* Email Address */}
          <div className="relative">
            <input
              type="email"
               autocomplete="email"
              value={inputData.email}
              onChange={e=>setInputData({...inputData,email:e.target.value})}
              className=" w-full bg-zinc-800 border border-zinc-700 rounded-md p-3 text-white focus:border-white focus:outline-none"
            />
            <label
              className={`absolute left-3 transition-all text-sm ${inputData.email ? "top-1 text-xs text-gray-300" : "top-3 text-base text-zinc-500"}`}
            >
              Email Address
            </label>
          </div>
          {/* Password */}
          <div className="relative">
            <input
              id="password"
              type="password"
              name="authoEmail"
              autocomplete="new-password"
              value={inputData.password}
              onChange={e=>setInputData({...inputData,password:e.target.value})}
              className=" w-full bg-zinc-800 border border-zinc-700 rounded-md p-3 text-white focus:border-white focus:outline-none"
            />
            <label
              htmlFor="password"
              className={`absolute left-3 transition-all text-sm ${inputData.password ? "top-1 text-xs text-gray-300" : "top-3 text-base text-zinc-500"}`}
            >
              Password
            </label>
          </div>
          {
            insideRegister && 
            <div className="relative">
              <input
                id="confirmPassword"
                type="password"
                name="authoPassword"
                autocomplete="new-password"
                value={inputData.confirmPassword}
                onChange={e=>setInputData({...inputData,confirmPassword:e.target.value})}
                className="peer w-full bg-zinc-800 border border-zinc-700 rounded-md p-3 text-white focus:border-white focus:outline-none"
              />
              <label
                htmlFor="confirmPassword"
                className={`absolute left-3 transition-all text-sm ${inputData.confirmPassword ? "top-1 text-xs text-gray-300" : "top-3 text-base text-zinc-500"}`}
              >
                Confirm Password
              </label>
            </div>
          }
          {
            !insideRegister &&<div className="flex items-center justify-between text-sm text-zinc-400">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="w-4 h-4 bg-zinc-800 border-zinc-700" />
              <span>Remember me</span>
            </label>
            {/* <a href="#" className="text-indigo-500 hover:underline">Forgot password?</a> */}
          </div>
          }
          {
            insideRegister ? <button onClick={handleRegister} className="w-full bg-green-900 hover:bg-green-700 text-white p-3 rounded-lg">
            Register
            </button>
            : 
            <button  onClick={handleLogin}  className="w-full bg-green-900 hover:bg-green-700 text-white p-3 rounded-lg">
            Login
            </button>
          }
         
          
        </form>
        <div className="mt-6 text-center text-sm text-zinc-400">
          {
            insideRegister?<p>Already have an account? <Link className=' text-indigo-500' to={'/login'}>Sign in here</Link></p> :<p  > Not a member?<Link className=' text-indigo-500' to={'/register'}> Create an account</Link></p> 
          }
        </div>
       
      </div>
    </div>
  );
};

export default autho;