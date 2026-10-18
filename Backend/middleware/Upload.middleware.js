import multer from "multer";
import { randomUUID } from "node:crypto";
import { uploadsDirectory } from "../lib/uploads.js";

const extensionsByMimeType = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
};

const storage = multer.diskStorage({
  destination: uploadsDirectory,
  filename: (req, file, callback) => {
    callback(null, `${randomUUID()}${extensionsByMimeType[file.mimetype]}`);
  },
});

const fileFilter = (req, file, callback) => {
  if (extensionsByMimeType[file.mimetype]) {
    callback(null, true);
  } else {
    callback(new Error("Only JPG and PNG images are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});

export default upload;
