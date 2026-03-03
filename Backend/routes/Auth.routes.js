import experss from "express";
const Router = experss.Router();
import * as authController from "../controller/auth.controller.js";
import { protect } from "../middleware/Auth.middleware.js";
import upload from "../middleware/Upload.middleware.js";
import cloudinary from "../lib/cloudinary.js";

Router.post("/login", authController.loginUser);
Router.post("/register", authController.registerUser);
Router.get("/getUser", protect, authController.userInfo);

// upload to Cloudinary and return secure_url
Router.post(
  "/upload-image",
  upload.single("image"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {
      // convert buffer to base64 data URI
      const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
        "base64"
      )}`;

      const result = await cloudinary.uploader.upload(dataUri, {
        folder: "expense-tracker",
      });

      res.status(200).json({ imageUrl: result.secure_url });
    } catch (err) {
      console.error("Cloudinary upload error", err);
      res.status(500).json({ message: "Image upload failed" });
    }
  }
);

export default Router;
