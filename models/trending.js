import mongoose from "mongoose";

const Schema = mongoose.Schema;

const trendingSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  cloudinary_id: {
    type: String,
  }
}, { timestamps: true })

export default mongoose.model('trending', trendingSchema)