import Product from '../../models/products.js';

export function getAllShoes(req, res) {
  Product.find({category: "shoes"})
  .then((allProducts) => {
    return res.status(200).json({
      success: true,
      message: 'A list of all Shoes',
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
