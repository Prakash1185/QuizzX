import React from 'react'
import { Link } from 'react-router-dom'

const QuizDetailsPage = () => {
  return (
    <div className='mx-10 py-5'>
      <div className='flex items-center gap-5 mb-5'>
        <Link to={`/admin/all-quizzes`}>
          <button className='font-inter bg-gray-800 text-white py-2 px-5 rounded-md w-20'>
            Back
          </button>
        </Link>
        <h1 className='text-2xl font-medium'>Manage Quiz  </h1>
      </div>
      <div className='bg-finalDark px-5 py-3 shadow-md rounded-md text-lg flex flex-col gap-2 w-[40rem]  font-poppins '>
        <p className='bg-dark2 border border-gray-500 border-opacity-20 rounded-md px-3 py-1'>Quiz Name</p>
        <p className='bg-dark2 border border-gray-500 border-opacity-20 rounded-md px-3 py-1'>Quiz Description</p>
        <p className='bg-dark2 border border-gray-500 border-opacity-20 rounded-md px-3 py-1'>Question Time Limit (in secs) : </p>
        <p className='bg-dark2 border border-gray-500 border-opacity-20 rounded-md px-3 py-1'>Quiz Time Limit (in mins) : </p>
        <p className='bg-dark2 border border-gray-500 border-opacity-20 rounded-md px-3 py-1'>Created : </p>
        <p className='bg-dark2 border border-gray-500 border-opacity-20 rounded-md px-3 py-1'>Attendes : </p>
        {/* <p>Banner Image : </p> */}
        {/* <img src="" /> */}
        <div className='flex items-center  py-5 gap-2'>
          <Link to='/admin/edit-quiz/:id'>
            <button className='font-inter bg-Ngreen text-white py-2 px-5 rounded-md w-72'>
              Edit Quiz
            </button>
          </Link>
          <Link to='/admin/quiz/:id/manage-questions'>
            <button className='font-inter bg-Ngreen text-white py-2 px-5 rounded-md w-72'>
              Manage Questions
            </button>
          </Link>
        </div>
      </div>



    </div>
  )
}

export default QuizDetailsPage