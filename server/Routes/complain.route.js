import { Router } from "express";
import { complainRegister, getAllComplain, updateComplain,getMyComplains,deleteComplainByUser, searchMissingPerson,getComaplinByComplainId } from "../controller/complain.controller.js";
import upload from '../middleware/multer.middleware.js'
import isLoggedIn from "../middleware/auth.middleware.js";
const complainRoute=Router();

complainRoute.post('/register',isLoggedIn,
    upload.array('images',5),
    complainRegister)
complainRoute.get('/get',getAllComplain)
complainRoute.get('/get/my',isLoggedIn,getMyComplains)
complainRoute.post('/update/:complainId',isLoggedIn,updateComplain)
complainRoute.delete('/delete/by/user/:postedBy/:postId',isLoggedIn,deleteComplainByUser)
complainRoute.get('/search',searchMissingPerson);
complainRoute.get('/get/:complainId',getComaplinByComplainId)
export default complainRoute;

