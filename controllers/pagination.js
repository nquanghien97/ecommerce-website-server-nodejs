import Product from '../models/products.js';

export function paginationProduct (req, res, next) {
  const page = req.query.page || 1;
  const limit = req.query.limit || 5;

  Product.find()
    .skip((limit * page) - limit)
    .limit(limit)
    .exec((_err, products) => {
      Product.countDocuments((err, count) => {
        if (err)
          return next(err);
        res.status(200).json({
          success: true,
          message: "get product successfully",
          product: products,
          totalPages: Math.ceil(count / limit)
        });
      });
    });
}