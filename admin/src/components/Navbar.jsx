import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AdminBadge, LoginButton, LogoutButton } from './Buttons';
import { AdminContext } from '../context/AdminContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AdminContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsSidebarOpen(false); // Close sidebar on logout
    navigate('/admin/login');
  };

  // Reset sidebar state when logged in status changes
  useEffect(() => {
    if (isLoggedIn) {
      setIsSidebarOpen(false);
    }
  }, [isLoggedIn]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="flex w-full justify-around sm:justify-between sm:px-10 md:px-20 lg:px-40 bg-dark2 bg-opacity-100 items-center py-3 z-20 shadow sticky top-0 border-b border-gray-500 border-opacity-50">
        <div>
          <h1
            onClick={() => handleNavigate('/')}
            className="text-dark text-center md:text-start cursor-pointer text-[1.75rem] md:text-[2rem] font-poppins font-bold md:font-semibold flex items-center gap-1"
          >
            QuizzX <AdminBadge />
          </h1>
        </div>

        {/* Show Logout Button if logged in */}
        {isLoggedIn && (
          <div onClick={handleLogout} className="hidden sm:block">
            <LogoutButton />
          </div>
        )}

        {/* Show Login Button if not logged in */}
        {!isLoggedIn && (
          <div onClick={() => handleNavigate('/admin/login')} className="sm:block">
            <LoginButton />
          </div>
        )}

        {/* Show Bars (Hamburger or Close Icon) if logged in */}
        {isLoggedIn && (
          <div className="sm:hidden" onClick={toggleSidebar}>
            <i
              className={`fa-solid ${isSidebarOpen ? 'fa-xmark' : 'fa-bars'
                } fa-xl w-6 h-6 flex items-center justify-center border bg-Dgreen bg-opacity-30 cursor-pointer border-Dgreen p-[1.1rem] rounded-md`}
            ></i>
          </div>
        )}
      </nav>

      {/* MOBILE NAVIGATION BAR */}
      {isLoggedIn && (
        <div
          className={`sm:hidden bg-dark2 w-[60%] h-full fixed inset-y-0 left-0 z-10 border-r border-gray-500 border-opacity-10 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          <ul className="text-gray-200 mt-24 text-lg font-medium">
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 sm:min-w-52 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-Ngreen bg-opacity-80' : ''
                }`
              }
              to="/admin/home"
            >
              <p>Home</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 sm:min-w-52 md:min-w-72 cursor-pointer ${isActive ? 'bg-Ngreen bg-opacity-80' : ''
                }`
              }
              to="/admin/all-quizzes"
            >
              <p>All Quizzes</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 sm:min-w-52 md:min-w-72 cursor-pointer ${isActive ? 'bg-Ngreen bg-opacity-80' : ''
                }`
              }
              to="/admin/create-quiz"
            >
              <p>Create Quiz</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 sm:min-w-52 md:min-w-72 cursor-pointer ${isActive ? 'bg-Ngreen bg-opacity-80' : ''
                }`
              }
              to="/admin/users-list"
            >
              <p>Users</p>
            </NavLink>

            {/* Show Logout Button in the sidebar if logged in */}
            <div onClick={handleLogout} className="mt-10 ml-2">
              <LogoutButton />
            </div>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
