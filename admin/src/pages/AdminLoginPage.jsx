import React, { useContext, useState } from 'react'
import { Button, FormLoginButton, LoginButton } from '../components/Buttons'
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import { handleError, handleSuccess } from './../components/ToastMessages';

const AdminLoginPage = () => {

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
    secretKey: ''
  });

  const navigate = useNavigate()

  const { isLoggedIn, setIsLoggedIn, BackendURL } = useContext(AdminContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  }

  const handleLogin = async (e) => {
    const { email, password, secretKey } = loginInfo;
    if (!email || !password || !secretKey) {
      return handleError('Please fill all the details')
    }
    e.preventDefault();
    try {
      const response = await fetch(`${BackendURL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo)
      })

      const result = await response.json();
      const { success, message, token } = result;

      console.log(result);
      if (success) {
        handleSuccess(message)
        setIsLoggedIn(true)
        localStorage.setItem('token', token)
        navigate('/admin/home')
        setLoginInfo({
          email: "",
          password: "",
        })
      } else if (!success) {
        handleError(message)
      }
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <div className='flex justify-center pt-10 md:pt-20 mx-auto'>
      <div className='w-[25rem] md:w-[27rem] scale-90 sm:scale-100 bg-finalDark rounded-md border border-gray-500 border-opacity-50 flex flex-col px-4 md:px-6 py-10 md:py-8 gap-4 '>
        <h1 className='text-[2rem] font-semibold text-center tracking-wide '> <span className='font-bold  font-poppins text-Ngreen'>Admin</span> Login</h1>
        <form
          onSubmit={handleLogin}
          className='w-full flex flex-col gap-4'>
          <input type="email" className='border border-gray-500  border-opacity-90  py-2 rounded-md px-2 placeholder:text-lg  text-white bg-dark2  outline-none' placeholder='Email' required autoComplete='off' onChange={handleChange} name='email' value={loginInfo.email} />
          <input type="password" className='border border-gray-500  py-2 rounded-md px-2 placeholder:text-lg text-white  border-opacity-90  bg-dark2 outline-none' placeholder='Password' required autoComplete='off' onChange={handleChange} name='password' value={loginInfo.password} />
          <input type="password" className='border border-gray-500  border-opacity-90  py-2 rounded-md px-2 placeholder:text-lg text-white  bg-dark2 outline-none' placeholder='Secret Key' required autoComplete='off' onChange={handleChange} name='secretKey' value={loginInfo.secretKey} />

          <div className=' cursor-pointer pt-5' onClick={handleLogin} >
            <FormLoginButton />
          </div>
        </form>




      </div>



      {/* Background Shapes with Blur */}
      <div className="fixed  top-0 left-0 w-full h-full z-[-10] overflow-hidden">
        <div className="absolute top-28 left-2 w-40 h-40 bg-Ngreen rounded-full blur-[85px] animate-pulse opacity-50"></div>
        <div className="absolute bottom-0 -right-5 w-40 h-40 md:w-56 md:h-56 bg-Ngreen rounded-full blur-[85px] animate-pulse opacity-50"></div>
      </div>
    </div>
  )
}

export default AdminLoginPage


