import experss from "express";
const Router = experss.Router();
import * as authController from "../controller/auth.controller.js";
import { protect } from "../middleware/Auth.middleware.js";
import upload from "../middleware/Upload.middleware.js";
import multer from "multer";

Router.post("/login", authController.loginUser);
Router.post("/register", authController.registerUser);
Router.get("/getUser", protect, authController.userInfo);

Router.post(
  "/upload-image",
  (req, res, next) => {
    upload.single("image")(req, res, (error) => {
      if (error instanceof multer.MulterError) {
        const status = error.code === "LIMIT_FILE_SIZE" ? 413 : 400;
        return res.status(status).json({
          message:
            error.code === "LIMIT_FILE_SIZE"
              ? "Profile image must be 2 MB or smaller"
              : error.message,
        });
      }
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      next();
    });
  },
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    res.status(200).json({ imageUrl: `/uploads/${req.file.filename}` });
  }
);

export default Router;
