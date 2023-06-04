import Product from '../models/products.js';
import mongoose from 'mongoose';
import cloudinary from '../utils/cloudinary.js';

export async function createProduct(req, res) {
  
  const result = await cloudinary.v2.uploader.upload(req.file.path, {
    folder: "ecommerce-website/products",
    use_filename: true,
  })

  const product = new Product({
    _id: mongoose.Types.ObjectId(),
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
    name: req.body.name,
    imageUrl: result.secure_url,
    price: req.body.price,
    status: req.body.status,
    description: req.body.description,
    detail: req.body.detail,
    gender: req.body.gender,
    type: req.body.type,
    category: req.body.category,
    cloudinary_id: result.public_id,
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

export async function updateProduct(req, res) {
  const id = req.params.productId;
  const updateObject = req.body;
  try {
    let product = await Product.findById(id);
    let result
    if (req.file) {
      await cloudinary.v2.uploader.destroy(product.cloudinary_id);
      result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "ecommerce-website/products",
        use_filename: true,
      });
    }
    const data = {
      ...updateObject,
      imageUrl: result?.secure_url || product.imageUrl,
      cloudinary_id: result?.public_id || product.cloudinary_id
    }
    product = await Product.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json({
      success: true,
      message: 'Product is updated',
      updateProduct: product,
    });
  }
  catch(err) {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: err.message,
    });
  }
}

export async function deleteProduct(req, res) {
  const id = req.params.productId;
  try {
    const product = await Product.findById(id);
    await cloudinary.v2.uploader.destroy(product.cloudinary_id)
    await product.remove();
    res.status(200).json({
      success: true,
      message: 'Product is deleted successfully',
    });
  } catch (err) {
      res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: err.message,
    })
  }
}