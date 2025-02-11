import { Router } from "express";
import { addComment, deleteComment, editComment, getCommentsOfCase } from "../controller/comment.controller.js";
import isLoggedIn from "../middleware/auth.middleware.js";

const commentRoute=Router();

commentRoute.post('/add/:caseId/:userId',addComment)
commentRoute.get('/get/:caseId',getCommentsOfCase)
commentRoute.put('/edit/:caseId/:commentId/:userId',editComment)
commentRoute.delete('/delete/:caseId/:commentId/:userId',deleteComment)

export default commentRoute;