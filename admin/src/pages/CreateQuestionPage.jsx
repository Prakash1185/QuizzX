import React from 'react'
import { ActivateQuiz } from '../components/Buttons'
import { Link } from 'react-router-dom'

const CreateQuestionPage = () => {
  return (
    <div className='mx-10 py-5 '>
      <div className='flex items-center gap-5 mb-5'>
        <Link to={`/admin/quiz/:id/manage-questions`}>
          <button className='font-inter bg-gray-800 text-white py-2 px-5 rounded-md w-20'>
            Back
          </button>
        </Link>
        <h1 className='text-2xl font-medium font-poppins'>Add Question</h1>
      </div>
      {/* <h1 className=' text-3xl font-medium text-center font-poppins'>Add Question</h1> */}
      <div className=''>
        <form className='flex mx-auto flex-col w-[60vw] gap-4 bg-finalDark px-5 py-5 rounded-md border shadow-md border-gray-500 border-opacity-50 max-h-[75vh] overflow-y-scroll'>
          <input type="text" placeholder='Question' className='px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md ' />

          <input type="text" placeholder='Option 1' className='px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md ' />

          <input type="text" placeholder='Option 2' className='px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md ' />

          <input type="text" placeholder='Option 3' className='px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md ' />

          <input type="text" placeholder='Option 4' className='px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md ' />

          <input type="number" placeholder='Correct Option' className='px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md ' />

          <ActivateQuiz text={"Add"} />

        </form>
      </div>
    </div>
  )
}

export default CreateQuestionPage