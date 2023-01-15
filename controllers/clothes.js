import Clothes from '../models/clothes.js';
import mongoose from 'mongoose';

export function createClothes(req, res) {
  const clothes = new Clothes({
    _id: mongoose.Types.ObjectId(),
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
    name: req.body.name,
    avatar: req.body.avatar,
    price: req.body.price,
    description: req.body.description,
  })

  return clothes
    .save()
    .then((newClothes) => {
      return res.status(201).json({
        success: true,
        message: "A list of all Clothes",
        clothes: newClothes,
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

export function getAllClothes(req, res) {
  Clothes.find()
  .then((allClothes) => {
    return res.status(200).json({
      success: true,
      message: 'A list of all Clothes',
      clothes: allClothes,
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

export function getClothes(req, res) {
  const id = req.params.ClothesId;
  Clothes.findById(id)
  .then((clothes) => {
    return res.status(200).json({
      success: true,
      message: "get Clothes successfully",
      clothes: clothes,
    })
  })
  .catch((err) => {
    res.status(500).json({
      success: false,
      message: "This clothes does not exist",
      error: err.message,
    })
  });
}

export function updateClothes(req, res) {
  const id = req.params.clothesId;
  const updateObject = req.body;
  Clothes.updateOne({ _id: id }, { $set: updateObject })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Clothes is updated',
        updateClothes: updateObject,
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

export function deleteClothes(req, res) {
  const id = req.params.clothesId;
  Clothes.findByIdAndDelete(id)
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Clothes is deleted successfully',
      });
    })
    .catch((err) => res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: err.message,
    }));
}