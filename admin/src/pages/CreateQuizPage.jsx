import React from 'react'

const CreateQuizPage = () => {
  return (
    <div>
      <h1 className='mx-10 text-3xl font-medium text-center py-5'>Create a New Quiz</h1>
     <div className='mx-10'>
     <form className='flex mx-auto flex-col w-[60vw] gap-4 bg-white px-5 py-5 rounded-md border border-dark'>
        <input type="text" placeholder='Quiz Title' className='px-2 py-2 border-dark border border-opacity-80 outline-none rounded-md '/>
        <input type="text" placeholder='Banner Image Link' className='px-2 py-2 border-dark border border-opacity-80 outline-none rounded-md '/>
        <input type="number" placeholder='Duration (in Mins)' className='px-2 py-2 border-dark border border-opacity-80 outline-none rounded-md '/>
        <input type="date" placeholder='Start Date' className='px-2 py-2 border-dark border border-opacity-80 outline-none rounded-md '/>

      </form>
     </div>
    </div>
  )
}

export default CreateQuizPage