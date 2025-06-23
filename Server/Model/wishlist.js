import mongoose from "mongoose"

const wishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BookForm' }]
});


export const wishlistModel=mongoose.model("Wishlist",wishlistSchema);