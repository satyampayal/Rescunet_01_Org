import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchComplain } from "../redux/slices/complianSlices";

const SearchBar = () => {
    const { searchComplainList } = useSelector((state) => state.complain);
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
                        placeholder="Search by Name, Age, or Address..."
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

            {/* Search Results */}
            {searchComplainList?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchComplainList.map((person, index) => (
                        <div
                            key={index}
                            className="border rounded-lg shadow-lg overflow-hidden bg-white"
                        >
                            {/* Person Image */}
                            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                {person.images?.length > 0 ? (
                                    <img
                                        src={person.images[0].secure_url}
                                        alt={`${person.firstName} ${person.lastName}`}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-gray-500 text-sm">
                                        No Image Available
                                    </span>
                                )}
                            </div>

                            {/* Person Details */}
                            <div className="p-4">
                                <h3 className="text-lg font-bold">
                                    {person.firstName} {person.lastName}
                                </h3>
                                <p className="text-sm text-gray-700">
                                    <strong>Age:</strong> {person.age}
                                </p>
                                <p className="text-sm text-gray-700">
                                    <strong>Gender:</strong> {person.gender}
                                </p>
                                <p className="text-sm text-gray-700">
                                    <strong>Address:</strong> {person.contactAddress}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 text-lg mt-6">
                    No results found
                </div>
            )}
        </div>
    );
};

export default SearchBar;
