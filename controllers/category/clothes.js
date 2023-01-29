import Product from '../../models/products.js';

export function getAllClothes(req, res) {
  Product.find({category: "clothes"})
  .then((allProducts) => {
    return res.status(200).json({
      success: true,
      message: 'A list of all Clothes',
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
