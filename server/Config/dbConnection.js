import mongoose from "mongoose";
import { config } from "dotenv";
config()

const connectedToDb=async ()=>{
try {
   await mongoose.connect(process.env.MONGODB_URI)
   console.log("Connected")
    
} catch (error) {
    console.log("Not Conneteed"+error)
    
}}

export default connectedToDb