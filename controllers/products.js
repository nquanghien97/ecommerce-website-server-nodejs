import Product from '../models/products.js';
import mongoose from 'mongoose';

export function createProduct(req, res) {
  const product = new Product({
    _id: mongoose.Types.ObjectId(),
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    status: req.body.status,
    description: req.body.description,
    gender: req.body.gender,
    category: req.body.category,
  })

  return product
    .save()
    .then((newProduct) => {
      return res.status(201).json({
        success: true,
        message: "A list of all Product",
        product: newProduct,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error, please try again..",
        error: err.message,
      })
    });
}

export function getAllProducts(req, res) {
  Product.find()
  .then((allProducts) => {
    return res.status(200).json({
      success: true,
      message: 'A list of all Products',
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

export function getProduct(req, res) {
  const id = req.params.productId;
  Product.findById(id)
  .then((product) => {
    return res.status(200).json({
      success: true,
      message: "get product successfully",
      product: product,
    })
  })
  .catch((err) => {
    res.status(500).json({
      success: false,
      message: "This product does not exist",
      error: err.message,
    })
  });
}

export function updateProduct(req, res) {
  const id = req.params.productId;
  const updateObject = req.body;
  Product.updateOne({ _id: id }, { $set: updateObject })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Product is updated',
        updateProduct: updateObject,
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

export function deleteProduct(req, res) {
  const id = req.params.productId;
  Product.findByIdAndDelete(id)
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Product is deleted successfully',
      });
    })
    .catch((err) => res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: err.message,
    }));
}