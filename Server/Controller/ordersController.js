import { formModel } from "../Model/formModel.js";
import { OrderModel } from "../Model/orderModel.js";



export const PostOrder=async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod,totalAmount } = req.body;
       const bookIds = items.map(item => item.product);
    const orderedBooks = await formModel.find({ _id: { $in: bookIds }, isOrdered: true });

    if (orderedBooks.length > 0) {
      return res.json({ message: "Some books are already sold", books: orderedBooks });
    }

    const newOrder = new OrderModel({
      user: req.user._id,
      items,
      shippingAddress,
      paymentMethod,
      totalAmount,
    });

    const savedOrder = await newOrder.save();
    res.json(savedOrder);
       await Promise.all(
      bookIds.map(id => formModel.findByIdAndUpdate(id, { isOrdered: true }))
    );

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
