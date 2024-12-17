import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminBadge, GreenBadge, LoginButton, LogoutButton } from './Buttons'
import { AdminContext } from '../context/AdminContext'


const Navbar = () => {
  const navigate = useNavigate()

  const handleNavigate = (path) => {
    navigate(path);
  };


  const { isLoggedIn, setIsLoggedIn } = useContext(AdminContext);


  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/admin/login')
  }

  return (
    <>
      <nav className='flex w-full justify-center sm:justify-between  sm:px-10 md:px-32 lg:px-40  bg-dark2 bg-opacity-100  items-center py-3  z-20 shadow sticky top-0 border-b border-gray-500  border-opacity-50'>
        <div className='' >
          <h1 onClick={() => handleNavigate('/')} className='text-dark text-center md:text-start cursor-pointer text-[1.75rem] md:text-[2rem] font-poppins font-bold md:font-semibold flex items-center gap-1'>
            QuizzX <AdminBadge />
          </h1>
        </div>
        {
          !isLoggedIn ? <div onClick={() => handleNavigate('/admin/login')} className='hidden sm:block'>
            <LoginButton />
          </div> :
            <div onClick={handleLogout} className='hidden sm:block'>
              <LogoutButton />
            </div>
        }
        {/* <div className='md:hidden'>
        <i className="fa-solid fa-bars fa-xl"></i>
        </div> */}
      </nav>
    </>
  )
}

export default Navbar