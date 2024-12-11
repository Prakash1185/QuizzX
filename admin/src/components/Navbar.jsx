import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminBadge } from './Buttons'


const Navbar = () => {
  const navigate = useNavigate()
  return (
    <>
      <nav className='flex justify-around gap-48 bg-white items-center py-1.5 w-full z-20 shadow'>
        <div  className='' >
          <h1 onClick={()=>navigate('/admin/home')} className='text-dark text-center md:text-start cursor-pointer text-[1.75rem] md:text-[2rem] font-poppins font-bold md:font-semibold flex items-center gap-1'>
            QuizzX <AdminBadge/> 
          </h1>
        </div>
        <div className='hidden sm:block'>
          <button onClick={() => navigate('/admin/login')} className='text-lg font-medium cursor-pointer bg-dark text-white px-3 py-1.5 rounded-md'>
           Login
          </button>
        </div>
        {/* <div className='md:hidden'>
        <i className="fa-solid fa-bars fa-xl"></i>
        </div> */}
      </nav>
    </>
  )
}

export default Navbar