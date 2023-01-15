import mongoose from "mongoose";

const Schema = mongoose.Schema;

const clothesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  avatar: {
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
  }
}, { timestamps: true })

export default mongoose.model('Clothes', clothesSchema)