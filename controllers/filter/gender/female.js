import Product from '../../../models/products.js';

export function getFemaleProducts(req, res) {
  Product.find({gender: "female"})
  .then((allProducts) => {
    return res.status(200).json({
      success: true,
      message: 'A list of female Products',
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
