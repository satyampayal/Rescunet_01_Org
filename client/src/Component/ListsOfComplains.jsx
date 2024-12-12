import React, { useEffect } from "react";
import { FaEye, FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllComplains } from "../redux/slices/complianSlices";
import { CiLocationOn } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";
const ListsOfComplains = () => {
    const dispatch=useDispatch();
    const {complainsList}=useSelector((state)=>state.complain)
    const {loadList}=useSelector((state)=>state.complain)
  useEffect( ()=>{
    
   const getListOfMissingCase= async ()=>{
    await dispatch(getAllComplains());
   
   }
      getListOfMissingCase();
         
  },[dispatch])
  return (
    <div className=" " >
    <h1 className="text-2xl text-green-400  ml-10  text-pretty">LATEST CASES ENTERED</h1>
   
    <div className="flex flex-wrap justify-center gap-6 p-6">
    {
        loadList && <div className="flex justify-center items-center  ">
          <div className="w-8 h-8 border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"></div>
        </div>
      }
      {complainsList? complainsList.map((person) => (
        <div
          className={` w-64 p-4 border rounded-lg shadow-lg transition-all  duration-600   hover:scale-[1.02]  hover:border-balck hover:border-[5px]
          `}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">{person?.firstName} {person?.lastName}</h3>
          <div className="relative">
          <Link 
          to={'/missing-person/'+person._id}
          key={person._id} className="  flex   justify-center text-blue-500 mb-4 hover:scale-95  duration-200 w-full      ">
            <img onLoad={()=>"image load"}  src={  person?.images.length>0?person.images[0]?.secure_url :'https://missingpersonscenter.org/wp-content/uploads/elementor/thumbs/IMG_0754-qxg73zp8a3z7dnn9z603nov3vkay0klwywux3m61ws.jpeg'}
             className=" hover:border-[4px] hover:border-blue-300 rounded-[10px] duration-200  object-contain "
            />

          </Link>
          <button onClick={()=>console.log(person?._id)} className="text-white  flex gap-1 relative left-10 border-2 border-blue-400 rounded-md  bg-blue-500 p-2 hover:scale-90  duration-200 transition-all "> <FaEye size={20} color="white" /> Add to watchlist</button>

          </div>
        
          <p className="text-white flex gap-1 mb-1 "> <SlCalender size={20} color="green"/> <span className="">Missing since : </span> {person?.missingSince}</p>
          <p className="text-white flex justify-center "> <CiLocationOn size={28} color="green" /> {person?.Nationality}</p>

       
        </div>
      )) :
      <h1>loading....</h1>
      }
    </div>
    </div>
  );
};

export default ListsOfComplains;
