const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const lowStockProducts = await Product.countDocuments({ stock: { $lte: 5 } });
    const totalStock = await Product.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$stock' }
        }
      }
    ]);

    res.json({
      totalProducts,
      lowStockProducts,
      totalStock: totalStock.length > 0 ? totalStock[0].total : 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;