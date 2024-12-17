import React from 'react'
import QuizBox from '../components/QuizBox'

const QuizzesPage = () => {
  return (
    <div className='flex flex-col items-center  justify-center -my-6 pt-5 sm:py-10 md:py-16  '>

      <div className="fixed top-0 left-0 w-full h-full z-[-10] overflow-hidden ">
        <div className="absolute top-28 left-2 w-40 h-40 bg-Ngreen rounded-full blur-[100px] animate-pulse opacity-50"></div>
        <div className="absolute bottom-0 -right-5 w-56 h-56 bg-Ngreen rounded-full blur-[100px] animate-pulse opacity-50"></div>
      </div>

      <div className=' flex flex-col  -space-y-16  md:-space-y-0 md:gap-10'>
        <QuizBox />
        <QuizBox />
        <QuizBox />
      </div>


    </div>
  )
}

export default QuizzesPage