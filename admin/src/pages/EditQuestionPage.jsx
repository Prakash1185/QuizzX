import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { handleError, handleSuccess } from '../components/ToastMessages'

//! NOT WORKING , NEED TO FIX THIS PAGE

const EditQuestionPage = () => {
  const { BackendURL, getQuestionById, questionInfo } = useContext(AdminContext)
  const { quizId, questionId } = useParams()
  const navigate = useNavigate()

  const [newQuestionInfo, setNewQuestionInfo] = useState({
    question: '',
    options: [
      { text: '', time: '' },
      { text: '', time: '' },
      { text: '', time: '' },
      { text: '', time: '' }
    ],
    correctOption: '' // store the index of correct option (1-4)
  })

  useEffect(() => {
    // Fetch question details only if `questionInfo` is not available to avoid redundant fetch
    if (!questionInfo) {
      getQuestionById(questionId)
    }
  }, [questionId, questionInfo, getQuestionById])

  useEffect(() => {
    if (questionInfo) {
      setNewQuestionInfo({
        question: questionInfo.question || '',
        options: questionInfo.options.map(option => ({
          text: option.text || '',
          time: option.time || ''
        })) || [],
        correctOption: questionInfo.correctOption || '' // assuming correctOption is an index (1-4)
      })
    }
  }, [questionInfo])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith('option')) {
      const optionIndex = parseInt(name.split('-')[1])
      const newOptions = [...newQuestionInfo.options]
      newOptions[optionIndex] = {
        ...newOptions[optionIndex],
        text: value
      }
      setNewQuestionInfo({ ...newQuestionInfo, options: newOptions })
    } else if (name === 'correctOption') {
      // Update the correct option index
      setNewQuestionInfo({ ...newQuestionInfo, correctOption: value })
    } else {
      setNewQuestionInfo({
        ...newQuestionInfo,
        [name]: value
      })
    }
  }

  const handleEditQuestion = async (e) => {
    e.preventDefault()

    // Check that all options have text
    const allOptionsValid = newQuestionInfo.options.every(option => option.text.trim() !== '')

    if (!allOptionsValid) {
      handleError('All options must have text.')
      return
    }

    try {
      const response = await fetch(`${BackendURL}/quiz/${quizId}/update-question/${questionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token')
        },
        body: JSON.stringify(newQuestionInfo)
      })

      const result = await response.json()
      const { success, message } = result

      if (success) {
        handleSuccess(message)
        navigate(`/admin/quiz/${quizId}/manage-questions`)
      } else {
        handleError(message)
      }
    } catch (error) {
      handleError(error.message)
    }
  }

  return (
    <div className="mx-10 py-5">
      <div className="flex items-center gap-5 mb-5">
        <Link to={`/admin/quiz/${quizId}/manage-questions`}>
          <button className="font-inter bg-gray-800 text-white py-2 px-5 rounded-md w-20">
            Back
          </button>
        </Link>
        <h1 className="text-2xl font-medium font-poppins">Edit Question Details</h1>
      </div>
      <div>
        <form
          className="flex mx-auto flex-col sm:w-[60vw] gap-4 bg-finalDark px-5 py-5 rounded-md border shadow-md border-gray-500 border-opacity-50 max-h-[75vh] overflow-y-scroll"
          onSubmit={handleEditQuestion}
        >
          <input
            type="text"
            placeholder="Question"
            className="px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md"
            name="question"
            value={newQuestionInfo.question}
            required
            autoComplete="off"
            onChange={handleChange}
          />

          {newQuestionInfo.options.map((option, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Option ${index + 1}`}
              className="px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md"
              name={`option-${index}`}
              value={option.text}
              required
              autoComplete="off"
              onChange={handleChange}
            />
          ))}

          <input
            type="number"
            min="1"
            max="4"
            placeholder="Correct Option (1-4)"
            className="px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md"
            name="correctOption"
            value={newQuestionInfo.correctOption}
            required
            autoComplete="off"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="bg-green-700 hover:bg-green-800 transition-all duration-200 py-3 px-10 text-lg text-white rounded-md font-semibold"
          >
            Edit and Save
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditQuestionPage
