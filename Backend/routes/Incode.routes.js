import express from "express";
import * as income from "../controller/income.controller.js";
import { protect } from "../middleware/Auth.middleware.js";
const Router = express.Router();

Router.post("/add", protect, income.addIncome);
Router.get("/get", protect, income.getAllIncome);
Router.get("/downloadexcel", protect, income.downloadIncomeExcel);
Router.delete("/:id", protect, income.deleteIncome);


export default Router;