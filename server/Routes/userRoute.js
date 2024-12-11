import express from "express";
import {login, register,userVerify,resetPassword, verifyResetPassword, logout,getReSetPasswordPage} from '../controller/UserController.js'
const userRoute = express.Router()
userRoute.post('/register',register)
userRoute.get('/verify/:userId/:uniqueString',userVerify)

userRoute.post('/login',login)
userRoute.get('/logout',logout)
userRoute.post('/reset/password',resetPassword)
userRoute.post('/reset/:userId/:uniqueString',verifyResetPassword)
userRoute.get('/reset/:userId/:uniqueString',getReSetPasswordPage)


export default userRoute