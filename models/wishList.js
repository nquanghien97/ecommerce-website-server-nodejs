import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ItemSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    }
  },
  {
    timestamps: true,
  }
);

const wishListSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  wishLists: [ItemSchema]
}, { timestamps: true })

export default mongoose.model('wishList', wishListSchema)