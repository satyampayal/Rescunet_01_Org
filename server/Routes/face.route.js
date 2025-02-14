import express from 'express'
import { addFaceDescriptors, getAllFace } from '../controller/face.controller.js';
const faceRoute=express.Router();

faceRoute.post('/add',addFaceDescriptors)
faceRoute.get('/get',getAllFace)
export default faceRoute;