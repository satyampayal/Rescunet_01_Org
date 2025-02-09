import React, { useEffect, useState } from "react";
import { FaPhone, FaMapMarkerAlt, FaUser, FaWeight, FaHeart, FaBrain, FaEnvelope } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getComplainByComplainId } from "../redux/slices/complianSlices";
import CaseShareWithSocial from "../ShareHandle/CaseShareWithSocial";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
const SOCKET_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://rescunet-01-org-4.onrender.com";
const socket = io(SOCKET_URL); // Connect to backend
const MissingPersonProfile = () => {
  const dispatch = useDispatch();
  const { loadList } = useSelector((state) => state.complain);
  const { complainId } = useParams();
  
  const [complainData, setComplaindata] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(getComplainByComplainId({ complainId }));
      if (response?.payload?.data?.success) {
        setComplaindata(response?.payload?.data?.data);
        
      }
    };
    fetchData();
      // Listen for "get-case-particular" event from server
      socket.emit("get-case-particular", complainData);
      socket.off("get-case-particular"); // Cleanup on unmount

      socket.on("get-case-particular",(complainData)=>{
        toast.success("case details recieved of "+complainData.firstName,{
          position: "top-right",
          duration: 5000,
    
        })
      })

    return () => {
      socket.off("get-case-particular"); // Cleanup on unmount
    };
  }, [complainId, dispatch]);

  if (loadList) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="w-10 h-10 border-4 border-green-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!complainData) {
    return (
      <div className="text-center text-gray-300 min-h-screen flex justify-center items-center">
        <p className="text-lg">No missing person details available.</p>
      </div>
    );
  }

  const {
    firstName,
    lastName,
    age,
    gender,
    contactAddress,
    missingSince,
    weight,
    health,
    meantalHealth,
    missingFrom,
    status,
    nationality,
    ethnicity,
    hairColor,
    eyes,
    height,
    images = [],
    otherEmail,
    _id
  } = complainData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#051622] via-[#1ba098] to-[#deb992] p-6">
      {/* Header */}
      <header className="bg-gray-800 py-4 px-6 text-white">
        <Link to="/" className="flex items-center gap-2 hover:text-gray-400">
          <IoIosArrowBack size={30} />
          <span>Back</span>
        </Link>
      </header>

      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-6">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{firstName} {lastName}</h1>
            <p className="text-sm md:text-lg">Missing since: {missingSince}</p>
          </div>
          <div className="bg-green-500 text-sm font-semibold py-1 px-3 rounded-full">
            {status || "Unknown"}
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-6 flex flex-col md:flex-row gap-6">
          {/* Left Column: Images */}
          <div className="md:w-1/2">
            <div className="relative">
              <img
                src={images[selectedImage]?.secure_url || "https://via.placeholder.com/150"}
                alt={firstName}
                className="w-full h-64 object-cover rounded-lg shadow-lg transition-all duration-300"
              />
            </div>
            {/* Image Thumbnails */}
            <div className="flex gap-2 mt-3">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image?.secure_url}
                  alt={`Image ${index + 1}`}
                  className={`w-16 h-16 object-cover rounded-lg cursor-pointer transition-all duration-200 ${
                    index === selectedImage ? "border-2 border-blue-500 scale-105" : "opacity-80"
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">Details</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center"><FaUser className="text-purple-600 mr-3" /> {gender}, {age} years old</li>
              <li className="flex items-center"><FaMapMarkerAlt className="text-purple-600 mr-3" /> {nationality}, {ethnicity}</li>
              <li className="flex items-center"><FaWeight className="text-purple-600 mr-3" /> Weight: {weight || "Not specified"}</li>
              <li className="flex items-center"><FaHeart className="text-purple-600 mr-3" /> Health: {health || "Unknown"}</li>
              <li className="flex items-center"><FaBrain className="text-purple-600 mr-3" /> Mental Health: {meantalHealth || "Not declared"}</li>
              <li className="flex items-center"><FaUser className="text-purple-600 mr-3" /> Hair: {hairColor || "Unknown"}, Eyes: {eyes || "Unknown"}</li>
              <li className="flex items-center"><FaUser className="text-purple-600 mr-3" /> Height: {height || "Unknown"}</li>
              <li className="flex items-center"><FaPhone className="text-purple-600 mr-3" /> Contact: {contactAddress || "Not provided"}</li>
              <li className="flex items-center"><FaEnvelope className="text-purple-600 mr-3" /> Email: {otherEmail || "Not provided"}</li>
            </ul>
          </div>
        </div>

        {/* Social Media Share Section */}
        {_id ? <CaseShareWithSocial caseData={complainData} /> : null}
      </div>

      <Outlet />
    </div>
  );
};

export default MissingPersonProfile;
