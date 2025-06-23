import {cartModel} from '../Model/cartModel.js';

export const addToCart = async (req, res) => {
  const bookData = req.body; // full bookData object
  const productId = bookData._id;
  const userId = req.user.id;

  try {
    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      // Create new cart if it doesn't exist
      cart = new cartModel({
        userId,
        items: [{ productId }],
      });
    } else {
      // Check if item already in cart
      const alreadyExists = cart.items.find(
        item => item.productId.toString() === productId
      );

      if (alreadyExists) {
        return res.json({ message: 'Item already in cart' });
      }

      // Add to existing cart
      cart.items.push({ productId });
    }

    await cart.save();

    // Return updated cart with populated book details
    const updatedCart = await cartModel.findOne({ userId }).populate('items.productId');
    res.json(updatedCart);
    console.log("Cart Item Added:",updatedCart);
  } catch (error) {
    res.json({ message: 'Error adding to cart', error });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await cartModel.findOne({ userId: req.user.id }).populate('items.productId');
    if (!cart) return res.json({ items: [] });

    res.json(cart);
    // console.log("Cart Item Fetced->",cart);
  } catch (error) {
    res.json({ message: 'Error fetching cart', error });
  }
}

export const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    const userId = req.user.id; // or get from token/session if implemented

    const updatedCart = await cartModel.findOneAndUpdate(
      { userId },
      { $pull: { items: { _id: itemId } } },
      { new: true }
    );

    if (!updatedCart) {
      return res.json({ message: "Cart not found", success: false });
    }

    res.json({ message: "Item removed from cart successfully", success: true, cart: updatedCart });
    console.log("Item removed from cart successfully",updatedCart);
  } catch (error) {
    console.error("Error removing cart item:", error);
    res.json({ message: "Internal server error", success: false });
  }
};


export const clearCart=async(req,res)=>{

}