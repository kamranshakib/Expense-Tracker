import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register User
export const registerUser = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;
  const normalizedName = typeof fullName === "string" ? fullName.trim() : "";
  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  if (!normalizedName || !normalizedEmail || typeof password !== "string") {
    return res.status(400).json({
      message: "Full name, email, and password are required",
    });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return res.status(400).json({ message: "Please enter a valid email address" });
  }
  if (password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters" });
  }

  try {
    const existUser = await User.findOne({ email: normalizedEmail });
    if (existUser) {
      return res.status(409).json({
        message: "Email already in use",
      });
    }

    const user = await User.create({
      fullName: normalizedName,
      email: normalizedEmail,
      password,
      profileImageUrl: profileImageUrl || null,
    });
    const userData = user.toObject();
    delete userData.password;

    res.status(201).json({
      id: user._id,
      user: userData,
      token: generateToken(user._id),
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Email already in use" });
    }
    res.status(500).json({
      message: "Unable to register user",
    });
  }
};

// login  User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  try {
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    const user = await User.findOne({ email: normalizedEmail });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const userData = user.toObject();
    delete userData.password;
    res.status(200).json({
      id: user._id,
      user: userData,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({
      message: "Unable to log in",
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
