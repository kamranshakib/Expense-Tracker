import multer from "multer";

// we no longer store files on disk; use memory storage so buffer is available.
const storage = multer.memoryStorage();

// file filter
const fileFilter = (req, file, cb) => {
  const allowdType = ["image/png", "image/jpg", "image/jpeg"];
  if (allowdType.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg , .png , .jpeg formats are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
 