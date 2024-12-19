import React, { useContext, useEffect, useState } from 'react'
import QuizBox from '../components/QuizBox'
import { handleError } from '../components/ToastMessages'
import { AdminContext } from '../context/AdminContext'

const AdminAllQuizzesPage = () => {

  const [quizzes, setQuizzes] = useState([])

  const { BackendURL } = useContext(AdminContext)

  // function to get all the quizzes
  const getAllQuizzes = async () => {
    try {
      const response = await fetch(`${BackendURL}/quiz/all-quizzes`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })

      const result = await response.json()
      const { success, message, quizzes } = result

      // console.log(result);

      if (success) {
        setQuizzes(quizzes)
      }

      if (!success) {
        handleError(message)
      }

    } catch (error) {
      handleError(error)
    }
  }

  useEffect(() => {
    getAllQuizzes()
  }, [])

  return (
    <div className='mx-10 py-10 max-h-[90vh] overflow-y-scroll'>
      <div className='flex flex-col gap-10 '>
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <QuizBox
              key={quiz._id}
              attendes={quiz.attendes.length}
              bannerImage={quiz.bannerImage}
              date={new Date(quiz.date).toLocaleDateString()}
              description={quiz.description}
              id={quiz._id}
              quizTimeLimit={quiz.quizTimeLimit}
              title={quiz.title}
              getAllQuizzes={getAllQuizzes}
              setQuizzes={setQuizzes}
              quizzes={quizzes}
            />
          ))
        ) : (
          <p className='text-xl font-poppins'>No quizzes available.</p>
        )}
      </div>
    </div>
  )
}

export default AdminAllQuizzesPage