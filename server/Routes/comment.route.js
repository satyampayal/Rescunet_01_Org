import { Router } from "express";
import { addComment, deleteComment, editComment, getCommentsOfCase } from "../controller/comment.controller.js";
import isLoggedIn from "../middleware/auth.middleware.js";

const commentRoute=Router();

commentRoute.post('/add/:caseId/:userId',isLoggedIn,addComment)
commentRoute.get('/get/:caseId',getCommentsOfCase)
commentRoute.put('/edit/:caseId/:commentId/:userId',isLoggedIn,editComment)
commentRoute.delete('/delete/:caseId/:commentId/:userId',isLoggedIn,deleteComment)

export default commentRoute;