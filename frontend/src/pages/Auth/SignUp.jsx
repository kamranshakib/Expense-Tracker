import React, { useState } from 'react';
import Authlayout from '../../components/layouts/Authlayout';
import Input from '../../components/Inputs/Input';
import { Link } from 'react-router-dom';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log('SignUp clicked');
    console.log('Profile Pic:', profilePic);
  }

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
              onChange={({ target }) => setFullName(target.value)}
              lable="Full Name"
              placeholder='John'
              type='text'
            />
            
            <Input 
              value={email} 
              onChange={({ target }) => setEmail(target.value)}
              lable="Email Address"
              placeholder='xyz@gmail.com'
              type='text'
            />
            
            <div className='col-span-2'>
              <Input 
                value={password} 
                onChange={({ target }) => setPassword(target.value)}
                lable="Password"
                placeholder='Min 8 Characters'
                type='password'
              />
            </div>
          </div>
          
          <button type='submit' className='btn-primary'>
            SIGN UP
          </button>
          
          <p className='text-[13px] text-slate-800 mt-3'>
            Already have an account? {""}
            <Link className='font-medium text-primary underline' to='/login'>
              Login
            </Link>
          </p>
        </form>
      </div>
    </Authlayout>
  );
}

export default SignUp;