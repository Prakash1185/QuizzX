import React from 'react'
import QuizQuestionBox from '../components/QuizQuestionBox'

const AttendQuizPage = () => {
  return (
   <div className=' '>
     <div className='mx-10 sm:mx-20 md:mx-40 lg:mx-60 flex justify-center flex-col py-5'>
     {/* NAME OF THE QUIZ  */}
      <h1 className='bg-white border border-dark py-2.5 rounded-md text-3xl mx-auto px-1 md:px-2 lg:px-2.5 text-center font-medium mt-5 w-full'>Title of the quiz will go here</h1>

      {/* THUMBNAIL IMAGE OF THE QUIZ //TODO : updated version */}
      {/* <div className='h-[15rem] '>
      <img src="https://www.filsantejeunes.com/wp-content/uploads/2020/10/Quiz2LG.jpg" className='h-full w-full object-cover  px-2.5 py-2.5 rounded-[15px]' alt=""/>
      </div> */}

      {/* QUESTIONS OF THE QUIZ */}
      <div className='py-5 pt-8 flex flex-col gap-5'>
      <QuizQuestionBox/>
      <QuizQuestionBox/>
      <QuizQuestionBox/>
      </div>

    </div>
   </div>
  )
}

export default AttendQuizPage