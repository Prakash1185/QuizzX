import React from 'react'
import { Link } from 'react-router-dom'
import ShowQuestionBox from '../components/ShowQuestionBox'

const ManageQuestionPage = () => {
  return (
    <div className='mx-10 py-5'>
      <div className='flex items-center  gap-5 pb-2'>
        <div>
          <Link to={`/admin/quiz/:id/manage`}>
            <button className='font-inter bg-gray-800 text-white py-2 px-5 rounded-md w-20'>
              Back
            </button>
          </Link>
        </div>
        <div>
          <Link to='/admin/quiz/:id/add-question'>
            <button className='font-inter bg-Ngreen text-white py-2 px-5 rounded-md w-72'>
              Add Question
            </button>
          </Link>
        </div>
        <h1 className='font-semibold text-2xl font-poppins'>Total Questions : </h1>
      </div>
      <div className='flex flex-col gap-5 mt-5 w-[40rem] max-h-[calc(100vh-12rem)] overflow-y-auto'>


        <ShowQuestionBox />
        <ShowQuestionBox />
        <ShowQuestionBox />

      </div>
    </div>
  )
}

export default ManageQuestionPage