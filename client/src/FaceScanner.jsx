import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllface } from "./redux/slices/faceSlice";
import * as faceapi from "face-api.js";
import { getComplainByComplainId } from "./redux/slices/complianSlices";
import { FaUserCircle } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";

const FaceScanner = () => {
  const dispatch = useDispatch();
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [matchResult, setMatchResult] = useState("");
  const [complainData, setComplainData] = useState(null);
  const [showFunctinality,setShowFunctionality]=useState(false)

  useEffect(() => {
    // Load Face API models when component mounts
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      ]);
      console.log("Face recognition models loaded!");
    };

    loadModels();
  }, []);

  useEffect(() => {
    if (image) {
      processImage();
    }
  }, [image]); // Re-run whenever a new image is set

  const handleImageUpload = async (event) => {
    const imageFile = event.target.files[0];
    if (!imageFile) return;

    setMatchResult(""); // Reset match result on new upload
    setComplainData(null); // Clear previous data
    setScanning(true); // Indicate scanning process
    setImage(URL.createObjectURL(imageFile)); // Update state
  };

  const processImage = async () => {
    if (!image) return;
    imageRef.current.src = image;

    imageRef.current.onload = async () => {
      const detections = await faceapi.detectSingleFace(imageRef.current)
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detections) {
        setMatchResult("No face detected.");
        setScanning(false);
        return;
      }

      drawFaceBox(detections);

      // Fetch stored faces from Redux
      const response = await dispatch(getAllface());
      const storedFaces = response?.payload?.data?.data || [];

      matchFace(detections.descriptor, storedFaces);
    };
  };

  const drawFaceBox = (detections) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawing

    const displaySize = { width: imageRef.current.width, height: imageRef.current.height };
    faceapi.matchDimensions(canvas, displaySize);
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
  };

  const matchFace = async (uploadedDescriptor, storedFaces) => {
    let bestMatch = null;
    let minDistance = 0.6;
    let complainId = "";

    storedFaces.forEach((storedFace) => {
      const storedDescriptor = Object.values(storedFace?.detections[0]?.descriptor || []);
      const distance = faceapi.euclideanDistance(uploadedDescriptor, storedDescriptor);

      if (distance < minDistance) {
        minDistance = distance;
        bestMatch = storedFace;
        complainId = storedFace?.complaintId;
      }
    });

    if (bestMatch) {
      const response = await dispatch(getComplainByComplainId({ complainId }));
      if (response?.payload?.data?.success) {
        setComplainData(response?.payload?.data?.data);
        setMatchResult(`Face Matched: ${response?.payload?.data?.data?.firstName} ✅`);
      }
    } else {
      setMatchResult("No Match Found ❌");
    }

    setScanning(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-5">
        <button onClick={()=>setShowFunctionality(!showFunctinality)} className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg">search by upload Image</button>
     {showFunctinality &&  <div>
      <input type="file" accept="image/*" className="hidden" id="upload" onChange={handleImageUpload} />
      <label htmlFor="upload" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg">
        Upload Image
      </label>

      <div className="relative w-64 h-64 border-4 border-gray-300 rounded-lg overflow-hidden">
        <img ref={imageRef} alt="Uploaded" className="w-full h-full object-cover" />
        <canvas ref={canvasRef} className="absolute top-0 left-0" />
      </div>

      {scanning && <p className="text-blue-500">Scanning...</p>}
      <p className="font-semibold text-white">{matchResult}</p>

      {complainData && (
        <Link to={`/missing-person/${complainData._id}`} className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center space-y-4">
          <h3 className="text-xl font-bold">{complainData.firstName}</h3>
          <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full">Active</span>

          <div className="flex justify-center text-blue-500 mb-4 hover:scale-95 duration-200">
            {complainData.images?.length > 0 ? (
              <img src={complainData.images[0]?.secure_url} className="hover:border-[4px] hover:border-blue-300 rounded-[10px] duration-200" />
            ) : (
              <FaUserCircle size={56} />
            )}
          </div>

          <div className="text-white mb-1 flex md:text-[18px] text-[14px]">
            <SlCalender className="md:size-6 size-5" color="green" /> <span className="">Missing since: </span> {complainData.missingSince}
          </div>
          <p className="text-white flex justify-center">
            <CiLocationOn size={28} color="green" /> {complainData.Nationality}
          </p>
        </Link>
      )}
      </div>
}
    </div>
  );
};

export default FaceScanner;
