import express from "express";
import {login, register,userVerify,resetPassword, verifyResetPassword} from '../controller/UserController.js'
const userRoute = express.Router()
userRoute.post('/register',register)
userRoute.get('/verify/:userId/:uniqueString',userVerify)

userRoute.post('/login',login)

userRoute.post('/reset/password',resetPassword)
userRoute.post('/reset/:userId/:uniqueString',verifyResetPassword)


export default userRoute