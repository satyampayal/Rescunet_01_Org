import app from "./app.js";
import connectedToDb from "./Config/dbConnection.js";
import { config } from 'dotenv';
import {v2} from 'cloudinary'
const PORT=3000;

connectedToDb();
config()
v2.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,

});
// app.listen(PORT,(e)=>{
//     if(e){
//         console.log("Not Coonected"+e)
//     }else console.log("Server is Run on "+PORT)
// })
