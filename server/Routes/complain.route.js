import { Router } from "express";
import { complainRegister } from "../controller/complain.controller.js";
import upload from '../middleware/multer.middleware.js'
const complainRoute=Router();

complainRoute.post('/register',upload.array('images',5),complainRegister)


export default complainRoute;

