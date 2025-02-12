import * as faceapi from "face-api.js";
import { useEffect, useRef, useState } from "react";

const FaceRecognition = () => {
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadModels = async () => {
        const MODEL_URL = "http://localhost:5173"+ "/models"
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);

      setIsLoading(false);
    };

    loadModels();
  }, []);

  const handleImageUpload = async (event) => {
    const imageFile = event.target.files[0];
    if (!imageFile) return;

    const img = await faceapi.bufferToImage(imageFile);
    imageRef.current.src = URL.createObjectURL(imageFile);

    // Detect face
    const detections = await faceapi.detectSingleFace(img)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detections) {
      console.log("No face detected");
      return;
    }
    if(detections){
        console.log(detections)
    }

    // Draw detection on canvas
    const canvas = canvasRef.current;
    const displaySize = { width: img.width, height: img.height };
    faceapi.matchDimensions(canvas, displaySize);
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    faceapi.draw.drawDetections(canvas, resizedDetections);

    // Send face descriptor to backend for matching
//     fetch("/api/match-face", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ descriptor: detections.descriptor }),
//     })
//     .then((res) => res.json())
//     .then((data) => console.log("Match result:", data));
  };

  return (
    <div>
      {isLoading ? <p>Loading face recognition models...</p> : <p>Models Loaded!</p>}
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <img ref={imageRef} alt="Uploaded" style={{ width:"200px",height:'200px' }} />
      <canvas ref={canvasRef} style={{position:'absolute',top:'20px',left:'-70px'}} />
    </div>
  );
};

export default FaceRecognition;
