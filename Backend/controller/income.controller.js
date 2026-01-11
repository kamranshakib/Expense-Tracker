import xlsx from "xlsx";
import Income from "../models/income.model.js";

// add income
export const addIncome = async (req, res) => {
  const userId = req.user._id;
  console.log(req.user);

  try {
    const { amount, source, icon, date } = req.body;
    if (!amount || !source || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newIncome = new Income({
      userId,
      amount,
      source,
      icon,
      date: new Date(date),
    });
    await newIncome.save();
    res.status(200).json({
      newIncome,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// get all  income
export const getAllIncome = async (req, res) => {
  const userId = req.user._id;
  try {
    const getIncome = await Income.find({ userId }).sort({ date: -1 });
    res.status(200).json(getIncome);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// delete  income
export const deleteIncome = async (req, res) => {
  try {
    const deleteIncome = await Income.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Income deleted Successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Server Error ",
    });
  }
};

// download income
export const downloadIncomeExcel = async (req, res) => {
  const userId = req.user._id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    const date = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date,
    }));
    const workSheet = xlsx.utils.json_to_sheet(date);
    const workBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workBook, workSheet, "Icnome");
    xlsx.writeFile(workBook, "icnome_details.xlsx");
    res.download("icnome_details.xlsx");
  } catch (error) {
    res.status(500).josn({
      message: "Server Error"
    })
  }
};
  