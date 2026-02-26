import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()} - ${file.originalname}`);
  },
});

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
 