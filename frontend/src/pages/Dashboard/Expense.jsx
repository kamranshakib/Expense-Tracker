import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { API_PATHS } from "../../Utils/apiPaths";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import toast from "react-hot-toast";
import axiosinstance from "../../Utils/axiosInstance";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import Modal from "../../Modal";
import ExpenseList from "../../components/Expense/ٍExpenseList";
import DeleteAlert from "../../components/DeleteAlert";

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  // ✅ Get all expenses
  const fetchExpenseDetails = async () => {
    try {
      const response = await axiosinstance.get(
        API_PATHS.EXPENSE.GET_ALL_EXPENSE
      );

      if (response?.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.log("Fetch expense error:", error);
      toast.error("Failed to load expenses");
    }
  };

  // ✅ Add expense
  const handleAddExpense = async (expense) => {
    const { catagory, amount, date, icon } = expense;

    if (!catagory?.trim()) {
      toast.error("Category is required");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Invalid amount");
      return;
    }

    if (!date) {
      toast.error("Date is required");
      return;
    }

    try {
      await axiosinstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        catagory,
        amount,
        date,
        icon,
      });

      toast.success("Expense added successfully");
      setOpenAddExpenseModal(false);

      await fetchExpenseDetails();

      // 🔥 refresh dashboard
      if (window.refreshDashboard) {
        window.refreshDashboard();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to add expense"
      );
    }
  };

  // ✅ Delete expense
  const deleteExpense = async (id) => {
    try {
      await axiosinstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

      toast.success("Expense deleted");
      setOpenDeleteAlert({ show: false, data: null });

      await fetchExpenseDetails();

      if (window.refreshDashboard) {
        window.refreshDashboard();
      }
    } catch (error) {
      toast.error("Failed to delete expense");
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto space-y-6">
        <ExpenseOverview
          transactions={expenseData || []}
          onExpenseIncome={() => setOpenAddExpenseModal(true)}
        />

        <ExpenseList
          transactions={expenseData || []}
          onDelete={(id) =>
            setOpenDeleteAlert({ show: true, data: id })
          }
          onDownload={() => {}}
        />

        {/* Add Modal */}
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm
            onAddExpense={handleAddExpense}
            onClose={() => setOpenAddExpenseModal(false)}
          />
        </Modal>

        {/* Delete Modal */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() =>
            setOpenDeleteAlert({ show: false, data: null })
          }
          title="Delete Expense"
        >
          <DeleteAlert
            contant="Are you sure?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
