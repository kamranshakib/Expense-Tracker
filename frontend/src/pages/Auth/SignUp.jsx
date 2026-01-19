import React, { useContext, useState } from 'react';
import Authlayout from '../../components/layouts/Authlayout';
import Input from '../../components/Inputs/Input';
import { Link, useNavigate } from 'react-router-dom';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosinstance from '../../Utils/axiosInstance';
import { API_PATHS } from '../../Utils/apiPaths';
import { UserContext } from '../../context/userContext';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setError('Please enter the Password');
      return;
    }

    setError("");

    try {
      const response = await axiosinstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
        window.location.reload();
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <Authlayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector
            image={profilePic}
            setImage={setProfilePic}
          />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              value={fullName}
              onChange={({ target }) => {
                setFullName(target.value);
                if (error) setError(null);
              }}
              lable="Full Name"
              placeholder='John'
              type='text'
            />

            <Input
              value={email}
              onChange={({ target }) => {
                setEmail(target.value);
                if (error) setError(null);
              }}
              lable="Email Address"
              placeholder='xyz@gmail.com'
              type='text'
            />

            <div className='col-span-2'>
              <Input
                value={password}
                onChange={({ target }) => {
                  setPassword(target.value);
                  if (error) setError(null);
                }}
                lable="Password"
                placeholder='Min 8 Characters'
                type='password'
              />
            </div>
          </div>

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type='submit' className='btn-primary'>
            SIGN UP
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Already have an account? {""}
            <Link className='font-medium text-primary underline' to='/login'>
              login
            </Link>
          </p>
        </form>
      </div>
    </Authlayout>
  );
};

export default SignUp;