import React, { useContext, useEffect, useState } from 'react'
import { ActivateQuiz } from '../components/Buttons'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { handleError, handleSuccess } from '../components/ToastMessages'

const EditQuestionPage = () => {

  const { BackendURL, getQuestionById, questionInfo } = useContext(AdminContext)

  const { quizId, questionId } = useParams()
  const navigate = useNavigate()
  const [newQuestionInfo, setNewQuestionInfo] = useState({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctOption: ''
  });

  useEffect(() => {
    getQuestionById(questionId)
    setNewQuestionInfo(questionInfo)
  }, [])


  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyNewQuestionInfo = { ...questionInfo };
    copyNewQuestionInfo[name] = value;
    setNewQuestionInfo(copyNewQuestionInfo);
  }

  const handleEditQuestion = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BackendURL}/quiz/${quizId}/update-question/${questionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem('token')
        },
        body: JSON.stringify(newQuestionInfo)
      })

      const result = await response.json();
      const { success, message } = result;

      if (success) {
        handleSuccess(message)
        navigate(`/admin/quiz/${quizId}/manage-questions`)
      } else if (!success) {
        handleError(message)
      }

    } catch (error) {
      handleError(error)
    }
  }

  return (
    <div className='mx-10 py-5 '>
      <div className='flex items-center gap-5 mb-5'>
        <Link to={`/admin/quiz/${quizId}/manage-questions`}>
          <button className='font-inter bg-gray-800 text-white py-2 px-5 rounded-md w-20'>
            Back
          </button>
        </Link>
        <h1 className='text-2xl font-medium font-poppins'>Edit Question Details </h1>
      </div>
      {/* <h1 className=' text-3xl font-medium text-center  font-poppins'>Edit Question</h1> */}
      <div className=''>
        <form className='flex mx-auto flex-col sm:w-[60vw] gap-4 bg-finalDark px-5 py-5 rounded-md border shadow-md border-gray-500 border-opacity-50 max-h-[75vh] overflow-y-scroll'
          onSubmit={handleEditQuestion}
        >
          <input type="text" placeholder='Question' className='px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md ' name='question' value={newQuestionInfo.question} required autoComplete='off' onChange={handleChange} />

          <input type="text" placeholder='Option 1' className='px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md ' name='option1' value={newQuestionInfo.option1} required autoComplete='off' onChange={handleChange} />

          <input type="text" placeholder='Option 2' className='px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md ' name='option2' value={newQuestionInfo.option2} required autoComplete='off' onChange={handleChange} />

          <input type="text" placeholder='Option 3' className='px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md ' name='option3' value={newQuestionInfo.option3} required autoComplete='off' onChange={handleChange} />

          <input type="text" placeholder='Option 4' className='px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md ' name='option4' value={newQuestionInfo.option4} required autoComplete='off' onChange={handleChange} />

          <input type="number" placeholder='Correct Option' className='px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md ' name='correctOption' value={newQuestionInfo.correctOption} required autoComplete='off' onChange={handleChange} />

          <button type='submit' className="bg-green-700  hover:bg-green-800 transition-all duration-200 py-3 px-10 text-lg text-white rounded-md font-semibold">
            Edit and Save
          </button>

        </form>
      </div>
    </div>
  )
}

export default EditQuestionPage