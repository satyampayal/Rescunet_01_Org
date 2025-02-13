import express from 'express'
import { addFaceDescriptors } from '../controller/face.controller.js';
const faceRoute=express.Router();

faceRoute.post('/add',addFaceDescriptors)

export default faceRoute;