import express from 'express'
import { isAuthenticated } from '../Middleware/Authentication.js';
import {getBookDetailById, getBooks}  from '../Controller/dataController.js';
import { addToCart, getCart } from '../Controller/cartController.js';
const router=express.Router();

router.get('/books',isAuthenticated,getBooks)
router.get('/books/:id',isAuthenticated,getBookDetailById)
router.get('/cart', isAuthenticated, getCart);
router.post('/cart', isAuthenticated, addToCart);
// router.delete('/cart/:productId', isAuthenticated, removeFromCart);
// router.delete('/cart', isAuthenticated, clearCart); // Optional
export default router;