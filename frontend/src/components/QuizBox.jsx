  import React from 'react'
  import { EnterQuiz } from './Buttons'
  import { useNavigate } from 'react-router-dom';

  const QuizBox = () => {

    const navigate = useNavigate()
    
    return (
      <div className='scale-[77%]  min-[550px]:scale-[80%] sm:scale-100'>

        <div className=' md:w-[50rem] md:h-[18rem] bg-finalDark border-opacity-80 rounded-md border   border-gray-500 md:flex-row flex-col flex  gap-3 items-center  justify-center sm:my-16 md:my-0'>
          
          <div id="left" className='w-[25rem] h-[17rem] md:h-[16rem]'>
            <img src="https://www.filsantejeunes.com/wp-content/uploads/2020/10/Quiz2LG.jpg" className='h-full w-full object-cover  px-2.5 py-2.5 rounded-[15px]' alt=""/>
          </div>
          <div id="right"  className='w-[23rem] py-2.5 px-1.5 mx-auto md:mx-0 '>
            <h1 className='text-3xl font-medium md:tracking-tight text-center md:text-start px-1 md:px-0 tracking-tighter'>Title of the quiz will go here</h1>  
            <p className='px-1.5 text-gray-500 py-3 text-center tracking-tight md:tracking-normal md:text-start'>some extra details about the quiz will go here like username and links etc. some extra details about the quiz will go here like username and links etc</p>
            <div onClick={()=>navigate(`/create-account`)} className='md:pt-6  pt-4  text-center hover:cursor-pointer  md:pr-5 pb-2 md:pb-0'>
              <EnterQuiz/>
            </div>
          </div>

        </div>
      </div>
    )
  }

  export default QuizBox