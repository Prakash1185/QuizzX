import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'

const QuizDetailsPage = () => {

  const { getQuizById, quizInfo } = useContext(AdminContext)

  const { quizId } = useParams()

  useEffect(() => {
    getQuizById(quizId);
  }, []);

  if (!quizInfo) {
    return (
      <div className="mx-10 py-5">
        <h1 className='text-xl font-poppins'>Loading...</h1>
      </div>
    );
  }

  return (
    <div className='mx-10 py-5'>
      <div className='flex items-center gap-5 mb-3'>
        <Link to={`/admin/all-quizzes`}>
          <button className='font-inter bg-gray-800 text-white py-2 px-5 rounded-md w-20'>
            Back
          </button>
        </Link>
        <h1 className='text-2xl font-medium'>Manage Quiz  </h1>
      </div>
      <div className='bg-finalDark px-5 py-3 shadow-md rounded-md  flex flex-col gap-2 w-[40rem]  font-poppins '>

        <p className='bg-dark2 border border-gray-500 border-opacity-20 rounded-md px-3 py-1'>{quizInfo.title}</p>

        <p className='bg-dark2 border border-gray-500 border-opacity-20 rounded-md px-3 py-1 min-h-24 max-h-24 overflow-y-auto'>{quizInfo.description}</p>

        <p className='bg-dark2 border border-gray-500 border-opacity-20 rounded-md px-3 py-1'>Question Time Limit (in secs) : {quizInfo.questionTimeLimit}</p>

        <p className='bg-dark2 border border-gray-500 border-opacity-20 rounded-md px-3 py-1'>Quiz Time Limit (in mins) : {quizInfo.quizTimeLimit}</p>

        <p className='bg-dark2 border border-gray-500 border-opacity-20 rounded-md px-3 py-1'>Created : {`${new Date(quizInfo.date).toLocaleDateString()} and  ${new Date(quizInfo.date).toLocaleTimeString()}`}</p>

        <p className='bg-dark2 border border-gray-500 border-opacity-20 rounded-md px-3 py-1'>Attendes : {Array.isArray(quizInfo.attendes) ? quizInfo.attendes.length : 0}</p>

        <p className='bg-dark2 border border-gray-500 border-opacity-20 rounded-md px-3 py-1'>Entry Allowed : {quizInfo.isEntryAllowed ? 'Yes' : 'No'}</p>

        <p className='bg-dark2 border border-gray-500 border-opacity-20 rounded-md px-3 py-1'>Showing Leaderboard : {quizInfo.showLeaderboard ? 'Yes' : 'No'}</p>


        <div className='flex items-center  py-5 gap-2'>
          <Link to={`/admin/edit-quiz/${quizId}`}>
            <button className='font-inter bg-Ngreen text-white py-2 px-5 rounded-md w-72'>
              Edit Quiz
            </button>
          </Link>
          <Link to={`/admin/quiz/${quizId}/manage-questions`}>
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