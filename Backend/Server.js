// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import MongoDB from "./config/Db.config.js";
import authRoutes from "./routes/Auth.routes.js";
import incomeRoutes from './routes/Incode.routes.js'
import expenseRoutes from './routes/Expense.routes.js'
import dashboardRoutes from './routes/Dashboard.routes.js'
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import cloudinary from "./lib/cloudinary.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const PORT = process.env.PORT || 8000;

const app = express();
MongoDB();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// no more public uploads folder for static files

// configure multer to store in memory only
const upload = multer({ storage: multer.memoryStorage() });

// API-level upload route, sends file to Cloudinary
app.post(
  "/api/v1/auth/upload-image",
  upload.single("image"),
  async (req, res) => {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    try {
      const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
        "base64"
      )}`;
      const result = await cloudinary.uploader.upload(dataUri, {
        folder: "expense-tracker",
      });
      res.json({ imageUrl: result.secure_url });
    } catch (err) {
      console.error("upload error", err);
      res.status(500).json({ message: "Image upload failed" });
    }
  }
);


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes)
app.use("/api/v1/expense", expenseRoutes)
app.use("/api/v1/dashboard", dashboardRoutes)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
