import User from '../../models/user.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

export async function registerUser(req, res) {
  const {username, password, fullName} = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing username or password"
    })
  }
  if(!fullName) {
    return res.status(400).json({
      success: false,
      message: "Missing fullName"
    })
  }
  try {
    const user = await User.findOne({username: username});
    if(user) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      })
    }
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({username, password: hashedPassword, fullName});
    await newUser.save();

    //return token
    const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET)

    res.status(200).json({
      success: true,
      message: "User created successfully",
      accessToken
    })
  } catch(err) {
      res.status(500).json({
        success: false,
        message: "Server error, please try again..",
        error: err.message,
      })
  }
}
