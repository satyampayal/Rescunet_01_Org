import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

const FaceDetection = () => {
  const [image, setImage] = useState(null);
  const [faces, setFaces] = useState([]);
  const canvasRef = useRef(null);

  const loadModels = async () => {
    await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));

    const img = await faceapi.bufferToImage(file);
    const detections = await faceapi.detectAllFaces(img);
    setFaces(detections);

    const canvas = canvasRef.current;
    faceapi.matchDimensions(canvas, img);
    faceapi.draw.drawDetections(canvas, detections);
  };

  useEffect(() => {
    loadModels();
  }, []);

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      {image && <img src={image} alt="Uploaded" />}
      <canvas ref={canvasRef}></canvas>
      {faces.length > 0 && <p>{faces.length} faces detected!</p>}
    </div>
  );
};

export default FaceDetection;
