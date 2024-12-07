import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <>
      <nav className='flex justify-around bg-white items-center py-1.5'>
        <div  >
          <h1 onClick={()=>navigate('/home')} className='text-dark text-center md:text-start cursor-pointer text-[1.75rem] md:text-[2rem] font-poppins font-semibold'>
            QuizzX
          </h1>
        </div>
        <div className='hidden sm:block'>
          <button onClick={() => navigate('/all-quizzes')} className='text-lg font-medium cursor-pointer bg-dark text-white px-3 py-1.5 rounded-md'>
            Explore
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