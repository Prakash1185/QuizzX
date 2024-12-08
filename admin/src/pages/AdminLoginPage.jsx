import React from 'react'
import { Button } from '../components/Buttons'
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {

  const navigate = useNavigate()
  
  return (
    <div className='flex justify-center pt-10 md:pt-20'>
      <div className='w-[25rem] md:w-[27rem] scale-90 sm:scale-100 bg-white rounded-md border border-dark flex flex-col px-4 py-10 gap-4 '>
        <h1 className='text-[2rem] font-semibold text-center tracking-wide '> <span className='font-bold'>Admin</span> Login</h1>
        <input type="email" className='border border-dark border-opacity-90  py-2 rounded-md px-2 placeholder:text-lg  text-black ' placeholder='Email' required autoComplete='off'/>
        <input type="password" className='border border-dark py-2 rounded-md px-2 placeholder:text-lg text-black  border-opacity-90 ' placeholder='Password' required autoComplete='off'/>
        <input type="password" className='border border-dark border-opacity-90  py-2 rounded-md px-2 placeholder:text-lg text-black ' placeholder='Secret Key' required autoComplete='off'/>


        <div className=' cursor-pointer ' onClick={() => navigate('/admin/home')} >
          <Button text={"Login"}/>
        </div>



      </div>
    </div>
  )
}

export default AdminLoginPage