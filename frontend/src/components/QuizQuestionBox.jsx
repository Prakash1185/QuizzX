import React from 'react'

const QuizQuestionBox = () => {
  return (
    <div className='bg-white rounded-md border border-dark px-5 py-3 w-full'>
      {/* name of question with question number */}
      <div className='flex gap-1 text-lg py-2'>
        <h1 className='font-semibold'>1.</h1>
        <p className=''>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo in assumenda voluptatum eveniet rem tempora? Ducimus nul</p>
      </div>
      {/* options of the quiz */}
      <div className='space-y-2 pb-2 pt-3'>
        <div className='flex  items-center gap-2'>
          <input type="radio" name='option1' />
          <label htmlFor="option1">Option1</label>
        </div>
        <div className='flex  items-center gap-2'>
          <input type="radio" name='option2' />
          <label htmlFor="option2">Option1</label>
        </div>
        <div className='flex  items-center gap-2'>
          <input type="radio" name='option3' />
          <label htmlFor="option3">Option1</label>
        </div>
        <div className='flex  items-center gap-2'>
          <input type="radio" name='option4' />
          <label htmlFor="option5">Option1</label>
        </div>
      </div>
    </div>
  )
}

export default QuizQuestionBox