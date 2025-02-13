import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerComplain } from "../../redux/slices/complianSlices";
import * as faceapi from "face-api.js";
import { postFaceData } from "../../redux/slices/faceSlice";

const AddCase = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    age: "",
    contactAddress: "",
    gender: "",
    languageKnown: "",
    isStudent: false,
    schoolName: "",
    collegeName: "",
    placesOfRegularVisit: "",
    Nationality: "",
    missingSince: "",
    height: "",
    hairColor: "",
    built: "",
    face: "",
    identificationMarks: "",
    health: "",
    meantalHealth: "",
    reportFill: false,
    reportNo: "",
    stationName: "",
    dateAndTime: "",
    gdeNo: "",
    lastSeenwithWhomeAndbyWhome: "",
    apparentCauseofLeaving: "",
    dressAtTimeOfLeaving: "",
    otherEmail: "",
  });

  const [images, setImages] = useState([]);  // Store uploaded images
  const [previews, setPreviews] = useState([]);  // Store image previews
  const [isLoadingModels, setIsLoadingModels] = useState(true);
  const [error, setError] = useState("");  // Store error messages
  const [faceDescriptors, setFaceDescriptors] = useState([]);  // Store detected face data

  // Load Face API models
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "http://localhost:5173/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
      setIsLoadingModels(false);
    };
    loadModels();
  }, []);
  // Face detection and validation
  useEffect(() => {
    if (previews.length > 0) detectFaces();
  }, [previews]);

  const detectFaces = async () => {
    let descriptors = [];
    
    for (let i = 0; i < previews.length; i++) {
      const img = new Image();
      img.src = previews[i];

      await new Promise((resolve) => {
        img.onload = async () => {
          const detection = await faceapi.detectSingleFace(img)
            .withFaceLandmarks()
            .withFaceDescriptor();

          if (!detection) {
            setError(`❌ No face detected in Image ${i + 1}. Please upload a clear face image.`);
          } else {
            descriptors.push(detection.descriptor);
          }
          resolve();
        };
      });
    }

    setFaceDescriptors(descriptors);

    // Ensure minimum 2 images are uploaded
    if (previews.length < 2) {
      setError("❌ Please upload at least 2 images.");
      return;
    }

    // Check if all uploaded images match
    if (descriptors.length > 1) {
      matchFaces(descriptors);
    }
  };

  // Compare faces in uploaded images
  const matchFaces = (descriptors) => {
    let matchFound = true;
    for (let i = 0; i < descriptors.length - 1; i++) {
      const distance = faceapi.euclideanDistance(descriptors[i], descriptors[i + 1]);

      console.log(`🔍 Comparing Image ${i + 1} & Image ${i + 2} - Distance: ${distance}`);

      if (distance > 0.6) {
        matchFound = false;
        break;
      }
    }

    if (!matchFound) {
      setError("❌ Uploaded images do not match! Please upload images of the same person.");
    } else {
      setError("");
    }
  };

  // Handle Image Upload
  const handleImages = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    if (!uploadedFiles.length) return;

    setImages((prevFiles) => [...prevFiles, ...uploadedFiles]);

    uploadedFiles.forEach((file) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setPreviews((prevPreviews) => [...prevPreviews, fileReader.result]);
      };
    });
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (error) {
      console.log("❌ Form submission blocked due to errors.");
      return;
    }
    const response=await  dispatch(postFaceData({descriptors:faceDescriptors,complainId:"67ae2db2c7d50e5ed0d22234"}))
    console.log(response)

    // const personFormData = new FormData();
    // for (const [key, value] of Object.entries(formData)) {
    //   personFormData.append(key, value);
    // }
    // images.forEach((image) => {
    //   personFormData.append("images", image);
    // });

    // const response = await dispatch(registerComplain(personFormData));
    // console.log(response);

    // if (response?.payload?.data?.status) {
    //   setFormData({
    //     firstName: "",
    //     lastName: "",
    //     fatherName: "",
    //     age: "",
    //     contactAddress: "",
    //     gender: "",
    //     languageKnown: "",
    //     isStudent: false,
    //     schoolName: "",
    //     collegeName: "",
    //     placesOfRegularVisit: "",
    //     Nationality: "",
    //     missingSince: "",
    //     height: "",
    //     hairColor: "",
    //     built: "",
    //     face: "",
    //     identificationMarks: "",
    //     health: "",
    //     meantalHealth: "",
    //     reportFill: false,
    //     reportNo: "",
    //     stationName: "",
    //     dateAndTime: "",
    //     gdeNo: "",
    //     lastSeenwithWhomeAndbyWhome: "",
    //     apparentCauseofLeaving: "",
    //     dressAtTimeOfLeaving: "",
    //     otherEmail: "",
    //   });
    //   // now send the faceDescriptors features 
    //   await  dispatch(postFaceData({descriptors:faceDescriptors,complainId:"67ae2db2c7d50e5ed0d22234"}))
    //   navigate("/my");
    // }
  };
  const fields = [
    { label: "First Name", name: "firstName", type: "text" },
    { label: "Last Name", name: "lastName", type: "text" },
    { label: "Father's Name", name: "fatherName", type: "text" },
    { label: "Age", name: "age", type: "number" },
    { label: "Contact Address", name: "contactAddress", type: "textarea" },
    { label: "Gender", name: "gender", type: "select", options: ["Male", "Female", "Other"] },
    { label: "Language Known", name: "languageKnown", type: "text" },
    { label: "Nationality", name: "Nationality", type: "text" },
    { label: "Missing Since", name: "missingSince", type: "date" },
    { label: "Height", name: "height", type: "text" },
    { label: "Hair Color", name: "hairColor", type: "text" },
    { label: "Built", name: "built", type: "text" },
    { label: "Face", name: "face", type: "text" },
    { label: "Identification Marks", name: "identificationMarks", type: "textarea" },
    { label: "Health", name: "health", type: "text" },
    { label: "Mental Health", name: "meantalHealth", type: "text" },
    { label: "Report No", name: "reportNo", type: "text" },
    { label: "Station Name", name: "stationName", type: "text" },
    { label: "Date and Time", name: "dateAndTime", type: "datetime-local" },
    { label: "GDE No", name: "gdeNo", type: "text" },
    { label: "Last Seen With Whome and By Whome", name: "lastSeenwithWhomeAndbyWhome", type: "text" },
    { label: "Apparent Cause of Leaving", name: "apparentCauseofLeaving", type: "text" },
    { label: "Dress at Time of Leaving", name: "dressAtTimeOfLeaving", type: "text" },
    { label: "Other Email", name: "otherEmail", type: "email" },
  ];

  return (
<div className="min-h-screen bg-gradient-to-br from-[#051622] via-[#1ba098] to-[#deb992]  py-8 px-4">
      <h1 className="text-2xl font-bold text-center mb-6">Add Case</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto  bg-gradient-to-br from-[#051622] via-[#1ba098] to-[#deb992] p-6 rounded shadow-md space-y-4"
      >
        {fields.map(({ label, name, type, options }) => (
          <div key={name}>
            <label className="block text-sm font-medium mb-2">{label}</label>
            {type === "textarea" ? (
              <textarea
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full p-2 border rounded text-black"
              />
            ) : type === "select" ? (
              <select
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full p-2 border rounded text-black"
              >
                <option value="">Select</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full p-2 border rounded text-black"
              />
            )}
          </div>
        ))}

        <div className="flex items-center space-x-4">
          <label>
            <input
              type="checkbox"
              name="isStudent"
              checked={formData.isStudent}
              onChange={handleChange}
              className="mr-2 text-black"
            />
            Is Student
          </label>
          <label>
            <input
              type="checkbox"
              name="reportFill"
              checked={formData.reportFill}
              onChange={handleChange}
              className="mr-2 text-black"
            />
            Report Filed
          </label>
        </div>
        {/* <div>
          <label className="block text-sm font-medium mb-2">Upload Images</label>
          <input
            type="file"
            multiple
            name="images"
            // value={formData.collegeName}
            onChange={handleImages}
            className="w-full p-2 border rounded text-black"
          />
        </div> */}

        {formData.isStudent && (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">School Name</label>
              <input
                type="text"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                className="w-full p-2 border rounded text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">College Name</label>
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                className="w-full p-2 border rounded text-black"
              />
            </div>

          </>
        )}
        <div className="flex flex-wrap gap-4">
          {previews.map((preview, index) => (
            <div key={index} className="w-32 h-32 border rounded overflow-hidden">
              <img
                src={preview}
                alt={`Preview ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <label className="block mb-2">Upload Images (Min 2)</label>
        <input type="file" multiple onChange={handleImages} className="border p-2 w-full mb-4" />

        <div className="flex gap-4">
          {previews.map((preview, index) => (
            <img key={index} src={preview} alt={`Preview ${index}`} className="w-24 h-24 object-cover border" />
          ))}
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 mt-4 rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCase;
