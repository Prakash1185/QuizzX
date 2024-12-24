import React, { useContext, useState } from 'react'
import { ActivateQuiz } from '../components/Buttons'
import { Link, useParams } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { handleError, handleSuccess } from '../components/ToastMessages'

const CreateQuestionPage = () => {

  const { BackendURL } = useContext(AdminContext)

  const { quizId } = useParams()

  const [questionInfo, setQuestionInfo] = useState({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctOption: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyQuestionInfo = { ...questionInfo };
    copyQuestionInfo[name] = value;
    setQuestionInfo(copyQuestionInfo);
  }

  const handleCreateQuestion = async (e) => {
    e.preventDefault();

    const { question, option1, option2, option3, option4, correctOption } = questionInfo;
    if (!question || !option1 || !option2 || !option3 || !option4 || !correctOption) {
      return handleError('Please fill all the details')
    }
    try {
      const response = await fetch(`${BackendURL}/quiz/${quizId}/add-question`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem('token')
        },
        body: JSON.stringify(questionInfo)
      })

      const result = await response.json();
      const { success, message } = result;

      // console.log(result);
      if (success) {
        handleSuccess(message)
        setQuestionInfo({
          question: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          correctOption: ''
        })
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
        <h1 className='text-2xl font-medium font-poppins'>Add Question</h1>
      </div>
      {/* <h1 className=' text-3xl font-medium text-center font-poppins'>Add Question</h1> */}
      <div className=''>
        <form className='flex mx-auto flex-col w-[60vw] gap-4 bg-finalDark px-5 py-5 rounded-md border shadow-md border-gray-500 border-opacity-50 max-h-[75vh] overflow-y-scroll' onSubmit={handleCreateQuestion}>
          <input type="text" placeholder='Question' className='px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md ' onChange={handleChange} name='question' value={questionInfo.question} autoComplete='off' required />

          <input type="text" placeholder='Option 1' className='px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md ' onChange={handleChange} name='option1' value={questionInfo.option1} autoComplete='off' required />

          <input type="text" placeholder='Option 2' className='px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md ' onChange={handleChange} name='option2' value={questionInfo.option2} autoComplete='off' required />

          <input type="text" placeholder='Option 3' className='px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md ' onChange={handleChange} name='option3' value={questionInfo.option3} autoComplete='off' required />

          <input type="text" placeholder='Option 4' className='px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md ' onChange={handleChange} name='option4' value={questionInfo.option4} autoComplete='off' required />

          <input type="number" placeholder='Correct Option' className='px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md ' onChange={handleChange} name='correctOption' value={questionInfo.correctOption} autoComplete='off' required />

          <button className="bg-green-700  hover:bg-green-800 transition-all duration-200 py-3 px-10 text-lg text-white rounded-md font-semibold">
            Add
          </button>

        </form>
      </div>
    </div>
  )
}

export default CreateQuestionPage