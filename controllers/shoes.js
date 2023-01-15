import Shoes from '../models/shoes.js';
import mongoose from 'mongoose';

export function createShoes(req, res) {
  const shoes = new Shoes({
    _id: mongoose.Types.ObjectId(),
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
    name: req.body.name,
    avatar: req.body.avatar,
    price: req.body.price,
    status: req.body.status,
    description: req.body.description,
  })

  return shoes
    .save()
    .then((newShoes) => {
      return res.status(201).json({
        success: true,
        message: "A list of all Shoes",
        shoes: newShoes,
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

export function getAllShoes(req, res) {
  Shoes.find()
  .then((allShoes) => {
    return res.status(200).json({
      success: true,
      message: 'A list of all Shoes',
      shoes: allShoes,
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

export function getShoes(req, res) {
  const id = req.params.shoesId;
  Shoes.findById(id)
  .then((shoes) => {
    return res.status(200).json({
      success: true,
      message: "get Shoes successfully",
      shoes: shoes,
    })
  })
  .catch((err) => {
    res.status(500).json({
      success: false,
      message: "This shoes does not exist",
      error: err.message,
    })
  });
}

export function updateShoes(req, res) {
  const id = req.params.shoesId;
  const updateObject = req.body;
  Shoes.updateOne({ _id: id }, { $set: updateObject })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Shoes is updated',
        updateShoes: updateObject,
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

export function deleteShoes(req, res) {
  const id = req.params.shoesId;
  Shoes.findByIdAndDelete(id)
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Shoes is deleted successfully',
      });
    })
    .catch((err) => res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: err.message,
    }));
}