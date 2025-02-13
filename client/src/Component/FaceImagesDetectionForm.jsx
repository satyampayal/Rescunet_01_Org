import React, { useState, useEffect } from "react";
import * as faceapi from "face-api.js";

const FaceImagesDetectionForm = () => {
    const [imageFile, setImageFile] = useState(null); // Store the uploaded file
    const [imagePreview, setImagePreview] = useState(null); // Store preview URL
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isLoadingModels, setIsLoadingModels] = useState(true);

    // Load face-api.js models
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

    // Handle file selection
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        setError("");
        setLoading(true);

        // Generate image preview URL
        const imgUrl = URL.createObjectURL(file);
        setImagePreview(imgUrl);
        setImageFile(file);

        // Wait for image to load before detecting face
        setTimeout(() => detectFace(imgUrl, file), 500);
    };

    // Detect if image has a face
    const detectFace = async (imgUrl, file) => {
        const img = new Image();
        img.src = imgUrl;
        img.onload = async () => {
            const detection = await faceapi.detectSingleFace(img)
                .withFaceLandmarks()
                .withFaceDescriptor();

            if (!detection) {
                setError("❌ No face detected! Please upload an image with a face.");
                setImagePreview(null);
                setImageFile(null);
            } else {
                console.log("✅ Face detected:", detection);
                await matchFace(file, detection); // Self-matching for testing
            }
            setLoading(false);
        };
    };

    // Match uploaded face with itself (Self-Testing)
    async function matchFace(file, detectedFace) {
        // Convert file to image for self-comparison
        const imgUrl = URL.createObjectURL(file);
        const img = new Image();
        img.src = imgUrl;
        img.onload = async () => {
            const detection2 = await faceapi.detectSingleFace(img)
                .withFaceLandmarks()
                .withFaceDescriptor();

            if (!detection2) {
                console.log("❌ Face not detected in self-matching test.");
                return;
            }

            const uploadedDescriptor = detectedFace.descriptor;
            const selfDescriptor = detection2.descriptor;

            const distance = faceapi.euclideanDistance(uploadedDescriptor, selfDescriptor);
            console.log(`🔍 Self-matching distance: ${distance}`);

            if (distance < 0.5) {
                console.log("✅ Self-match success! Image matches itself.");
            } else {
                console.log("❌ Self-match failed! Unexpected result.");
            }
        };
    }

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!imageFile) {
            setError("Please upload a valid image with a face.");
            return;
        }

        // Prepare form data
        const formData = new FormData();
        formData.append("image", imageFile); // Send actual file
        formData.append("complaintDetails", "Lost person details...");

        try {
            const response = await fetch("http://localhost:5000/api/complaints", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("✅ Complaint submitted successfully!");
            } else {
                throw new Error("Error submitting complaint.");
            }
        } catch (error) {
            setError("❌ Error submitting complaint.");
        }
    };

    return (
        <div>
            <h2>Report a Missing Person</h2>
            {isLoadingModels ? <p>Loading face detection models...</p> : null}
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {loading && <p>Checking image...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {imagePreview && <img src={imagePreview} alt="Preview" width="200" />}
            <button onClick={handleSubmit} disabled={!imageFile}>
                Submit Complaint
            </button>
        </div>
    );
};

export default FaceImagesDetectionForm;
