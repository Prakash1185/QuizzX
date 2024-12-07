import React from 'react'
import { ViewQuizzes } from '../components/Buttons'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  
  const navigate = useNavigate()

  return (
    <>
      <div className='flex flex-col items-center justify-between  '>
        <h1 className='text-4xl text-center pt-20 pb-10 px-2'>Quizzes made fun – play, compete, and show off your skills!</h1>
        <div onClick={()=>navigate('/all-quizzes')}>
          <ViewQuizzes/>
        </div>
      </div>
    </>
  )
}

export default HomePage