import FaceData from "../model/face.model.js";


const addFaceDescriptors=async (req,res)=>{
    try {
        const { complainId, detections } = req.body;
        // console.log(req.body)

        if (!complainId || !detections) {
            return res.status(400).json({ message: "Missing required fields!" });
        }
    //     console.log(typeof(descriptors))
  //       console.log("Descriptors:", descriptors);
//console.log("Is Array:", Array.isArray(descriptors)); // Should return true
//console.log("First Element Type:", typeof descriptors[0]); // Should be 'number' or 'object'
//console.log("Nested Array Check:", Array.isArray(descriptors[0])); // If true, it's 2D
        const faceData = new FaceData({ complaintId:complainId, detections:detections });
        await faceData.save();

        res.status(200).json({ success: true, message: "Face descriptors stored successfully!",data:faceData });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

const getAllFace=async (req,res)=>{
    try {
        
        const data=await FaceData.find({});
        res.status(200).json({ success: true, message: "Faces get successfully!",data:data });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
        
    }
}
export {addFaceDescriptors,getAllFace}