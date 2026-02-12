import React, { useContext, useState } from 'react';
import Authlayout from '../../components/layouts/Authlayout';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { Link } from 'react-router-dom';
import axiosinstance from '../../Utils/axiosInstance';
import { API_PATHS } from '../../Utils/apiPaths';
import { UserContext } from '../../context/userContext';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setError("");

    try {
      console.log("Sending login request:", { email, password });

      const response = await axiosinstance.post(API_PATHS.AUTH.LOGIN, { email, password });

      console.log("Login response:", response.data);

      const { token, user } = response.data;

      if (token && user) {
        localStorage.setItem("token", token);
        updateUser(user);

        navigate("/dashboard");
      } else {
        setError("Login failed: invalid response from server.");
      }
    } catch (err) {
      console.error("Login error:", err);

      if (err.response) {
        if (err.response.status === 401) {
          setError("Unauthorized: Invalid email or password.");
        } else if (err.response.status === 500) {
          setError("Server error. Please try again later.");
        } else {
          setError(err.response.data.message || `Error: ${err.response.status}`);
        }
      } else if (err.request) {
        setError("No response from server. Check your network connection.");
      } else if (err.code === "ECONNABORTED") {
        setError("Request timeout. Please try again.");
      } else {
        setError(err.message || "Something went wrong. Please try again.");
      }
    }
  };

  return (
    <Authlayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Please enter your details to sign in
        </p>

        <form onSubmit={handleLogin}>
          <Input 
            value={email} 
            onChange={({ target }) => setEmail(target.value)}
            lable="Email Address"
            placeholder='xyz@gmail.com'
            type='text'
          />
          <Input 
            value={password} 
            onChange={({ target }) => setPassword(target.value)}
            lable="Password"
            placeholder='Min 8 Characters'
            type='password'
          />
          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
          <button type='submit' className='btn-primary'>
            LOGIN
          </button>
          <p className='text-[13px] text-slate-800 mt-3'>
            Don't have an account?{" "}
            <Link className='font-medium text-primary underline' to='/signup'>
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </Authlayout>
  );
};

export default Login;
