import React from 'react'

const AdminHomePage = () => {
  return (
    <div className='mx-10'>
     <div className=' py-5'>
     <p className='text-4xl'>Welcome to the Admin Panel of <span className='font-medium'>QuizzX</span></p>
     </div> 

    <div className='border-dashed border-2 border-dark bg-white rounded-md my-5 px-2 py-3'>
    <div className='text-3xl font-medium py-2 px-5 tracking-wide'>Features of this panel :</div>
     <ul className='flex flex-col gap-2 pl-10 py-2 pb-4'>
      <li className='text-lg font-poppins list-disc'>Activate or Deactivate any Quiz</li>
      <li className='text-lg font-poppins list-disc'>Create a Quiz</li>
      <li className='text-lg font-poppins list-disc'>Modify or Delete any Quiz</li>
      <li className='text-lg font-poppins list-disc'>See all the attendes of any Quiz</li>
      <li className='text-lg font-poppins list-disc'>See all the users of the website</li>
      <li className='text-lg font-poppins list-disc'>More features to roll out soon..</li>
     </ul>
    </div>
    </div>
  )
}

export default AdminHomePage