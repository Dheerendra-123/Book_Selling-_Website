import { OrderModel } from "../Model/orderModel.js";



export const PostOrder=async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, isPaid, totalAmount } = req.body;

    const newOrder = new OrderModel({
      user: req.user._id,
      items,
      shippingAddress,
      paymentMethod,
      isPaid,
      totalAmount,
      paidAt: isPaid ? Date.now() : null
    });

    const savedOrder = await newOrder.save();
    res.json(savedOrder);
    console.log("Order Saved",savedOrder)
  } catch (err) {
    res.json({ errormessage: 'Order creation failed', error: err.message });
  }
};


export const getOrders= async (req, res) => {
  try {
    const orders = await OrderModel.find({ user: req.user._id }).populate('items.product');
    res.json(orders);
  } catch (err) {
    res.json({ message: 'Failed to fetch orders',error:err.message });
  }
};
