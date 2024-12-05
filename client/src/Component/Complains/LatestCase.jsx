import React, { useEffect } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { searchComplain} from '../../redux/slices/complianSlices'
import { useSelector,useDispatch } from 'react-redux';
import { SlCalender } from 'react-icons/sl';
import { CiLocationOn } from 'react-icons/ci';
function LatestCase() {
     const {searchComplainList} =useSelector((state)=>state.complain);
     console.log(searchComplainList)
     const dispatch=useDispatch();
    
      const cardData = [
        {
          name: "John Doe",
          status: "Active",
          date: "2024-11-30",
          address: "123 Main Street, New York, NY",
        },
        {
          name: "Jane Smith",
          status: "Active",
          date: "2024-11-28",
          address: "456 Elm Street, Los Angeles, CA",
        },
        {
          name: "Michael Brown",
          status: "Active",
          date: "2024-11-25",
          address: "789 Pine Street, Chicago, IL",
        },
      ];

      useEffect( ()=>{
    
        const getListOfMissingCase= async ()=>{
         await dispatch( searchComplain({missingSince:20}));

        }
           getListOfMissingCase();
              
       },[dispatch])
  return (
     <main className="py-10 px-6">
        <h2 className="text-2xl font-bold mb-6">Welcome to your dashboard.</h2>
        <p className="mb-6">
         
        This is your personal command center where you will be able to manage your account and the profiles you have entered.
        </p>

        <div className="min-h-screen border-red-500 border-[2px] rounded-md text-white py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Latest Case</h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
        {searchComplain? searchComplainList.map((person, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center space-y-4"
          >
            {/* Name */}
            <h3 className="text-xl font-bold">{person?.firstName}</h3>
            {/* Status */}
            <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
              {person?.status}
            </span>
            {/* Icon */}
            <div className=" flex justify-center text-blue-500 mb-4 hover:scale-95  duration-200   ">
            {
              person?.images.length>0?
              <img onLoad={'loading images'}  src={  person.images[0]?.secure_url }
              className=" hover:border-[4px] hover:border-blue-300 rounded-[10px] duration-200  "
             />
             :
             <FaUserCircle size={56}/>
            }
           
          </div>
          <div className="text-white  mb-1 flex md:text-[18px] text-[14px]  "> <SlCalender  className='md:size-6 size-5' color="green"/> <span className="">Missing since : </span> {person?.missingSince}</div>
          <p className="text-white flex justify-center "> <CiLocationOn size={28} color="green" /> {person?.Nationality}</p>
          </div>
        )): 
        <h1>There is Search in between 20..</h1>
        }
      </div>
    </div>
      </main>
      
  )
}

export default LatestCase