import Product from '../models/products.js';

export function searchProduct(req, res) {
  const searchName = new RegExp(req.query.name, 'i');
  Product.find({name: searchName})
  .then((data) => {
    return res.status(200).json({
      success: true,
      message: 'successfully',
      data: data,
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