import express from "express";
import Income from "../models/income.model.js";

// add income
export const addIncome = async (req, res) => {
  const userId = req.user._id;
  console.log(req.user);

  try {
    const {amount, source, icon, date} = req.body;
    if ((!amount || !source || !date)) {
      return res.status(400).json({ message: "All fields are required"});
    }
    const newIncome = new Income({
      userId,
      amount,
      source,
      icon,
      date: new Date(date)
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
        const getIncome = await Income.find({userId}).sort({date: -1});
        res.status(200).json(getIncome)

    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        })
    }
};

// download income
export const downloadIncomeExcel = (req, res) => {};

// delete  income
export const deleteIncome = (req, res) => {};
