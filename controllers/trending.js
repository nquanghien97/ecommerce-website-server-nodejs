import Trending from '../models/trending.js';
import mongoose from 'mongoose';
import cloudinary from '../utils/cloudinary.js';

export async function createTrending(req, res) {

  const result = await cloudinary.v2.uploader.upload(req.file.path, {
    folder: "ecommerce-website/trending",
    use_filename: true,
  })

  const trending = new Trending({
    _id: mongoose.Types.ObjectId(),
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
    name: req.body.name,
    imageUrl: result.secure_url,
    description: req.body.description,
    cloudinary_id: result.public_id,
  })

  return trending
    .save()
    .then((newTrending) => {
      return res.status(201).json({
        success: true,
        message: "created successfully",
        data: newTrending,
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

export function getAllTrending(req, res) {
  Trending.find()
  .then((allProducts) => {
    return res.status(200).json({
      success: true,
      message: 'A list of all Trending products',
      data: allProducts,
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

export function getTrending(req, res) {
  const id = req.params.trendingId;
  Trending.findById(id)
  .then((product) => {
    return res.status(200).json({
      success: true,
      message: "get Trending product successfully",
      data: product,
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

export async function updateTrending(req, res) {
  const id = req.params.trendingId;
  const updateObject = req.body;
  try {
    let product = await Trending.findById(id);
    let result
    if (req.file) {
      await cloudinary.v2.uploader.destroy(product.cloudinary_id);
      result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "ecommerce-website/trending",
        use_filename: true,
      });
    }
    const data = {
      ...updateObject,
      imageUrl: result?.secure_url || product.imageUrl,
      cloudinary_id: result?.public_id || product.cloudinary_id
    }
    console.log(req.file)
    product = await Trending.findByIdAndUpdate(id, data, { new: true });
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

export async function deleteTrending(req, res) {
  const id = req.params.trendingId;
  try {
    const product = await Trending.findById(id);
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