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


app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "uploads")),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });


app.post("/api/v1/auth/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  const imageUrl = `uploads/${req.file.filename}`;
  res.json({ imageUrl });
});


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes)
app.use("/api/v1/expense", expenseRoutes)
app.use("/api/v1/dashboard", dashboardRoutes)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
