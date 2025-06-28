import express from 'express'
import { isAuthenticated } from '../Middleware/Authentication.js';
import {getBookDetailById, getBooks, getBooksByUser}  from '../Controller/dataController.js';
import { addToCart, clearCart, getCart, removeFromCart } from '../Controller/cartController.js';
import { addToWishList, getWishlist, removeWishlist } from '../Controller/wishlistController.js';
import { getOrders, PostOrder } from '../Controller/ordersController.js';
const router=express.Router();

router.get('/books',isAuthenticated,getBooks);
router.get('/books/listed',isAuthenticated,getBooksByUser);
router.get('/books/:id',isAuthenticated,getBookDetailById);
router.get('/cart', isAuthenticated, getCart);
router.post('/cart', isAuthenticated, addToCart);
router.delete('/cart/:id', isAuthenticated, removeFromCart);
router.delete('/cart', isAuthenticated, clearCart); // Optional
router.post('/wishlist/add',isAuthenticated,addToWishList);
router.get('/wishlist',isAuthenticated,getWishlist);
router.delete('/wishlist/remove',isAuthenticated,removeWishlist);
router.post('/orders',isAuthenticated,PostOrder);
router.get('/orders',isAuthenticated,getOrders);
export default router;