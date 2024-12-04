import React, { useEffect, useState } from "react";
import { FaBars, FaChevronDown, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoExit } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { logoutAccount } from "../redux/slices/authSlices";
import ListsOfComplains from "./ListsOfComplains";
import { Outlet } from "react-router-dom";
import SearchBar from "./SearchBar";
const HomePage = () => {
    const dispatch=useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState("");
    const { isLoggedIn } = useSelector((state) => state.auth);
    let { data } = useSelector((state) => state.auth);
    let userData=localStorage.getItem('data') ;
    userData=JSON.parse(userData)


    const toggleDropdown = (menuName) => {
        setActiveDropdown(activeDropdown === menuName ? null : menuName);
    };
  
    const logouHandle= async ()=>{
        const  response=await dispatch(logoutAccount());
        if(response?.data?.success){
            console.log("logout succesfully")
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#051622] via-[#1ba098] to-[#deb992] text-white">
            {/* Top Navbar */}
            <div className="bg-gray-800 py-2 px-6">
                <div className="container mx-auto flex md:flex-row flex-col justify-between items-center">
                    <p className="text-sm">Welcome to RescueNet</p>
                    {!isLoggedIn ? <div className="space-x-4 ">
                        <Link to={'/user/login'} className="text-teal-400 hover:text-teal-300">Login</Link>
                        <Link to={'/user/register'} className="text-teal-400 hover:text-teal-300">Register</Link>
                    </div>
                        :
                        <div className="  justify-self-end flex md:flex-row flex-col gap-1   items-center">
                            <p className="text-lg text-white">Hi,{`${userData?.firstName}`} {`${userData?.lastName}`} </p>
                            <div className="space-x-4 flex ">
                                <button onClick={logouHandle} className="text-teal-400 hover:text-teal-300 flex gap-1">
                                    <IoExit size={28} color="green" className="" />
                                    Logout  <span className="text-green-500"> | </span>
                                </button>

                                <Link to={'/my'} className="text-teal-400 hover:text-teal-300 flex gap-0">
                                    <FaUser size={28} color="green" />
                                    My Account </Link>
                            </div>
                        </div>
                    }
                </div>
            </div>

            {/* Main Navbar */}
            <header className="bg-gray-900 py-4 px-6 shadow-md">
                <div className="container mx-auto flex justify-between  ">
                    <h1 className="text-2xl font-bold">RescueNET</h1>
                    {/* Hamburger Menu for Small Screens */}
                    <button
                        className="md:hidden absolute top-[17%] right-5 text-teal-400   "
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                    {/* Navbar Links */}
                    <nav
                        className={`${isMenuOpen ? " z-[1000] absolute top-[15%] bg-[#051622] w-[90vw] h-[80vh] flex justify-start items-center rounded-lg " : "hidden"
                            } md:flex flex-col md:flex-row md:items-center md:space-x-6  md:w-auto  mt-4 md:mt-0 `}
                    >
                        <a href="#" className="hover:text-teal-300">
                            Home
                        </a>

                        {/* About Us Dropdown */}
                        <div
                            className="relative group"
                            onMouseEnter={() => toggleDropdown("about")}
                            onMouseLeave={() => toggleDropdown("")}
                        >
                            <button className="hover:text-teal-300 flex items-center">
                                About Us <FaChevronDown className="ml-1" />
                            </button>
                            {activeDropdown === "about" && (
                                <div
                                    className="md:absolute relative mt-2 bg-gray-800 text-white rounded-lg shadow-lg"
                                    onMouseEnter={() => toggleDropdown("about")}
                                    onMouseLeave={() => toggleDropdown("")}
                                >
                                    <a
                                        href="#"
                                        className="block px-4 py-2 hover:bg-teal-600 rounded-t-lg"
                                    >
                                        Our Mission
                                    </a>
                                    <a href="#" className="block px-4 py-2 hover:bg-teal-600">
                                        Our Team
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 hover:bg-teal-600 rounded-b-lg"
                                    >
                                        Contact Us
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Support Us Dropdown */}
                        <div
                            className="relative group"
                            onMouseEnter={() => toggleDropdown("support")}
                            onMouseLeave={() => toggleDropdown("")}
                        >
                            <button className="hover:text-teal-300 flex items-center">
                                Support Us <FaChevronDown className="ml-1" />
                            </button>
                            {activeDropdown === "support" && (
                                <div
                                    className="md:absolute relative  mt-2 bg-gray-800 text-white rounded-lg shadow-lg"
                                    onMouseEnter={() => toggleDropdown("support")}
                                    onMouseLeave={() => toggleDropdown("")}
                                >
                                    <a
                                        href="#"
                                        className="block px-4 py-2 hover:bg-teal-600 rounded-t-lg"
                                    >
                                        Corporate Sponsorships
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 hover:bg-teal-600 rounded-b-lg"
                                    >
                                        Become a Donor
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Missing People Dropdown */}
                        <div
                            className="relative group"
                            onMouseEnter={() => toggleDropdown("missing")}
                        //   onMouseLeave={() => toggleDropdown("")}
                        >
                            <button className="hover:text-teal-300 flex items-center">
                                Missing People <FaChevronDown className="" />
                            </button>
                            {activeDropdown === "missing" && (
                                <div
                                    className="md:absolute relative  mt-2 bg-gray-800 text-white rounded-lg shadow-lg"
                                    onMouseEnter={() => toggleDropdown("missing")}
                                    onMouseLeave={() => toggleDropdown("")}
                                >
                                    <a
                                        href="#"
                                        className="block px-4 py-2 hover:bg-teal-600 rounded-t-lg"
                                    >
                                        Missing Adults Map
                                    </a>
                                    <a href="#" className="block px-4 py-2 hover:bg-teal-600">
                                        Missing Children Map
                                    </a>
                                    <a href="#" className="block px-4 py-2 hover:bg-teal-600">
                                        What to Do If Someone Is Missing
                                    </a>
                                    <a href="#" className="block px-4 py-2 hover:bg-teal-600">
                                        Database Search
                                    </a>
                                    <a href="#" className="block px-4 py-2 hover:bg-teal-600">
                                        Top Ten Viewed Profiles
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 hover:bg-teal-600 rounded-b-lg"
                                    >
                                        Local Missing People
                                    </a>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
            </header>

           {/* Searching Bar */}
           <SearchBar/>
            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center text-center py-20 px-4">
                <h2 className="text-4xl font-bold mb-6">
                    WORKING WITH LAW ENFORCEMENT AND THE FAMILIES OF THE MISSING
                </h2>
                <p className="max-w-3xl mb-6 text-lg text-gray-200">
                    Missing Persons Center is the number one source of profiling of
                    missing people. We report, profile, publicize, and investigate.
                </p>
            </section>
            <Outlet/>
            {/* <ListsOfComplains/> */}

        </div>
    );
};

export default HomePage;
