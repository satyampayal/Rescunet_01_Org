import { Router } from "express";
import { shareLog } from "../controller/share.controller.js";
import isLoggedIn from "../middleware/auth.middleware.js";

const shareRouter=Router();

shareRouter.post('/share-log',shareLog)

export default  shareRouter;