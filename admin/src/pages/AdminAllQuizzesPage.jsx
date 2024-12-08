import React from 'react'
import QuizBox from '../components/QuizBox'

const AdminAllQuizzesPage = () => {
  return (
    <div className='mx-10 py-10 max-h-[90vh] overflow-y-scroll'>
      <div className='flex flex-col gap-10 '>
        <QuizBox/>
        <QuizBox/>
        <QuizBox/>
      </div>
    </div>
  )
}

export default AdminAllQuizzesPage