import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    // Find product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find or create cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [], totalAmount: 0 });
    }

    // Add or update item
    const existingItem = cart.items.find(item => 
      item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        price: product.price,
        name: product.name,
        imageUrl: product.imageUrl
      });
    }

    // Update total
    cart.totalAmount = cart.items.reduce(
      (total, item) => total + (item.price * item.quantity), 
      0
    );

    await cart.save();
    res.json({ success: true, items: cart.items, totalAmount: cart.totalAmount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => 
      item.product.toString() !== productId
    );
    cart.totalAmount = cart.items.reduce(
      (total, item) => total + (item.price * item.quantity), 
      0
    );

    await cart.save();
    res.json({ success: true, items: cart.items, totalAmount: cart.totalAmount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId });
    if (cart) {
      cart.items = [];
      cart.totalAmount = 0;
      await cart.save();
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId });
    res.json({ 
      success: true, 
      items: cart?.items || [], 
      totalAmount: cart?.totalAmount || 0 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

