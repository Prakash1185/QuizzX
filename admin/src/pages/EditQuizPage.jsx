import React, { useContext, useEffect, useState } from 'react'
import { ActivateQuiz } from '../components/Buttons'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { handleError, handleSuccess } from '../components/ToastMessages'
import { AdminContext } from '../context/AdminContext'

const EditQuizPage = () => {

  const { BackendURL } = useContext(AdminContext)

  const [quizInfoo, setQuizInfoo] = useState({})

  const { quizId } = useParams()

  const getQuizByIdd = async (id) => {
    try {
      const response = await fetch(`${BackendURL}/quiz/${id}`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })

      const result = await response.json()
      const { success, message, quiz } = result

      // console.log(quiz);
      setQuizInfoo(quiz)

      if (!success) {
        handleError(message)
      }

    } catch (error) {
      handleError(error)
    }
  }

  useEffect(() => {

    getQuizByIdd(quizId)

  }, [])

  const navigate = useNavigate();
  const [newQuizInfo, setNewQuizInfo] = useState({
    title: '',
    bannerImage: '',
    // quizTimeLimit: '',
    questionTimeLimit: '',
    description: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch the quiz data and set it once
    if (!quizInfoo) {
      getQuizByIdd(quizId)
    } else {
      setNewQuizInfo(quizInfoo)
    }
  }, [quizId, quizInfoo]);

  // console.log(quizInfoo);


  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyNewQuizInfo = { ...newQuizInfo };
    copyNewQuizInfo[name] = value;
    setNewQuizInfo(copyNewQuizInfo);
  }

  const handleEditQuiz = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await fetch(`${BackendURL}/quiz/update-quiz/${quizId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem('token')
        },
        body: JSON.stringify(newQuizInfo)
      })

      const result = await response.json();
      const { success, message } = result;

      // console.log(result);
      if (success) {
        handleSuccess(message)
        setNewQuizInfo({
          title: '',
          bannerImage: '',
          // quizTimeLimit: '',
          questionTimeLimit: '',
          description: ''
        })
        navigate(`/admin/quiz/${quizId}/manage`)
      } else if (!success) {
        handleError(message)
      }
    } catch (error) {
      handleError(error)
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className='sm:mx-10 py-5 mx-auto px-5 overflow-x-auto'>
      <div className='flex items-center gap-5 mb-5'>
        <Link to={`/admin/quiz/${quizId}/manage`}>
          <button className='font-inter bg-gray-800 text-white py-2 px-5 rounded-md w-20'>
            Back
          </button>
        </Link>
        <h1 className='text-2xl font-medium font-poppins'>Edit Quiz Details </h1>
      </div>
      {/* <h1 className=' text-3xl font-medium text-center  font-poppins'>EditQuiz</h1> */}
      <div className=''>
        <form className='flex mx-auto flex-col sm:w-[60vw] w-[25rem] gap-4 bg-finalDark px-5 py-5 rounded-md border shadow-md border-gray-500 border-opacity-50 max-h-[75vh] overflow-y-scroll ' onSubmit={handleEditQuiz}
        >
          <input type="text" placeholder='Quiz Title' className='px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md ' onChange={handleChange} name="title" value={newQuizInfo.title} autoComplete='off' required />

          <input type="text" placeholder='Banner Image Link' className='px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md ' onChange={handleChange} name="bannerImage" value={newQuizInfo.bannerImage} autoComplete='off' required />

          {/* <input type="number" placeholder='Quiz Time Limit (in mins)' className='px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md ' onChange={handleChange} name="quizTimeLimit" value={newQuizInfo.quizTimeLimit} autoComplete='off' required /> */}

          <input type="number" placeholder='Question Time Limit (in secs)' className='px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md ' onChange={handleChange} name="questionTimeLimit" value={newQuizInfo.questionTimeLimit} autoComplete='off' required />

          <textarea placeholder='Description (max 50 words)' className='px-2 py-2  border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md ' onChange={handleChange} name="description" value={newQuizInfo.description} autoComplete='off' required />

          <button
            type="submit"
            className={`bg-green-700  hover:bg-green-800 transition-all duration-200 py-3 px-10 text-lg text-white rounded-md font-semibold ${isLoading ? 'cursor-not-allowed bg-gray-400' : ''}`}
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? 'Saving...' : 'Edit and Save'} {/* Change button text based on loading state */}
          </button>

        </form>
      </div>
    </div>
  )
}

export default EditQuizPage