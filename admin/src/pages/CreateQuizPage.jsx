import React, { useContext, useState } from 'react'
import { ActivateQuiz } from '../components/Buttons'
import { AdminContext } from './../context/AdminContext';
import { handleError, handleSuccess } from './../components/ToastMessages';
import { Link } from 'react-router-dom';

const CreateQuizPage = () => {

  const { BackendURL } = useContext(AdminContext)

  const [quizInfo, setQuizInfo] = useState({
    title: '',
    bannerImage: '',
    // quizTimeLimit: '',
    questionTimeLimit: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyQuizInfo = { ...quizInfo };
    copyQuizInfo[name] = value;
    setQuizInfo(copyQuizInfo);
  }

  const handleCreateQuiz = async (e) => {
    e.preventDefault();

    const { title, bannerImage, questionTimeLimit, description } = quizInfo;
    if (!title || !bannerImage || !questionTimeLimit || !description) {
      return handleError('Please fill all the details')
    }
    try {
      const response = await fetch(`${BackendURL}/quiz/create-quiz`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem('token')
        },
        body: JSON.stringify(quizInfo)
      })

      const result = await response.json();
      const { success, message } = result;

      // console.log(result);
      if (success) {
        handleSuccess(message)
        setQuizInfo({
          title: '',
          bannerImage: '',
          // quizTimeLimit: '',
          questionTimeLimit: '',
          description: ''
        })
      } else if (!success) {
        handleError(message)
      }
    } catch (error) {
      handleError(error)
    }
  }


  return (
    <div className='mx-10 py-5'>
      <div className='flex items-center gap-5 mb-5'>
        <Link to={`/admin/all-quizzes`}>
          <button className='font-inter bg-gray-800 text-white py-2 px-5 rounded-md w-20'>
            Back
          </button>
        </Link>
        <h1 className='text-2xl font-medium font-poppins'>Create a New Quiz</h1>
      </div>
      <div className=''>
        <form className='flex mx-auto flex-col w-[60vw] gap-4 bg-finalDark px-5 py-5 rounded-md border shadow-md border-gray-500 border-opacity-50 max-h-[75vh] overflow-y-scroll' onSubmit={handleCreateQuiz}>

          <input type="text" placeholder='Quiz Title' className='px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md ' onChange={handleChange} name="title" value={quizInfo.title} autoComplete='off' required />

          <input type="text" placeholder='Banner Image Link' className='px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md ' onChange={handleChange} name="bannerImage" value={quizInfo.bannerImage} autoComplete='off' required />

          {/* <input type="number" placeholder='Quiz Time Limit (in mins)' className='px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md ' onChange={handleChange} name="quizTimeLimit" value={quizInfo.quizTimeLimit} autoComplete='off' required /> */}

          <input type="number" placeholder='Question Time Limit (in secs)' className='px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md ' onChange={handleChange} name="questionTimeLimit" value={quizInfo.questionTimeLimit} autoComplete='off' required />

          <textarea placeholder='Description (max 50 words)' className='px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md ' onChange={handleChange} name="description" value={quizInfo.description} autoComplete='off' required />

          <ActivateQuiz text={"Create Quiz"} />

        </form>
      </div>
    </div>
  )
}

export default CreateQuizPage