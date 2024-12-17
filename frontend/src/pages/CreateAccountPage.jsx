import React from 'react'
import { CreateAndStartQuiz } from '../components/Buttons'
import { useNavigate } from 'react-router-dom';

const CreateAccountPage = () => {
  const navigate = useNavigate()
  return (
    <div className='flex justify-center pt-20'>
     <div className="fixed top-0 left-0 w-full h-full z-[-10] overflow-hidden ">
          <div className="absolute top-28 left-2 w-40 h-40 bg-Ngreen rounded-full blur-[100px] animate-pulse opacity-50"></div>
          <div className="absolute bottom-0 -right-5 w-56 h-56 bg-Ngreen rounded-full blur-[100px] animate-pulse opacity-50"></div>
        </div>  
      <div className='w-[25rem] md:w-[27rem] scale-90 sm:scale-100 bg-finalDark rounded-md border border-gray-500 border-opacity-80  flex flex-col px-4 py-10 gap-4 '>
        <h1 className='text-[1.75rem] font-semibold text-center tracking-wide '>Enter Your Name</h1>
        <input type="text" className='border border-dark py-2 rounded-md px-2 mx-1 sm:mx-3   text-black outline-none' />


        <div className='mx-auto cursor-pointer ' onClick={() => navigate('/quiz/:id')} >
          <CreateAndStartQuiz />
        </div>



      </div>
    </div>
  )
}

export default CreateAccountPage