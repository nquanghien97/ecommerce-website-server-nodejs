import Product from '../../models/products.js';

export function getSportProducts(req, res) {
  Product.find({type: "sport"})
  .then((products) => {
    return res.status(200).json({
      success: true,
      message: 'A list of sport Products',
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
