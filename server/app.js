import express from 'express'
import cors from 'cors'
import userRoute from './Routes/userRoute.js';
import bodyParser from 'body-parser'
import complainRoute from './Routes/complain.route.js';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import shareRouter from './Routes/share.routes.js';
import http from "http";
import { Server } from "socket.io";
import commentRoute from './Routes/comment.route.js';
import faceRoute from './Routes/face.route.js';

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
    origin:[process.env.FRONTEND_URL,"https://rescunet-01-org-5.onrender.com"],
    credentials:true,
} 
));

const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
  cors: {
    origin:["https://rescunet-01-org-5.onrender.com",process.env.FRONTEND_URL],
    methods: ["GET", "POST"],
    credentials: true 

  },
});
app.use(bodyParser.urlencoded({ extended: true }));//----> for backend se from ka data lena ke liye 

// Socket.io connection
io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);
       // Listen for a new case being reported
       socket.on("new-case-reported", (caseData) => {
        console.log("New case reported:"+caseData);
        io.emit("new-case", caseData); // Broadcast to all connected users

        
    });
    socket.on("get-case-particular",(caseData)=>{
      console.log("Get case Particluar "+caseData);
      io.emit("get-case-particular",caseData);
    })
    socket.on("new-comment",(commentData)=>{
      console.log("New Comment Added"+commentData);
      io.emit("new-comment",commentData);
    })
  
    socket.on("disconnect", () => {
      console.log("User Disconnected:", socket.id);
    });
  });

  // Store the Socket.io instance in `app`
app.set("io", io);
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRoute)
app.use('/complain',complainRoute)
app.use('/share',shareRouter)
app.use('/comment',commentRoute)
app.use('/face',faceRoute)
server.listen(3000, (e) => {
  if(e){
    console.log("Serevr not run ")
    process.exit()
  }
    console.log("🚀 Server running on http://localhost:3000");
  });
export default server;