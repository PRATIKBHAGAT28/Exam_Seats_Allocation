import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import StudentDashboard from './pages/student/StudentDashboard';
import ProfessorDashboard from './pages/professor/ProfessorDashboard';
import CreateExam from './pages/professor/CreateExam';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/student/dashboard"
          element={
            isAuthenticated && user.role === 'student' ?
            <StudentDashboard /> :
            <Navigate to="/login" />
          }
        />

        <Route
          path="/professor/dashboard"
          element={
            isAuthenticated && user.role === 'professor' ?
            <ProfessorDashboard /> :
            <Navigate to="/login" />
          }
        />
        <Route
          path="/professor/create-exam"
          element={
            isAuthenticated && user.role === 'professor' ?
            <CreateExam /> :
            <Navigate to="/login" />
          }
        />

        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
