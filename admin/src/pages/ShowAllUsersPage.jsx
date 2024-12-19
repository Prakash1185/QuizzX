import React, { useContext, useEffect } from 'react'
import CompleteUserDetails from '../components/CompleteUserDetails'
import { AdminContext } from '../context/AdminContext'


const ShowAllUsersPage = () => {

  const { BackendURL, getAllUsers } = useContext(AdminContext)

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <div className='mx-10 py-5'>
      <h1 className=' text-3xl font-medium'>All Users </h1>
      <div className='flex flex-col gap-5 mt-5 w-[40rem] max-h-[calc(100vh-12rem)] overflow-y-auto'>


        {/* <CompleteUserDetails date={ } id={ } name={ } score={ } key={} /> */}

      </div>
    </div>
  )
}

export default ShowAllUsersPage