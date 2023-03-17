import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
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
    default: 'all',
    required: true,
  },
  type: {
    type: String,
    enum: ['children', 'sport', 'none'],
    default: 'none',
  },
  category: {
    type: String,
    enum: ['shoes', 'clothes']
  },
  cloudinary_id: {
    type: String,
  }
}, { timestamps: true })

export default mongoose.model('product', productSchema)