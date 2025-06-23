

import {wishlistModel} from '../Model/wishlist.js'

export const addToWishList=async(req,res)=>{
 const { bookId } = req.body;
  const userId = req.user.id;

  let wishlist = await wishlistModel.findOne({ userId });
  if (!wishlist) wishlist = new wishlistModel({ userId, books: [] });

  if (!wishlist.books.includes(bookId)) {
    wishlist.books.push(bookId);
    await wishlist.save();
    res.json({ success: true, message: 'Added to wishlist' });
    console.log("Item added to wishlist",wishlist);
  } else {
    res.json({ message: 'Item already in wishlist' });
  }
}

export const getWishlist=async(req,res)=>{
  const wishlist = await wishlistModel.findOne({ userId: req.user.id }).populate('books');
  res.json(wishlist?.books || []);
}

export const removeWishlist = async (req, res) => {
  const { bookId } = req.body;

  if (!bookId) {
    return res.json({ success: false, message: "No bookId provided" });
  }

  await wishlistModel.updateOne(
    { userId: req.user.id },
    { $pull: { books: bookId } }
  );

  console.log(`✅ Book with ID ${bookId} deleted from wishlist of user ${req.user.id}`);
  res.json({ success: true, message: `Removed book ${bookId} from wishlist` });
};