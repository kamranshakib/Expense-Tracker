import Income from "../models/income.model.js";
import Expense from "../models/Expense.model.js";
import { isValidObjectId, Types } from "mongoose";

// dashboard data
export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;
    const userObjectId = new Types.ObjectId(String(userId));

    // fetch total income
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // fetch total expense
    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // get income transactions in the last 60 days
    const last60DaysIncomeTransaction = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const incomeLast60Days = last60DaysIncomeTransaction.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // get expense transactions in the last 30 days
    const last30DaysExpenseTransaction = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const expenseTotal30Days = last30DaysExpenseTransaction.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // fetch last 5 income transactions
    const lastIncome = await Income.find({ userId })
      .sort({ date: -1 })
      .limit(5);

    const lastIncomeMapped = lastIncome.map(txn => ({
      ...txn.toObject(),
      type: "income",
    }));

    // fetch last 5 expense transactions
    const lastExpense = await Expense.find({ userId })
      .sort({ date: -1 })
      .limit(5);

    const lastExpenseMapped = lastExpense.map(txn => ({
      ...txn.toObject(),
      type: "expense",
    }));

    // combine and sort recent transactions
    const lastTransaction = [...lastIncomeMapped, ...lastExpenseMapped].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    // final response
    res.json({
      totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last30DaysExpenses: {
        total: expenseTotal30Days,
        transactions: last30DaysExpenseTransaction,
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransaction,
      },
      recentTransactions: lastTransaction,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};
