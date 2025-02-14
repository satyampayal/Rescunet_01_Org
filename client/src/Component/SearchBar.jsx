import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchComplain } from "../redux/slices/complianSlices";
import { Link } from "react-router-dom";
import FaceScanner from "../FaceScanner";

const SearchBar = () => {
    const { searchComplainList,loadList } = useSelector((state) => state.complain);
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();

    const handleSearchChange = async (e) => {
        const value = e.target.value;
        setSearchTerm(value.toUpperCase());

        // Dispatch the search action with the entered term
        await dispatch(searchComplain({ firstName: value }));
    };

    return (
        <div className="p-4">
            {/* Search Bar */}
            <div className="flex justify-center items-center mb-6">
                <div className="relative w-full max-w-2xl">
                    <input
                        type="text"
                        placeholder="Search by Name or  Address..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="text-blue-400 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 w-6 h-6 text-gray-500"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-4.35-4.35M14.1 10.5a3.6 3.6 0 11-7.2 0 3.6 3.6 0 017.2 0z"
                        />
                    </svg>
                </div>
            </div>
            <FaceScanner/>

            {/* Search Results */}
            {
                searchTerm && loadList &&   <div className="flex justify-center items-center  ">
                <div className="w-8 h-8 border-4 border-green-500 border-solid rounded-full border-t-transparent animate-spin"></div>
              </div>
            }
            {  searchTerm && searchComplainList?.length  > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  sticky  top-[30%] w-[60vw]  shadow-2xl shadow-slate-400    rounded-lg border-[1px] p-2  z-[100] mx-auto ">
                    {searchComplainList.map((person, index) => (
                        <Link to={'/missing-person/'+person._id}
                            key={index}
                            className="border rounded-lg shadow-lg overflow-hidden bg-white hover:scale-95 transition-all duration-200"
                        >
                            {/* Person Image */}
                            <div className="w-full h-60 bg-gray-200 flex items-center justify-center hover:scale-105 transition-all duration-200">
                                {person.images?.length > 0 ? (
                                    <img
                                        src={person.images[0].secure_url}
                                        alt={`${person.firstName} ${person.lastName}`}
                                        className="w-full h-full object-contain "
                                    />
                                ) : (
                                    <span className="text-gray-500 text-sm">
                                        No Image Available
                                    </span>
                                )}
                            </div>

                            {/* Person Details */}
                            <div className="p-4">
                                <h3 className="text-lg text-green-700 font-bold">
                                    {person.firstName} {person.lastName}
                                </h3>
                                <p className="text-sm text-gray-700">
                                    <strong>Age:</strong> {person.age}
                                </p>
                                <p className="text-sm text-gray-700">
                                    <strong>Gender:</strong> {person?.gender}
                                </p>
                                <p className="text-sm text-gray-700">
                                    <strong>Address:</strong> {person?.contactAddress}
                                </p>
                                <p className="text-sm text-gray-700">
                                    <strong>MissingSince:</strong> {person?.missingSince}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center text-red-700 text-lg mt-6">
                    {
                        searchTerm && !loadList && <h1>Not Found any record</h1>
                    }
                </div>
            )}
        </div>
    );
};

export default SearchBar;
