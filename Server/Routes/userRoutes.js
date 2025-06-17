import express from 'express'
const router=express.Router();

import {signUpController,loginController} from '../Controller/userController.js'
import { Validation } from '../Middleware/Validation.js';

router.post('/signup',Validation,signUpController);
router.post('/login',loginController);


export default router;