import express from 'express'
import cors from 'cors'
import userRoute from './Routes/userRoute.js';
import bodyParser from 'body-parser'
import complainRoute from './Routes/complain.route.js';
import cookieParser from 'cookie-parser';
const app=express();
app.use(express.json())
app.use(cors());
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRoute)
app.use('/complain',complainRoute)

export default app;