import React from 'react'
import { ActivateQuiz } from '../components/Buttons'
import { Link } from 'react-router-dom'

const EditQuizPage = () => {
  return (
    <div className='mx-10 py-5 '>
      <div className='flex items-center gap-5 mb-5'>
        <Link to={`/admin/quiz/:id/manage`}>
          <button className='font-inter bg-gray-800 text-white py-2 px-5 rounded-md w-20'>
            Back
          </button>
        </Link>
        <h1 className='text-2xl font-medium font-poppins'>Edit Quiz Details </h1>
      </div>
      {/* <h1 className=' text-3xl font-medium text-center  font-poppins'>EditQuiz</h1> */}
      <div className=''>
        <form className='flex mx-auto flex-col w-[60vw] gap-4 bg-finalDark px-5 py-5 rounded-md border shadow-md border-gray-500 border-opacity-50 max-h-[75vh] overflow-y-scroll'>
          <input type="text" placeholder='Quiz Title' className='px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md ' />
          <input type="text" placeholder='Banner Image Link' className='px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md ' />
          <input type="number" placeholder='Quiz Time Limit (in mins)' className='px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md ' />
          <input type="number" placeholder='Question Time Limit (in secs)' className='px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md ' />
          <textarea placeholder='Description (max 50 words)' className='px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md ' />

          <ActivateQuiz text={"Edit and Save"} />

        </form>
      </div>
    </div>
  )
}

export default EditQuizPage