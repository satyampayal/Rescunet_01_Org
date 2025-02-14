import mongoose from "mongoose";

const faceSchema=new mongoose.Schema({
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Link to User
    complaintId: { type: mongoose.Schema.Types.ObjectId, ref: 'Complain' }, // Link to Complaint
    // faceDescriptor: {
    //     type: Map,
    //     of: Number, // Each key-value pair (index and number) represents the feature vector
    //     required: true,
    //   },
    faceDescriptor:{type:[Number]},
    detections:[],
    createdAt: { type: Date, default: Date.now }
})

const  FaceData = mongoose.model('FaceData', faceSchema);

export default FaceData;