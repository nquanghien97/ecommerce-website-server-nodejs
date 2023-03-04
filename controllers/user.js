import User from '../models/user.js';
import cloudinary from '../utils/cloudinary.js';

export async function getUser(req, res) {
  const { userId } = req.body;
  try{
    const user = await User.findById(userId);
    if(!user) {
      return res.status(400).json({
        success: false,
        message: "user does not exist",
      })
    }
    return res.status(200).json({
      success: true,
      message: "get user successfully",
      user: user,
    })
  } catch(err) {
    res.status(500).json({
      success: false,
      message: "User does not exist",
      error: err.message,
    })
  }
}

export async function updateUser(req, res) {
  const {userId, ...updateObject}  = req.body;
  // const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    let result
    if(!user.imageUrl) {
      result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "ecommerce-website/users",
        use_filename: true,
      });
    }
    if(req.file && user.imageUrl) {
      await cloudinary.v2.uploader.destroy(user.cloudinary_id);
      result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "ecommerce-website/users",
        use_filename: true,
      });
    }
    const data = {
      ...updateObject,
      imageUrl: result?.secure_url || user.imageUrl,
      cloudinary_id: result?.public_id || user.cloudinary_id
    }

    const newUserInfo = await User.findByIdAndUpdate(userId, data, {new: true})
    return res.status(200).json({
      success: true,
      message: 'Product is updated',
      user: newUserInfo
    });
  } catch(err) {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: err.message,
    });
  }
}