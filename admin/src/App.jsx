import { Routes, Route, Navigate } from "react-router-dom"
import AdminHomePage from './pages/AdminHomePage';
import AdminAllQuizzesPage from './pages/AdminAllQuizzesPage';
import CreateQuizPage from './pages/CreateQuizPage';
import EditQuizPage from './pages/EditQuizPage';
import ShowAllUsersPage from './pages/ShowAllUsersPage';
import QuizDetailsPage from './pages/QuizDetailsPage';
import ErrorPage from './pages/ErrorPage';
import Navbar from './components/Navbar';
import AdminLoginPage from './pages/AdminLoginPage';

const App = () => {
    return (
        <div>
        <Navbar/>
            <Routes>
                <Route path="/" element={<Navigate to="/admin/login" />} />
                <Route path="/home" element={<AdminHomePage />} />
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/all-quizzes" element={<AdminAllQuizzesPage />} />
                <Route path="/create-quiz" element={<CreateQuizPage />} />
                <Route path="/edit-quiz/:id" element={<EditQuizPage />} />
                <Route path="/users" element={<ShowAllUsersPage />} />
                <Route path="/quiz/details/:id" element={<QuizDetailsPage />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </div>
    )
}

export default App