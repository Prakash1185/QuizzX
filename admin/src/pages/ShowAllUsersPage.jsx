import React, { useContext, useEffect } from 'react'
import CompleteUserDetails from '../components/CompleteUserDetails'
import { AdminContext } from '../context/AdminContext'
import { handleError, handleSuccess } from '../components/ToastMessages'


const ShowAllUsersPage = () => {

  const { BackendURL, getAllUsers, users } = useContext(AdminContext)



  const handleUserDeleteAllUsers = async () => {
    try {
      const response = await fetch(`${BackendURL}/user/delete`, {
        method: 'DELETE',
        headers: {
          'Authorization': localStorage.getItem('token'),
        },
      });
      const result = await response.json();
      const { success, message } = result;
      if (success) {
        handleSuccess(message);
        getAllUsers();
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError(error.message);
    }
  };


  useEffect(() => {
    getAllUsers()
  }, [])


  return (
    <div className='mx-10 py-5'>
      <div className=' space-x-5'>
        <h1 className=' text-3xl font-medium inline-block'>All Users </h1>
        <h1 className='inline-block'>
          <button onClick={handleUserDeleteAllUsers} className='bg-red-600 hover:bg-red-700 transition-all duration-300 px-3 py-1 text-white rounded-md mt-5'>Delete all
          </button>
        </h1>
      </div>
      <div className='flex flex-col gap-5 mt-5 w-[40rem] max-h-[calc(100vh-12rem)] overflow-y-auto'>

        {
          users.length === 0 ? (
            <p className='text-xl'>No users found</p> // Display message when there are no users
          ) : (
            users.map((user) => {
              return (
                <CompleteUserDetails
                  key={user._id}
                  date={new Date(user.date).toLocaleDateString()}
                  time={new Date(user.date).toLocaleTimeString()}
                  id={user._id}
                  name={user.name}
                  score={user.score}
                  getAllUsers={getAllUsers}
                />
              );
            })
          )
        }



      </div>
    </div>
  )
}

export default ShowAllUsersPage