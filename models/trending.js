import mongoose from "mongoose";

const Schema = mongoose.Schema;

const trendingSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, { timestamps: true })

export default mongoose.model('trending', trendingSchema)