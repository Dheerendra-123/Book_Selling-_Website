import express from 'express'
import { isAuthenticated } from '../Middleware/Authentication.js';
import {getBookDetailById, getBooks}  from '../Controller/dataController.js';
import { addToCart, clearCart, getCart, removeFromCart } from '../Controller/cartController.js';
import { addToWishList, getWishlist, removeWishlist } from '../Controller/wishlistController.js';
const router=express.Router();

router.get('/books',isAuthenticated,getBooks)
router.get('/books/:id',isAuthenticated,getBookDetailById)
router.get('/cart', isAuthenticated, getCart);
router.post('/cart', isAuthenticated, addToCart);
router.delete('/cart/:id', isAuthenticated, removeFromCart);
router.delete('/cart', isAuthenticated, clearCart); // Optional
router.post('/wishlist/add',isAuthenticated,addToWishList)
router.get('/wishlist',isAuthenticated,getWishlist)
router.delete('/wishlist/remove',isAuthenticated,removeWishlist)
export default router;