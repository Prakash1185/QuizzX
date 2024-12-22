import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from './pages/HomePage';
import QuizzesPage from './pages/QuizzesPage';
import CreateAccountPage from './pages/CreateAccountPage';
import ErrorPage from './pages/ErrorPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AttendQuizPage from './pages/AttendQuizPage';
import AfterQuizSubmitPage from "./pages/AfterQuizSubmitPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/all-quizzes" element={<QuizzesPage />} />
        <Route path="/:quizId/create-account" element={<CreateAccountPage />} />
        <Route path="/quiz/:quizId" element={<AttendQuizPage />} />
        <Route path="/quiz/:quizId/leaderboard" element={<LeaderboardPage />} />
        <Route path="/quiz/:quizId/success" element={<AfterQuizSubmitPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {/* <Footer /> */}
      <ToastContainer theme="dark" />
    </div>
  )
}

export default App