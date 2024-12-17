import React from 'react'
import { ActivateQuiz } from '../components/Buttons'

const CreateQuizPage = () => {
  return (
    <div>
      <h1 className='mx-10 text-3xl font-medium text-center py-5 font-poppins'>Create a New Quiz</h1>
     <div className='mx-10'>
     <form className='flex mx-auto flex-col w-[60vw] gap-4 bg-finalDark px-5 py-5 rounded-md border shadow-md border-gray-500 border-opacity-50 max-h-[75vh] overflow-y-scroll'>
        <input type="text" placeholder='Quiz Title' className='px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md '/>
        <input type="text" placeholder='Banner Image Link' className='px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md '/>
        <input type="number" placeholder='Quiz Time Limit (in mins)' className='px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md '/>
        <input type="number" placeholder='Question Time Limit (in secs)' className='px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md '/>
        <textarea placeholder='Description (max 50 words)' className='px-2 py-2 border-gray-500 bg-dark2 border border-opacity-20 outline-none rounded-md '/>

        <ActivateQuiz text={"Create Quiz"}/>

      </form>
     </div>
    </div>
  )
}

export default CreateQuizPage