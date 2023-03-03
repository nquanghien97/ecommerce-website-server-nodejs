import User from '../../models/user.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

export async function loginUser(req, res) {
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing email or password"
    })
  }
  try {
    const user = await User.findOne({email});
    if(!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password"
      });
    }
    
    //email found
    const passwordValidated = await argon2.verify(user.password, password)
    if(!passwordValidated) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password"
      });
    }

    //all good -> return token
    const accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET)

    res.status(200).json({
      success: true,
      message: "Login successfully",
      fullName: user.fullName,
      role: user.role,
      userId: user._id,
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