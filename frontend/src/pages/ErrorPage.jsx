import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoToHomeButton } from '../components/Buttons';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center max-h-screen bg-dark text-light overflow-hidden pt-24 md:pt-24 gap-2">
      {/* Background Shapes with Blur */}
      <div className="fixed  top-0 left-0 w-full h-full z-[-10] overflow-hidden">
          <div className="absolute top-28 left-2 w-40 h-40 bg-Ngreen rounded-full blur-[85px] animate-pulse opacity-50"></div>
          <div className="absolute bottom-0 -right-5 w-40 h-40 md:w-56 md:h-56 bg-Ngreen rounded-full blur-[85px] animate-pulse opacity-50"></div>
        </div>

      <h1 className="text-5xl md:text-7xl sm:text-5xl  font-bold text-gray-200 md:tracking-wide text-center mx-[5%] md:mx-[10%] py-2 md:py-5 leading-snug">
        <span className="text-transparent bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text pr-4">
          Error 404
        </span>
      </h1>

      <p className="text-xl mx-5 mb-6 text-center text-gray-300">
        The page you're looking for doesn't exist.
      </p>

      <div className='z-50' onClick={() => navigate('/home')}>
        <GoToHomeButton />
      </div>
    </div>
  );
};

export default ErrorPage;
