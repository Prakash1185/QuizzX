import React from 'react'
import { CreateAndStartQuiz } from '../components/Buttons'
import { useNavigate } from 'react-router-dom';

const CreateAccountPage = () => {
  const navigate = useNavigate()
  return (
    <div className='flex justify-center pt-20'>
      <div className='w-[25rem] md:w-[27rem] scale-90 sm:scale-100 bg-white rounded-md border border-dark flex flex-col px-4 py-10 gap-4 '>
        <h1 className='text-[1.75rem] font-semibold text-center tracking-wide '>Enter Your Name</h1>
        <input type="text" className='border border-dark py-2 rounded-md px-2  text-black outline-none' />


        <div className='mx-auto cursor-pointer ' onClick={() => navigate('/quiz/:id')} >
          <CreateAndStartQuiz />
        </div>



      </div>
    </div>
  )
}

export default CreateAccountPage