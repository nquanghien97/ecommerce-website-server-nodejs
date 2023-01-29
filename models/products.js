import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['new', 'old'],
    required: true,
  },
  gender: {
    type: String,
    enum: ['all', 'male', 'female'],
    required: true,
  },
  category: {
    type: String,
    enum: ['shoes', 'clothes']
  }
}, { timestamps: true })

export default mongoose.model('product', productSchema)