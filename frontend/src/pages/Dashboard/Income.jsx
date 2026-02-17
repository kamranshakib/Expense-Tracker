import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import axiosinstance from '../../Utils/axiosInstance';
import { API_PATHS } from '../../Utils/apiPaths';
import Modal from "../../Modal";
import AddIncomeFrom from '../../components/Income/AddIncomeFrom';
import toast from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/DeleteAlert';
import CustomBarChart from '../../components/Chart/CustomBarChart';
import { prepareIncomeBarChartData } from '../../Utils/helper';

const Income = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  const fetchIncomeDetails = async () => {
    try {
      const response = await axiosinstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      if (response.data) setIncomeData(response.data);
    } catch (error) { console.log(error); }
  };

  const handleAddIncome = async (income) => {
    try {
      const response = await axiosinstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source: income.source.trim(),
        amount: Number(income.amount),
        date: income.date,
        icon: income.icon || "💰"
      });
      if (response.data) setIncomeData(prev => [response.data, ...prev]);
      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add income");
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axiosinstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setIncomeData(prev => prev.filter(item => item._id !== id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income deleted successfully");
    } catch (error) {
      toast.error("Failed to delete income");
    }
  };

  const calculateTotalIncome = () => incomeData.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  useEffect(() => { fetchIncomeDetails(); }, []);

  // داده برای Bar Chart
  const chartData = prepareIncomeBarChartData(incomeData);

  return (
    <DashboardLayout activeMenu="Income">
      <div className='my-5 mx-auto grid grid-cols-1 gap-6'>

        {/* Overview */}
        <div className='bg-white p-6 rounded-2xl shadow-md border border-gray-200/50'>
          <div className='flex justify-between items-center'>
            <div>
              <h3 className='text-lg font-semibold text-gray-800'>Income Overview</h3>
              <p className='text-sm text-gray-600'>
                Total Records: <span className='font-semibold text-purple-600'>{incomeData.length}</span>
              </p>
              <p className='text-sm text-gray-600'>
                Total Amount: <span className='font-semibold text-green-600'>${calculateTotalIncome()}</span>
              </p>
            </div>
            <button
              onClick={() => setOpenAddIncomeModal(true)}
              className='px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl flex items-center gap-2'>
              Add Income
            </button>
          </div>
        </div>

        {/* فقط Bar Chart */}
        {incomeData.length > 0 && (
          <div className='bg-white p-6 rounded-2xl shadow-md border border-gray-200/50'>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Income Over Time</h3>
            <CustomBarChart data={chartData} xDataKey="month" />
          </div>
        )}

        {/* Income List */}
        <IncomeList
          transactions={incomeData}
          onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
          onDownload={() => {}}
        />

        {/* Modals */}
        <Modal isOpen={openAddIncomeModal} onClose={() => setOpenAddIncomeModal(false)} title="Add New Income">
          <AddIncomeFrom onAddIncome={handleAddIncome} />
        </Modal>

        <Modal isOpen={openDeleteAlert.show} onClose={() => setOpenDeleteAlert({ show: false, data: null })} title="Delete Income">
          <DeleteAlert content="Are you sure?" onDelete={() => deleteIncome(openDeleteAlert.data)} />
        </Modal>

      </div>
    </DashboardLayout>
  );
};

export default Income;
