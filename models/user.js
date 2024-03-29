import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: { 
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
  role: {
    type: String,
    enum: ['admin', 'client'],
    default: 'client'
  },
}, { timestamps: true })

export default mongoose.model('user', userSchema)