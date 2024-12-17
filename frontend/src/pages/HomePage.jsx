import React from 'react'
import { ViewQuizzes } from '../components/Buttons'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {

  const navigate = useNavigate()

  return (
    <>
      <div className='flex flex-col items-center justify-between  max-h-screen overflow-hidden'>

        {/* Background Shapes with Blur */}
        <div className="absolute  top-0 left-0 w-full h-full z-[-10] overflow-hidden">
          <div className="absolute top-28 left-2 w-40 h-40 bg-Ngreen rounded-full blur-[85px] animate-pulse opacity-50"></div>
          <div className="absolute bottom-0 -right-5 w-40 h-40 md:w-56 md:h-56 bg-Ngreen rounded-full blur-[85px] animate-pulse opacity-50"></div>
        </div>


        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-200 md:tracking-wide text-center mx-[5%] md:mx-[10%] mt-20 mb-10 leading-snug">
          <span className="text-transparent bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text pr-4">
            Quizzes
          </span>
          <span className='font-semibold'>made fun – play, compete, and show off your skills!</span>
        </h1>




        <div className='z-50' onClick={() => navigate('/all-quizzes')}>
          <ViewQuizzes />
        </div>
      </div>
    </>
  )
}

export default HomePage