import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoToHomeButton } from '../components/Buttons';

const AfterQuizSubmitPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative max-h-screen flex flex-col gap-1 items-center pt-24 md:pt-28 bg-light text-dark">

      {/* Background Shapes with Blur (same as HomePage) */}
      <div className="fixed  top-0 left-0 w-full h-full z-[-10] overflow-hidden">
        <div className="absolute top-28 left-2 w-40 h-40 bg-Ngreen rounded-full blur-[85px] animate-pulse opacity-50"></div>
        <div className="absolute bottom-0 -right-5 w-40 h-40 md:w-56 md:h-56 bg-Ngreen rounded-full blur-[85px] animate-pulse opacity-50"></div>
      </div>

      {/* Content Section */}
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-200 mb-4 text-center tracking-wide md:tracking-wider">Thank you!</h1>
      <h1 className="text-4xl md:text-5xl  font-bold text-gray-200 mb-4 text-center tracking-wide">{localStorage.getItem('name')}</h1>
      <p className="md:text-lg tracking-tight text-center text-gray-400 mb-6 mx-5">
        {/* We’re grateful for your participation! */}
        Screenshot this and find your name in leaderboad.
      </p>

      {/* Home Button */}
      <div onClick={() => navigate('/')} className="mt-4 cursor-pointer">
        <GoToHomeButton />
      </div>
    </div>
  );
};

export default AfterQuizSubmitPage;
