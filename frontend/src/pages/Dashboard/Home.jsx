import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosinstance from '../../Utils/axiosInstance';
import { API_PATHS } from '../../Utils/apiPaths';
import InfoCard from '../../components/Cards/InfoCard';
import { addThousandsSeparatore } from '../../Utils/helper';

import { LuWalletMinimal, LuHandCoins } from 'react-icons/lu';
import { IoMdCard } from 'react-icons/io';

import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions';
import Last30DaysEpenses from '../../components/Dashboard/last30DaysEpenses';
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from '../../components/Dashboard/RecentIncome';
import RecentTransactions from "../../components/Dashboard/RecenetTransactions";

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState({
    totalBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
    recentTransactions: [],
    last30DaysExpenses: { transactions: [] },
    last60DaysIncome: { transactions: [] } // توجه: last60DaysIncome اضافه شد
  });

  const fetchDashboardData = async () => {
    try {
      const response = await axiosinstance.get(API_PATHS.DASHBOARD.GET_DATA);
      return response.data;
    } catch (error) {
      console.log("Dashboard fetch error:", error);
      return null;
    }
  };

  const loadDashboardData = async () => {
    try {
      const data = await fetchDashboardData();
      if (data) {
        setDashboardData({
          totalBalance: data.totalBalance || 0,
          totalIncome: data.totalIncome || 0,
          totalExpense: data.totalExpense || 0,
          recentTransactions: data.recentTransactions || [],
          last30DaysExpenses: data.last30DaysExpenses || { transactions: [] },
          last60DaysIncome: data.last60DaysIncome || { transactions: [] } // توجه: Income درست شد
        });
      }
    } catch (error) {
      console.log("Load dashboard error:", error);
    }
  };

  useEffect(() => {
    loadDashboardData();

    window.refreshDashboard = loadDashboardData;

    return () => {
      delete window.refreshDashboard;
    };
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'>

        {/* کارت‌های بالا */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeparatore(dashboardData.totalBalance)}
            color="bg-primary"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeparatore(dashboardData.totalIncome)}
            color="bg-orange-500"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandsSeparatore(dashboardData.totalExpense)}
            color="bg-red-500"
          />
        </div>

        {/* بخش داشبورد اصلی */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>

          <RecentTransactions
            transactions={dashboardData.recentTransactions || []}
            OnSeeMore={() => navigate("/expense")}
          />

          <FinanceOverview
            totalBalance={dashboardData.totalBalance}
            totalIncome={dashboardData.totalIncome}
            totalExpense={dashboardData.totalExpense}
          />

          <ExpenseTransactions
            transactions={dashboardData.last30DaysExpenses?.transactions || []}
            onSeeMore={() => navigate("/expense")}
          />

          <Last30DaysEpenses
            data={dashboardData.last30DaysExpenses?.transactions || []}
          />
          

          {/* ✅ اصلاح شده: داده Income داده می‌شود */}
          <RecentIncomeWithChart
            data={dashboardData.last60DaysIncome?.transactions?.slice(0, 4) || []}
            totalIncome={dashboardData.totalIncome}
          />

          <RecentIncome
            transactions={dashboardData.last60DaysIncome?.transactions || []}
            OnSeeMore={() => navigate("/income")}
          />

        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
