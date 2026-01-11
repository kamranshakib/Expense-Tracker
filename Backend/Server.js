import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import MongoDB from "./config/Db.config.js";
import authRoutes from "./routes/Auth.routes.js"
import incomeRoutes from "./routes/Incode.routes.js"
import expenseRoutes from "./routes/Expense.routes.js"
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use("/api/v1/income",incomeRoutes)
app.use("/api/v1/expense",expenseRoutes)
// uploads
app.use("/uploads",express.static(path.join(__dirname, "uploads")))

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
 