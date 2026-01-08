import React, { useState } from 'react';
import Authlayout from '../../components/layouts/Authlayout';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  // handle login form submit
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please Enter a valid email address.');
      return
    }
    if (!password) {
      setError('Please Enter the Password');
      return
    }
    setError("")
    //  Login Api Call
  }
  return (
    <Authlayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Please enter your details to sign in
        </p>

        <form onSubmit={handleLogin}>
          <Input value={email} onChange={({ target }) => setEmail(target.value)}
            lable="Email Address"
            placeholder='xyz@gmail.com'
            type='text'
          />
          <Input value={password} onChange={({ target }) => setPassword(target.value)}
            lable="Password"
            placeholder='Min 8 Characters '
            type='password'
          />
          {error && <p className='text-red-500 text-xs  pb-2.5'>{error}</p>}
          <button type='submit' className='btn-primary'>
            LOGIN
          </button>
          <p className='text-[13px] text-slate-800  mt-3'>
            Don't have an account? {""}
            <Link className='font-medium text-primary underline' to='/signup'> 
              SignUp
            </Link>
          </p>
        </form>

      </div>
    </Authlayout>
  );
}

export default Login;