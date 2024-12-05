import express from 'express'
import cors from 'cors'
import userRoute from './Routes/userRoute.js';
import bodyParser from 'body-parser'
import complainRoute from './Routes/complain.route.js';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
// import path for make depolyement easy--- start
// import path from 'path';
// import { fileURLToPath } from "url";
// import path for make depolyement easy--- end
config();
const app=express();

// -------------Deployment Start  ---------------------
// const _filename=fileURLToPath(import.meta.url);
// const __dirname=path.dirname(_filename);
// console.log(__dirname);
//  app.use(express.static(path.join(__dirname,'../client/dist')));
// // // render cliient 
// app.get('*',(req,res)=>{
//     res.sendFile(path.join(__dirname,'../client/dist/index.html'))
// })
// -------------Deployment  End ---------------------
app.use(express.json())
app.use(cors(
    {
    origin:[process.env.FRONTEND_URL,"https://rescunet-01-org-4.onrender.com"],
    credentials:true,
} 
));
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRoute)
app.use('/complain',complainRoute)

export default app;