import React, { useState } from "react";

const Step3 = () => {
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [errors, setErrors] = useState({});

  const handleMainImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      setErrors({ mainImage: "Main image must not exceed 5 MB" });
    } else {
      setMainImage(file);
      setErrors({ ...errors, mainImage: null });
    }
  };

  const handleGalleryImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const totalImages = galleryImages.length + files.length;

    if (totalImages > 4) {
      setErrors({ galleryImages: "You can upload a maximum of 4 gallery images." });
      return;
    }

    const validFiles = files.filter((file) => file.size <= 1 * 1024 * 1024);

    if (validFiles.length < files.length) {
      setErrors({
        galleryImages: "Some images exceeded the 1 MB size limit and were not added.",
      });
    } else {
      setErrors({ ...errors, galleryImages: null });
    }

    setGalleryImages([...galleryImages, ...validFiles]);
  };

  const handleRemoveGalleryImage = (index) => {
    const updatedGallery = [...galleryImages];
    updatedGallery.splice(index, 1);
    setGalleryImages(updatedGallery);
  };

  const previewImage = (file) => {
    return URL.createObjectURL(file);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md text-black">
      <h1 className="text-2xl font-bold mb-4">Media Upload</h1>

      {/* Main Image Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium">Main Image *</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleMainImageUpload}
          className="mt-2 block w-full border rounded-md px-3 py-2 border-gray-300"
        />
        {errors.mainImage && <p className="text-red-500 text-sm">{errors.mainImage}</p>}
        {mainImage && (
          <div className="mt-4">
            <p className="text-sm font-medium">Preview:</p>
            <img
              src={previewImage(mainImage)}
              alt="Main Preview"
              className="w-40 h-40 object-cover rounded-md border mt-2"
            />
          </div>
        )}
      </div>

      {/* Gallery Images Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium">Gallery Images (Max 4)</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleGalleryImageUpload}
          className="mt-2 block w-full border rounded-md px-3 py-2 border-gray-300"
        />
        {errors.galleryImages && (
          <p className="text-red-500 text-sm">{errors.galleryImages}</p>
        )}
        {galleryImages.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium">Gallery Preview:</p>
            <div className="flex gap-4 mt-2">
              {galleryImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={previewImage(image)}
                    alt={`Gallery Preview ${index + 1}`}
                    className="w-32 h-32 object-cover rounded-md border"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveGalleryImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Submission */}
      {/* <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Submit
      </button> */}
    </div>
  );
};

export default Step3;
