import { cartModel } from "../Model/cartModel.js";

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
        (item) => item.productId.toString() === productId
      );

      if (alreadyExists) {
        return res.json({ message: "Item already in cart" });
      }

      // Add to existing cart
      cart.items.push({ productId });
    }

    await cart.save();

    // Return updated cart with populated book details
    const updatedCart = await cartModel
      .findOne({ userId })
      .populate("items.productId");
    res.json(updatedCart);
    console.log("Cart Item Added:", updatedCart);
  } catch (error) {
    res.json({ message: "Error adding to cart", error });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await cartModel
      .findOne({ userId: req.user.id })
      .populate("items.productId");
    if (!cart) return res.json({ items: [] });

    res.json(cart);
    // console.log("Cart Item Fetced->",cart);
  } catch (error) {
    res.json({ message: "Error fetching cart", error });
  }
};

import mongoose from 'mongoose';

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body; // 👈 now expecting BookForm ID
    const userId = req.user.id;

    const updatedCart = await cartModel.findOneAndUpdate(
      { userId },
      {
        $pull: {
          items: { productId: new mongoose.Types.ObjectId(productId) } // ✅ pull by productId
        }
      },
      { new: true }
    ).populate("items.productId"); // ✅ repopulate cart with book details

    if (!updatedCart) {
      return res.json({ success: false, message: "Cart not found" });
    }

    console.log(`Product ${productId} removed from cart of user ${userId}`);

    res.json({
      success: true,
      message: "Item removed from cart successfully",
      cart: updatedCart,
    });

  } catch (error) {
    console.error("Error removing cart item:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const clearCart = async (req, res) => {};
