import React from 'react'
import { FaUserCircle } from "react-icons/fa";

function LatestCase() {
  
    
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
  return (
     <main className="py-10 px-6">
        <h2 className="text-2xl font-bold mb-6">Welcome to your dashboard.</h2>
        <p className="mb-6">
         
        This is your personal command center where you will be able to manage your account and the profiles you have entered.
        </p>

        <div className="min-h-screen border-red-500 border-[2px] rounded-md text-white py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Person Cards</h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
        {cardData.map((person, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center space-y-4"
          >
            {/* Name */}
            <h3 className="text-xl font-bold">{person.name}</h3>
            {/* Status */}
            <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
              {person.status}
            </span>
            {/* Icon */}
            <FaUserCircle size={64} className="text-teal-400" />
            {/* Date */}
            <p className="text-sm text-gray-300">{person.date}</p>
            {/* Address */}
            <p className="text-center text-gray-400">{person.address}</p>
          </div>
        ))}
      </div>
    </div>
      </main>
      
  )
}

export default LatestCase