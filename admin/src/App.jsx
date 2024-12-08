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
import Sidebar from "./components/Sidebar";

const App = () => {
    return (
        <div>
        <Navbar/>
        <div className="flex items-start">
        <Sidebar/>
        <Routes>
                <Route path="/" element={<Navigate to="/admin/login" />} />
                <Route path="/admin/home" element={<AdminHomePage />} />
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin/all-quizzes" element={<AdminAllQuizzesPage />} />
                <Route path="/admin/create-quiz" element={<CreateQuizPage />} />
                <Route path="/admin/edit-quiz/:id" element={<EditQuizPage />} />
                <Route path="/admin/users-list" element={<ShowAllUsersPage />} />
                <Route path="/admin/quiz/details/:id" element={<QuizDetailsPage />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </div>
        </div>
    )
}

export default App