import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoToHomeButton } from '../components/Buttons';

const AfterQuizSubmitPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center pt-28 md:pt-40 bg-light text-dark">
      <h1 className="text-4xl font-bold mb-4">Quiz Submitted!</h1>
      <p className="text-lg mb-6 text-center text-gray-900">
        Thank you for participating! Your responses have been recorded successfully.
      </p>
      <div
        onClick={() => navigate('/')}
        
      >
        <GoToHomeButton/>
      </div>
    </div>
  );
};

export default AfterQuizSubmitPage;
