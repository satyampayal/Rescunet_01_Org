import { Router } from "express";
import { complainRegister, getAllComplain, updateComplain } from "../controller/complain.controller.js";
import upload from '../middleware/multer.middleware.js'
import isLoggedIn from "../middleware/auth.middleware.js";
const complainRoute=Router();

complainRoute.post('/register',isLoggedIn,
    upload.array('images',5),
    complainRegister)
complainRoute.get('/get',getAllComplain)
complainRoute.post('/update/:complainId',isLoggedIn,updateComplain)

export default complainRoute;

