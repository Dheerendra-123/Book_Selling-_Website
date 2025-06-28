import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookForm', // or Product
        required: true
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ],
  shippingAddress: {
    fullName: String,
    mobile: String,
    email: String,
    address: String,
    city: String,
    state: String,
    pincode: String
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'upi', 'cod'],
    required: true
  },

  totalAmount: {
    type: Number,
    required: true
  }
}, { timestamps: true });

export const OrderModel = mongoose.model('Order', orderSchema);
