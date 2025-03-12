import Order from '../models/Order.js';
import Cart from '../models/Cart.js';

export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, totalAmount } = req.body;
    const userId = req.user?._id;

    // Create order
    const order = await Order.create({
      user: userId,
      items,
      shippingAddress,
      totalAmount
    });

    // Clear user's cart if authenticated
    if (userId) {
      await Cart.findOneAndUpdate(
        { user: userId },
        { $set: { items: [], totalAmount: 0 } }
      );
    }

    res.status(201).json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating order'
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let query = {};

    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("❌ Get Orders Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getUserOrders = async (req, res) => {
    try {
        // Get user ID from auth middleware
        const userId = req.user.id;
        
        console.log('Fetching orders for user:', userId);

        const orders = await Order.find({ user: userId })  // Changed userId to user
            .populate({
                path: 'items.product',
                select: 'name price image'
            })
            .sort({ createdAt: -1 });

        if (!orders.length) {
            return res.status(200).json({
                success: true,
                message: "No orders found",
                orders: []
            });
        }

        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });
    } catch (error) {
        console.error("❌ Get User Orders Error:", error);
        res.status(500).json({ 
            success: false,
            message: "Error fetching orders",
            error: error.message
        });
    }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus, paymentStatus } = req.body;

    // 🛒 Find the order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "❌ Order not found!",
      });
    }

    // 🔄 Update fields only if provided
    let updatedFields = {};
    if (orderStatus) {
      order.orderStatus = orderStatus;
      updatedFields.orderStatus = orderStatus;
    }
    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
      updatedFields.paymentStatus = paymentStatus;
    }

    // 📝 Save the updated order
    await order.save();

    // ✅ Success Response
    res.status(200).json({
      success: true,
      message: "✅ Order updated successfully!",
      updatedFields, // Only send updated fields in response
      order,
    });
  } catch (error) {
    console.error("❌ Update Order Error:", error);
    res.status(500).json({
      success: false,
      message: "⚠️ Server Error! Please try again later.",
      error: error.message, // Sending error message for debugging
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findByIdAndDelete(orderId);

    if (!order) return res.status(404).json({ message: "Order not found!" });

    res.status(200).json({ message: "Order deleted successfully!" });
  } catch (error) {
    console.error("❌ Delete Order Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
