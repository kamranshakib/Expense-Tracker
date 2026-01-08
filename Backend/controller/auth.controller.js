import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register User
export const registerUser = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;
  // Validation: cheak user info
  if (!fullName || !email || !password) {
    res.status(400).json({
      message: "All filels are required",
    });
  }
  try {
    // cheak if user exist
    const existUser = await User.findOne({ email });
    if (existUser) {
      res.status(400).json({
        message: "Email already in use",
      });
    }
    // create user
    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });
    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({
      message: "Error registring user ",
      error: err.message,
    });
  }
};

// login  User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({
      message: "Error registring user ",
      error: err.message,
    });
  }
};

// user info
export const userInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(400).json({
        message: "User not fine",
      });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error registarin user",
      error: error.message,
    });
  }
};
