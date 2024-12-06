import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { verifyEmail } from "../redux/slices/authSlices";
const EmailVerification = () => {
    const dispatch=useDispatch();
    const {userId,uniqueString}=useParams();
    const [message,setMessage]=useState("");
    useEffect(()=>{
           const callEmail=async ()=>{
          const response=  await  dispatch(verifyEmail({userId,uniqueString}))
          console.log(response);
          setMessage(response?.payload?.data?.message);
           }
           callEmail();
    },[dispatch])
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <svg
            className="w-20 h-20 text-orange-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <circle cx="12" cy="12" r="10" className="text-orange-500" />
            <path
              d="M12 6v6l4 2"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Message */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {message}
        </h1>
        <p className="text-gray-600 mb-6">
          {/* Thank you for verifying your email. You can now explore all the features of our platform. */}
          {message}
        </p>

        {/* Button to Home Page */}
        <a
          href="/"
          className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition duration-300"
        >
          Go to Home Page
        </a>
      </div>
    </div>
  );
};

export default EmailVerification;
