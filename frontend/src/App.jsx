import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";

const App = () => {
  return (
    <div>
      <BrowserRouter>
       <Routes>
       <Route path="/" element={<Root/>} />
       <Route path="/login" exact element={<Login/>} />
       <Route path="/signup" exact element={<SignUp/>} />
       <Route path="/dashboard" exact element={<Home/>} />
      <Route path="/income" element={<Income />} />
       <Route path="/expense" element={<Expense />} />
       </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;

const Root = ()=>   {
  const isAuthenticated = !! localStorage.getItem("token");
  
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};