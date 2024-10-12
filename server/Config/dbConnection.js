import mongoose from "mongoose";

const connectedToDb=async ()=>{

try {
   await mongoose.connect("mongodb://localhost:27017/react-project-8-oct")
   console.log("Connected")
    
} catch (error) {
    console.log("Not Conneteed"+error)
    
}}

export default connectedToDb