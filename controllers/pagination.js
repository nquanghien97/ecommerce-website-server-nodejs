import Product from '../models/products.js';

export function paginationProduct (req, res, next) {
  const perPage = 5;
  const page = req.query.page || 1;

  Product.find()
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((_err, products) => {
      Product.countDocuments((err, count) => {
        if (err)
          return next(err);
        res.status(200).json({
          success: true,
          message: "get product successfully",
          product: products,
          totalPages: Math.ceil(count / perPage)
        });
      });
    });
}