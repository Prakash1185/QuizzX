import React from 'react'
import { CreateLogoBox, DeleteLogoBox, EditLogoBox, ReadLogoBox } from '../components/AdminFeaturesBox'

const AdminHomePage = () => {
  return (
    <div className='sm:mx-10 mx-5'>
      <div className=' py-5'>
        <p className='text-4xl font-poppins py-3'>Welcome to the Admin Panel of <span className='font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-green-500 to-green-700'>QuizzX</span></p>
      </div>

      <div className='flex-col flex  gap-5 mt-3 mb-5'>
        <CreateLogoBox text='Create Quizzes' />
        <ReadLogoBox text='Get Quizzes , Questions , Leaderboard, Users Data' />
        <EditLogoBox text='Edit Quizzes and Question Data' />
        <DeleteLogoBox text='Delete any Quiz , Question , User ' />
      </div>


    </div>
  )
}

export default AdminHomePage