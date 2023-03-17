import Product from '../../../models/products.js';

export function getChildrenProducts(req, res) {
  Product.find({type: "children"})
  .then((products) => {
    return res.status(200).json({
      success: true,
      message: 'A list of children Products',
      product: products,
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