import React, { useContext, useEffect, useState } from 'react'
import QuizBox from '../components/QuizBox'
import { UserContext } from '../context/UserContext'
import { handleError } from '../components/ToastMessages'

const QuizzesPage = () => {
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true) // Adding loading state
  const { BackendURL } = useContext(UserContext)

  const getAllQuizzes = async () => {
    try {
      const response = await fetch(`${BackendURL}/quiz/user-quizzes`, {
        method: 'GET',
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      const result = await response.json()
      const { success, quizzes } = result

      if (success) {
        setQuizzes(quizzes)
      }

      if (!success) {
        handleError("Something went wrong!")
      }
    } catch (error) {
      handleError(error)
    } finally {
      setLoading(false) // Set loading to false once the fetch completes
    }
  }

  useEffect(() => {
    getAllQuizzes()
  }, [])

  return (
    <div className='flex flex-col items-center justify-center -my-6 pt-5 sm:py-10 md:py-16'>

      <div className="fixed top-0 left-0 w-full h-full z-[-10] overflow-hidden">
        <div className="absolute top-28 left-2 w-40 h-40 bg-Ngreen rounded-full blur-[85px] animate-pulse opacity-50"></div>
        <div className="absolute bottom-0 -right-5 w-40 h-40 md:w-56 md:h-56 bg-Ngreen rounded-full blur-[85px] animate-pulse opacity-50"></div>
      </div>

      <div className='flex flex-col -space-y-16 md:-space-y-0 md:gap-10'>
        {
          loading ? (
            <h1 className='text-2xl font-semibold text-gray-200 pt-10 md:pt-0'>Loading...</h1> // Show loading message
          ) : quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <QuizBox
                key={quiz._id}
                quizId={quiz._id}
                title={quiz.title}
                description={quiz.description}
                bannerImage={quiz.bannerImage}
                isEntryAllowed={quiz.isEntryAllowed}
                showLeaderboard={quiz.showLeaderboard}
              />
            ))
          ) : (
            <h1 className='text-2xl font-semibold text-gray-300 pt-10 md:pt-0'>No Quizzes Available</h1>
          )
        }
      </div>
    </div>
  )
}

export default QuizzesPage
