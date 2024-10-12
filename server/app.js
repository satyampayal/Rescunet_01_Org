import express from 'express'
import cors from 'cors'
import userRoute from './Routes/userRoute.js';
import bodyParser from 'body-parser'
const app=express();
app.use(express.json())
app.use(cors());
app.use(bodyParser.json())
app.use('/user',userRoute)

export default app;