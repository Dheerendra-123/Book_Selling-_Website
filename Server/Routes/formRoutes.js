import express from 'express'
import { isAuthenticated } from '../Middleware/Authentication.js';
import { formController } from '../Controller/formController.js';
import { upload } from '../Services/CloudinaryUpload.js';
const router=express.Router();

router.post('/sell',isAuthenticated, upload.single('image'),formController)

export default router;