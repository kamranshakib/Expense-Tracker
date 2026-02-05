import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosinstance from '../../Utils/axiosInstance';
import { API_PATHS } from '../../Utils/apiPaths';
import InfoCard from '../../components/Cards/InfoCard';
import { addThousandsSeparatore } from '../../Utils/helper';

// ✅ اصلاح import آیکن‌ها
import { LuWalletMinimal, LuHandCoins } from 'react-icons/lu';
import { IoMdCard } from 'react-icons/io'; // این جدا import شود

// کامپوننت‌های دیگر...
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
    totalBalance: 1830,
    totalIncome: 1800,
    totalExpense: 1000,
    recentTransactions: [],
    last30DaysExpenses: { transactions: [] },
    last60DaysExpenses: { transactions: [] }
  });

  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosinstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      if (response.data) {
        setDashboardData(response.data)
      }
    } catch (error) {
      console.log("Something went wrong, Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => { };
  }, [])

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeparatore(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />
          <InfoCard
          
            icon={<LuWalletMinimal />} // ✅ حالا درست کار می‌کند
            label="Total Income"
            value={addThousandsSeparatore(dashboardData?.totalIncome || 0)}
            color="bg-orange-500"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandsSeparatore(dashboardData?.totalExpense || 0)}
            color="bg-red-500"
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentTransactions
            transactions={dashboardData?.recentTransactions || []}
            OnSeeMore={() => navigate("/expense")}
          />
          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />
          <ExpenseTransactions
            transactions={dashboardData?.last30DaysExpenses?.transactions || []}
            onSeeMore={() => navigate("/expense")}
          />
          <Last30DaysEpenses
            data={dashboardData?.last30DaysExpenses?.transactions || []}
          />
          <RecentIncomeWithChart
            data={dashboardData?.last60DaysExpenses?.transactions?.slice(0, 4) || []}
            totalIncome={dashboardData?.totalIncome || 0} 
          />
          <RecentIncome
            transactions={dashboardData?.last60DaysExpenses?.transactions || []}
            OnSeeMore={() => navigate("/income")} 
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Home;