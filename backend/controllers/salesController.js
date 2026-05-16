const Sale = require('../models/Sale');
const Product = require('../models/Product');

exports.createSale = async (req, res) => {
  try {
    const { productId, quantitySold } = req.body;
    const qty = Number(quantitySold);

    if (!productId || !qty || qty < 1) {
      return res.status(400).json({ message: 'Product and valid quantity are required' });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.stock < qty) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }

    product.stock -= qty;
    await product.save();

    const sale = await Sale.create({
      product: product._id,
      productName: product.name,
      quantitySold: qty,
      totalPrice: product.price * qty
    });

    res.status(201).json({
      message: 'Sale recorded successfully',
      sale,
      updatedStock: product.stock
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSales = async (req, res) => {
  try {
    const sales = await Sale.find().sort({ createdAt: -1 });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};