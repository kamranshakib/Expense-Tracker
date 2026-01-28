import React from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';

const Home = () => {
  useUserAuth();
  
  return (
<DashboardLayout activeMenu= "Dashboard">

    <div className='my-5 mx-auto'></div>
</DashboardLayout>
  );
}

export default Home;
