import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import axiosinstance from '../../Utils/axiosInstance';
import { API_PATHS } from '../../Utils/apiPaths';
import Modal from "../../Modal";
import AddIncomeFrom from '../../components/Income/AddIncomeFrom';
import toast from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/DeleteAlert';

const Income = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosinstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );

      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    if (!source?.trim()) {
      toast.error("Source is required.");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0.");
      return;
    }

    if (!date) {
      toast.error("Date is required.");
      return;
    }

    try {
      const response = await axiosinstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source: source.trim(),
        amount: Number(amount),
        date,
        icon: icon || "💰",
      });

      if (response.data) {
        setIncomeData(prevData => [response.data, ...prevData]);
        setOpenAddIncomeModal(false);
        toast.success("Income added successfully");
        
        console.log("🔄 Trying to refresh dashboard...");
        
        if (window.refreshDashboard) {
          console.log("Calling window.refreshDashboard()");
          window.refreshDashboard();
        } else {
          console.log("window.refreshDashboard not found");
          
          console.log("🔄 Reloading page...");
          window.location.reload();
        }
      }

    } catch (error) {
      console.error("Error adding income:", error);
      toast.error(error.response?.data?.message || "Failed to add income");
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axiosinstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      
      setIncomeData(prevData => prevData.filter(item => item._id !== id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income deleted successfully");
      
      // رفرش کردن دشبورد
      console.log("🔄 Trying to refresh dashboard...");
      
      if (window.refreshDashboard) {
        console.log("✅ Calling window.refreshDashboard()");
        window.refreshDashboard();
      } else {
        console.log("❌ window.refreshDashboard not found");
        console.log("🔄 Reloading page...");
        window.location.reload();
      }
      
    } catch (error) {
      console.error("Error deleting income:", error);
      toast.error("Failed to delete income");
    }
  };

  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosinstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
        {
          responseType: 'blob',
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `income_${new Date().toISOString().split('T')[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Income details downloaded successfully");
      
    } catch (error) {
      console.error("Error downloading income details:", error);
      toast.error("Failed to download income details");
    }
  };

  const calculateTotalIncome = () => {
    return incomeData.reduce((sum, item) => sum + (item.amount || 0), 0);
  };

  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className='bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50'>
            <div className='flex justify-between items-center'>
              <div>
                <h3 className='text-lg font-semibold text-gray-800'>Income Overview</h3>
                {incomeData.length > 0 && (
                  <div className='mt-2'>
                    <p className='text-sm text-gray-600'>
                      Total Records: <span className='font-semibold text-purple-600'>{incomeData.length}</span>
                    </p>
                    <p className='text-sm text-gray-600'>
                      Total Amount: <span className='font-semibold text-green-600'>
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(calculateTotalIncome())}
                      </span>
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setOpenAddIncomeModal(true)}
                className='px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl 
                         hover:from-purple-700 hover:to-purple-800 transition-all duration-200 
                         shadow-lg shadow-purple-200 font-medium flex items-center gap-2'
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Income
              </button>
            </div>

            {incomeData.length === 0 && (
              <p className='text-gray-500 mt-4 text-sm'>
                ✨ No income records yet. Click "Add Income" to track your earnings.
              </p>
            )}
          </div>

          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add New Income"
        >
          <AddIncomeFrom onAddIncome={handleAddIncome} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income record? This action cannot be undone."
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;