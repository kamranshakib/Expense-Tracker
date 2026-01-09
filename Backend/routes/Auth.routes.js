import experss from "express";
const Router = experss.Router();
import * as authController from "../controller/auth.controller.js";
import { protect } from "../middleware/Auth.middleware.js";
import upload from "../middleware/Upload.middleware.js";

Router.get("/login", authController.loginUser);
Router.post("/register", authController.registerUser);
Router.get("/getUser", protect, authController.userInfo);

Router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded ",
    });
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads${
    req.file.filename
  }`;
  res.status(200).json({
    imageUrl,
  });
});

export default Router;
