import express from 'express'
import { isAuthenticated } from '../Middleware/Authentication.js';
import {getBookDetailById, getBooks}  from '../Controller/dataController.js';
const router=express.Router();

router.get('/books',isAuthenticated,getBooks)
router.get('/books/:id',isAuthenticated,getBookDetailById)
export default router;