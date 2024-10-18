import { Router } from "express";
import { complainRegister } from "../controller/complain.controller";

const route=Router();

route.post('/register',complainRegister)