import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ExploreQuizzes } from './Buttons'

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <>
      <nav className='flex w-full justify-center sm:justify-between  sm:px-10 md:px-32 lg:px-40  bg-dark2 bg-opacity-100  items-center py-3  z-20 shadow sticky top-0 border-b border-gray-500  border-opacity-50   '>
        <div  >
          <h1 onClick={() => navigate('/home')} className='text-dark text-center md:text-start cursor-pointer text-[1.75rem] md:text-[2rem] font-poppins font-bold md:font-semibold'>
            QuizzX
          </h1>
        </div>
        <Link to="/all-quizzes">
          <div className='hidden sm:block group'>
            <ExploreQuizzes />
          </div>
        </Link>
        {/* <div className='md:hidden'>
        <i className="fa-solid fa-bars fa-xl"></i>
        </div> */}
      </nav>
    </>
  )
}

export default Navbar