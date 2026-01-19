import express from "express";
import * as expense from "../controller/expense.controller.js";
import { protect } from "../middleware/Auth.middleware.js";
const Router = express.Router();

Router.post("/add", protect, expense.addExpense);
Router.get("/get", protect, expense.getAllExpense);
Router.delete("/:id", protect, expense.deleteExpense);
Router.get("/downloadexcel", protect, expense.downloadExpenseExcel);


export default Router;