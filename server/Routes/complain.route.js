import { Router } from "express";
import { complainRegister } from "../controller/complain.controller.js";
import upload from '../middleware/multer.middleware.js'
const complainRoute=Router();

complainRoute.post('/register',upload.single('images'),complainRegister)


export default complainRoute;

