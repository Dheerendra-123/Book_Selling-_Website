import express from 'express'
import { isAuthenticated } from '../Middleware/Authentication.js';
import { formController } from '../Controller/formController.js';
import { upload } from '../Services/CloudinaryUpload.js';
const router=express.Router();

router.post('/sell-form',isAuthenticated, upload.array('images', 4),formController)

export default router;