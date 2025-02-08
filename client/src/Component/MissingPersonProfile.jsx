import React, { useEffect, useState } from "react";
import { FaPhone, FaMapMarkerAlt, FaUser, FaWeight, FaHeart, FaBrain,FaEnvelope } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getComplainByComplainId } from "../redux/slices/complianSlices";
const MissingPersonProfile = () => {
  const dispatch = useDispatch();
  const { loadList } = useSelector((state) => state.complain)
  const { complainId } = useParams();
  let missingPerson = {
    firstName: "Jane",
    lastName: "Doe",
    age: 55,
    contactAddress: "1234 Elm Street, New York, NY",
    missingSince: "Dec 1, 2024",
    gender: "Female",
    weight: "140 lbs",
    health: "Good",
    mentalHealth: "Stable",
    missingFrom: "Central Park, NYC",
    status: "Active",
    nationality: "American",
    ethnicity: "Caucasian",
    hair: "Blonde",
    eyes: "Brown",
    height: "5' 3\"",
    images: [
      "https://via.placeholder.com/150", // Main image
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
    ],
  };
  const [complainData, setComplaindata] = useState([]);
  const [selectImage,setSelectImage]=useState(0);
  useEffect(() => {
    window.screen(0,0)
    const getResult = async () => {
      const response = await dispatch(getComplainByComplainId({ complainId }))
      if (response?.payload?.data?.success) {
        missingPerson = response?.payload?.data?.data;
        setComplaindata(missingPerson);

      }

    }
    getResult();
  }, [])

  return (
    <div>
    <div className="min-h-screen mx-auto bg-gradient-to-br from-[#051622] via-[#1ba098] to-[#deb992]  p-5 ">

      <header className="bg-gray-800 py-4 px-6 w-auto">
        <Link to={'/'} className="flex gap-0 justify-start  items-center text-white "> <IoIosArrowBack size={40} color="white" /> Back</Link>
        {/* <h1 className="text-2xl font-bold">Good to see you, <span className="text-green-400"> {userData?.firstName} {userData?.lastName} </span>  </h1> */}
        {/* <p className="text-sm mt-2">You're currently logged in.</p> */}
      </header>
      {
        loadList && <div className="flex justify-center items-center  ">
          <div className="w-8 h-8 border-4 border-green-500 border-solid rounded-full border-t-transparent animate-spin"></div>
        </div>
      }
      <div className="  max-w-[4xl]  rounded-lg shadow-lg overflow-hidden ">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="md:text-3xl text-[24px] font-bold">
                {complainData?.firstName} {complainData?.lastName}
              </h1>
              <p className=" text-sm md:text-lg">Missing since: {complainData?.missingSince}</p>
            </div>
            <div className="bg-green-500 text-sm font-semibold py-1 px-3 rounded-full">
              {missingPerson?.status}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col md:flex-row p-6 gap-6 bg-white">
          {/* Left Column: Images */}
          <div className="w-full md:w-1/2">
            <div className="mb-4">
              <img
                src={complainData?.images?.length > 0 ? complainData?.images[selectImage]?.secure_url : ""}
                alt={`${complainData?.firstName} ${complainData?.lastName}`}
                className="w-full h-64  object-fit rounded-lg"
              />
            </div>
            <div className="flex gap-2">
              {complainData?.images?.map((image, index) => (
                <img
                onClick={()=>setSelectImage(index)}
                  key={index}
                  src={image?.secure_url}
                  alt={`Additional ${index}`}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Details</h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-center">
                <FaUser className="text-purple-600 mr-3" />
                {complainData?.gender}, {complainData?.age} years old
              </li>
              <li className="flex items-center">
                <FaMapMarkerAlt className="text-purple-600 mr-3" />
                {complainData?.Nationality}, {complainData?.ethnicity}
              </li>
              <li className="flex items-center">
                <FaWeight className="text-purple-600 mr-3" />
                Weight: {complainData?.weight || "not specified"}
              </li>
              <li className="flex items-center">
                <FaHeart className="text-purple-600 mr-3" />
                Health: {complainData?.health}
              </li>
              <li className="flex items-center">
                <FaBrain className="text-purple-600 mr-3" />
                Mental Health: {complainData?.meantalHealth}
              </li>
              <li className="flex items-center">
                <FaUser className="text-purple-600 mr-3" />
                Hair: {complainData?.hairColor || "not know"}, Eyes: {complainData?.eyes || "not know"}
              </li>
              <li className="flex items-center">
                <FaUser className="text-purple-600 mr-3" />
                Height: {complainData?.height || "not know"}
              </li>
             
              <li className="flex items-center">
                <FaPhone className="text-purple-600 mr-3" />
                Contact: {complainData?.contactAddress || "Not declare"}
              </li>
              <li className="flex items-center ">
                <FaEnvelope  className="text-purple-600 mr-3" />
                Email: {complainData?.otherEmail || "Not declare"}
              </li>
              
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Outlet/>

    </div>
  );
};

export default MissingPersonProfile;
