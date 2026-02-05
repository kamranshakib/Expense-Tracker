import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { data } from 'react-router-dom';
import axiosinstance from '../../Utils/axiosInstance';
import { API_PATHS } from '../../Utils/apiPaths';
import Modal from "../../Modal"

const Income = () => {

const [incomeData,setIncomeData] = useState([]);
const [loading, setLoading] = useState(false);
const [openDeleteAlert, setOpenDeleteAlert] = useState({
  show: false,
  data: null,
});
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)



    // GEt All Income Details
    const fetchIncomeDetails = async () => {
      if(loading) return;
      setLoading(true)

      try{
        const response = await axiosinstance.get(
          `${API_PATHS.INCOME.GET_ALL_INCOME}`
        );

        if(response.data){
          setIncomeData(response.data);
        }
    } catch (error){ 
      console.log("Something wentwrong. Please try again.", error);
    } finally{
      setLoading(false);
    }
    };


    // Handel Add Income

    const HandelAddIncome = async (income)=> {};

    // Delete  Income

    const deleteIncome = async (id) => {};

    // hanel doownload income details

    const handleDownloadIncomeDetails = async () => {};


    useEffect (()=> {
      fetchIncomeDetails();
      return () => {};
    }, [])

  return (
    <DashboardLayout activeMenu="Income">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className='bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-lg font-semibold'>Income Overview</h3>
            
              <button
                onClick={() => setOpenAddIncomeModal(true)}
                className='px-4 '
              >
                Add Income
              </button>
            </div>
            
            {incomeData.length > 0 ? (
              <div>
                <p>Total Income Records: {incomeData.length}</p>
              </div>
            ) : (
              <p className='text-gray-500'>Track earning over time and analyze  your income trends</p>
            )}
          </div>
        </div>
        <Modal
          isOpen={openAddIncomeModal}
          onClose={()=> setOpenAddIncomeModal(false)}
          title= "Add Income"
        >
          <div></div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default Income;