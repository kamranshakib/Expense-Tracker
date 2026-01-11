import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    icon: { type: String },
    amount: { type: Number, required: true },
    catagory: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
const Expense = mongoose.model("Expense", ExpenseSchema);
export default Expense;
