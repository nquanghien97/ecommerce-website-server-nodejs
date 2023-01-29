import Trending from '../models/trending.js';
import mongoose from 'mongoose';

export function createTrending(req, res) {
  const trending = new Trending({
    _id: mongoose.Types.ObjectId(),
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
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

export function updateTrending(req, res) {
  const id = req.params.trendingId;
  const updateObject = req.body;
  Trending.updateOne({ _id: id }, { $set: updateObject })
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

export function deleteTrending(req, res) {
  const id = req.params.trendingId;
  Trending.findByIdAndDelete(id)
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