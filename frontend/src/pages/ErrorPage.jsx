import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoToHomeButton } from '../components/Buttons';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center pt-28 md:pt-40 bg-light text-dark">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6 px-2 text-center text-gray-900">Oops! The page you're looking for doesn't exist.</p>
      <div
        onClick={() => navigate('/home')}
              >
        <GoToHomeButton/>
      </div>
    </div>
  );
};

export default ErrorPage;
