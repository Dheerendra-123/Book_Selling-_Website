// models/Cart.js
import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true, 
  },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'BookForm' },
    },
  ],
});

export const cartModel = mongoose.model('Cart', CartSchema);
