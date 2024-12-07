import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from './pages/HomePage';
import QuizzesPage from './pages/QuizzesPage';
import CreateAccountPage from './pages/CreateAccountPage';
import ErrorPage from './pages/ErrorPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AttendQuizPage from './pages/AttendQuizPage';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/all-quizzes" element={<QuizzesPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/quiz/:id" element={<AttendQuizPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {/* <Footer /> */}

    </>
  )
}

export default App