import Product from '../../../models/products.js';

export function getMaleProducts(req, res) {
  Product.find({gender: "male"})
  .then((allProducts) => {
    return res.status(200).json({
      success: true,
      message: 'A list of male Products',
      product: allProducts,
    });
  })
  .catch((err) => {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: err.message,
    });
  });
}
