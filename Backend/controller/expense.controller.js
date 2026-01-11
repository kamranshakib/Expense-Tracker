import xlsx from "xlsx";
import Expense from "../models/Expense.model.js";

// add Expense
export const addExpense = async (req, res) => {
  const userId = req.user._id;

  try {
    const { amount, catagory, icon, date } = req.body;
    if (!amount || !catagory || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newExpense = new Expense({
      userId,
      amount,
      catagory,
      icon,
      date: new Date(date),
    });
    await newExpense.save();
    res.status(200).json({
      newExpense,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// get all  Expense
export const getAllExpense = async (req, res) => {
  const userId = req.user._id;
  try {
    const getExpense = await Expense.find({ userId }).sort({ date: -1 });
    res.status(200).json(getExpense);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// delete  Expense
export const deleteExpense = async (req, res) => {
  try {
    const deleteExpense = await Expense.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Expense deleted Successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Server Error ",
    });
  }
};

// download Expense
export const downloadExpenseExcel = async (req, res) => {
  const userId = req.user._id;
  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    const data = expense.map((item) => ({
      Catagory: item.catagory,
      Amount: item.amount,
      Date: item.date ? item.date.toISOString().split("T")[0] : "",
    }));
    const workSheet = xlsx.utils.json_to_sheet(data);
    const workBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workBook, workSheet, "Expense");
    xlsx.writeFile(workBook, "expense_details.xlsx");
    res.download("expense_details.xlsx");
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
