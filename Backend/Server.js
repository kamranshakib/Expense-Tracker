import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import MongoDB from "./config/Db.config.js";
import authRoutes from "./routes/Auth.routes.js"
dotenv.config();
const PORT = process.env.PORT || 5000;

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
app.use("/api/v1/auth",authRoutes)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
