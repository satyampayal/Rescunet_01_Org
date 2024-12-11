import React, { useState } from "react";

const Step5 = () => {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    plateNumber: "",
    stateRegistered: "",
    color: "",
    vin: "",
    features: "",
    photos: [],
  });

  const maxPhotos = 4;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.photos.length > maxPhotos) {
      alert(`You can only upload up to ${maxPhotos} images.`);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...files],
    }));
  };

  const handleSubmit = () => {
    console.log("Vehicle Information Submitted: ", formData);
    alert("Vehicle Information Submitted Successfully!");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg text-black">
      <h1 className="text-2xl font-bold mb-4">Vehicle Information</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
      {/* Make */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Make</label>
        <input
          type="text"
          value={formData.make}
          onChange={(e) => handleInputChange("make", e.target.value)}
          className="w-full border rounded-md px-3 py-2 border-gray-300"
          placeholder="Enter vehicle make"
        />
      </div>

      {/* Model */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Model</label>
        <input
          type="text"
          value={formData.model}
          onChange={(e) => handleInputChange("model", e.target.value)}
          className="w-full border rounded-md px-3 py-2 border-gray-300"
          placeholder="Enter vehicle model"
        />
      </div>

      {/* Year */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Year</label>
        <input
          type="text"
          value={formData.year}
          onChange={(e) => handleInputChange("year", e.target.value)}
          className="w-full border rounded-md px-3 py-2 border-gray-300"
          placeholder="Enter vehicle year"
        />
      </div>
      </div>
   
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
  {/* Plate Number */}
  <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Plate Number</label>
        <input
          type="text"
          value={formData.plateNumber}
          onChange={(e) => handleInputChange("plateNumber", e.target.value)}
          className="w-full border rounded-md px-3 py-2 border-gray-300"
          placeholder="Enter plate number"
        />
      </div>

      {/* State Last Registered */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">State Last Registered</label>
        <input
          type="text"
          value={formData.stateRegistered}
          onChange={(e) => handleInputChange("stateRegistered", e.target.value)}
          className="w-full border rounded-md px-3 py-2 border-gray-300"
          placeholder="Enter state last registered"
        />
      </div>

      {/* Color */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Color</label>
        <input
          type="text"
          value={formData.color}
          onChange={(e) => handleInputChange("color", e.target.value)}
          className="w-full border rounded-md px-3 py-2 border-gray-300"
          placeholder="Enter vehicle color"
        />
      </div>
       </div>
    

      {/* VIN */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">(VIN) Vehicle Identification Number</label>
        <input
          type="text"
          value={formData.vin}
          onChange={(e) => handleInputChange("vin", e.target.value)}
          className="w-full border rounded-md px-3 py-2 border-gray-300"
          placeholder="Enter VIN"
        />
      </div>

      {/* Distinguishing Features */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Distinguishing Features</label>
        <textarea
          value={formData.features}
          onChange={(e) => handleInputChange("features", e.target.value)}
          className="w-full border rounded-md px-3 py-2 border-gray-300"
          placeholder="Describe distinguishing features of the vehicle"
          rows="4"
        />
      </div>

      {/* Photos */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Photos of Actual or Similar Vehicle (Limit {maxPhotos})
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
        />
        <p className="mt-1 text-sm text-gray-500">Maximum file size: 1 MB per image</p>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {formData.photos.map((file, index) => (
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt={`Vehicle ${index + 1}`}
              className="w-full h-68 object-cover rounded-lg"
            />
          ))}
        </div>
      </div>

      {/* Submit Button */}
      {/* <button
        type="button"
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Submit
      </button> */}
    </div>
  );
};

export default Step5;
