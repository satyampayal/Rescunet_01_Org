import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Icons for edit and delete
import { useSelector,useDispatch } from "react-redux";
import { deleteMyComplain, getAllMyComplains } from "../../redux/slices/complianSlices";

const MyCases = () => {
    const {myComplaints,loadList}=useSelector((state)=>state.complain)
    const dispatch=useDispatch();
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [myComplaintsList,setMyComplaintsList]=useState(myComplaints);
 
  useEffect(()=>{
    const myComplaints= async ()=>{
       await  dispatch(getAllMyComplains())

    }
    myComplaints();
  },[dispatch])

  const handleEdit = (person) => {
    console.log("Edit case for:", person);
  };
  const confirmDelete = (person) => {
    setDeleteTarget(person);
  };

  const handleDeleteConfirm = async () => {
    console.log("Deleting:", deleteTarget);
    const  data={
      postedBy:deleteTarget.postedBy,
    postId:deleteTarget._id
    }
     const response=await dispatch(deleteMyComplain(data))
    if(response){
    setDeleteTarget(null);
    dispatch(getAllMyComplains())
  }
  };

  const handleCancelDelete = () => {
    setDeleteTarget(null);
  };

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
       {
        loadList && <div className="flex justify-center items-center  ">
          <div className="w-8 h-8 border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"></div>
        </div>
      }
      {myComplaintsList?  myComplaintsList?.map((person, index) => (
        <div
          key={index}
          className="relative border rounded-lg shadow-lg overflow-hidden group"
        >
          {/* Image or Placeholder */}
          <div className="w-full h-60 bg-gray-200 flex items-center justify-center">
            {person?.images.length>0 ? (
              <img
                src={person?.images[0].secure_url}
                alt={`${person?.firstName} ${person?.lastName}`}
                className="w-full h-full  object-contain"
              />
            ) : (
              <span className="text-gray-500 text-sm">No Image Available</span>
            )}
          </div>

          {/* Person Details */}
          <div className="p-4">
            <h3 className="text-lg font-bold">
              {person?.firstName} {person?.lastName}
            </h3>
            <p className="text-sm text-gray-700">
              <strong>Age:</strong> {person?.age}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Gender:</strong> {person?.gender}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Height:</strong> {person?.height}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Address:</strong> {person?.contactAddress}
            </p>
          </div>

          {/* Hover Overlay for Actions */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => handleEdit(person)}
              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
            >
              <FaEdit className="w-5 h-5" />
            </button>
            <button
              onClick={() => confirmDelete(person)}
              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
            >
              <FaTrash className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))
      :
      <h1 className="text-center text-4xl text-white">You don't have publish any report</h1>
    }

    {/* Delete Confirmation Modal */}
    {deleteTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-blue-300">
              Are you sure you want to delete this case?
            </h2>
            <p className="mb-4">
              This action cannot be undone. Please confirm your decision.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCancelDelete}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCases;
