import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const MyProfile = () => {
    let userData=localStorage.getItem('data') ;
    userData=JSON.parse(userData)
  const [currentStep, setCurrentStep] = useState(0);
 
  const steps = [
    "MISSING PERSON",
    "LOCATION",
    "PHOTOS",
    "POLICE",
    "MILITARY",
    "VEHICLE",
    "SOCIAL MEDIA",
    "Last Page",
  ];

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#051622] via-[#1ba098] to-[#deb992] text-white">
      <header className="bg-gray-800 py-4 px-6">
        <Link to={'/'}  className="flex gap-0 justify-start  items-center"> <IoIosArrowBack  size={40}/> Back</Link>
        <h1 className="text-2xl font-bold">Good to see you, <span className="text-green-400"> {userData?.firstName} {userData?.lastName} </span>  </h1>
        <p className="text-sm mt-2">You're currently logged in.</p>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-600 py-4 px-6 w-[90vw] mx-auto rounded-md">
        <div className="flex space-x-4 justify-between flex-col md:flex-row gap-2 ">
          <Link to={'main'} className={` text-teal-400 text-center block ${currentStep==0?' border-b-2 border-green-500 ' :''}  " hover:text-teal-300 "`} onClick={()=>setCurrentStep(0)}>MAIN</Link>
          {/* <button className={` text-teal-400 ${currentStep==1?' w-20 h-20 bg-white rounded-full' :''}  " hover:text-teal-300 "`} onClick={()=>setCurrentStep(1)}>ADD CASE</button> */}
          <Link  to='addcase' className={` text-teal-400  text-center block ${currentStep==1?' border-b-2 border-green-500 ' :''}  " hover:text-teal-300 "` }  onClick={()=>setCurrentStep(1)}>ADD CASE</Link>
          <Link to='mycases' className={` text-teal-400  text-center block ${currentStep==2?' border-b-2 border-green-500' :''}  " hover:text-teal-300 "`} onClick={()=>setCurrentStep(2)}>MY CASES</Link>
          <button className={` text-teal-400 ${currentStep==3?'border-b-2 border-green-500' :''}  " hover:text-teal-300 "`} onClick={()=>setCurrentStep(3)}>CASE WATCHLIST</button>
          <button className={` text-teal-400 ${currentStep==4?' border-b-2 border-green-500' :''}  " hover:text-teal-300 "`} onClick={()=>setCurrentStep(4)}>HELP FUNDRAISE</button>
          <button className={` text-teal-400 ${currentStep==5?' border-b-2 border-green-500' :''}  " hover:text-teal-300 "`} onClick={()=>setCurrentStep(5)}>SUPPORT</button>
          <button className={` text-teal-400 ${currentStep==6?' border-b-2 border-green-500' :''}  " hover:text-teal-300 "`} onClick={()=>setCurrentStep(6)}>USER SETTINGS</button>
        </div>
      </nav>
       
      <Outlet/>
   
      

    
      
    </div>
  );
};

export default MyProfile;
