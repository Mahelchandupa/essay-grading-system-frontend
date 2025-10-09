import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import EssayUpload from './components/EssayUpload';
import EssayFeedback from './components/EssayFeedback';
import StudentDashboard from './components/StudentDashboard';
import axios from 'axios';
import Header from './components/Header';

// Configure axios
axios.defaults.baseURL = 'http://localhost:5000'; //  process.env.REACT_APP_API_URL || 

// Setup axios interceptor for authentication
const token = localStorage.getItem('authToken');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Add response interceptor to handle 401 errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('studentData');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  const [feedbackData, setFeedbackData] = useState(null);

  // get student data from localStorage if available
  const [student, setStudent] = useState(
    localStorage.getItem('studentData') ? JSON.parse(localStorage.getItem('studentData')) : null
  );

  console.log('Student Data:', student);

  useEffect(() => {
    // Load student data from localStorage
    const storedStudent = localStorage.getItem('studentData');
    if (storedStudent) {
      setStudent(JSON.parse(storedStudent));
    }
  }, []);

  const handleLoginSuccess = (studentData) => {
    setStudent(studentData);
  };

  const handleRegisterSuccess = (studentData) => {
    setStudent(studentData);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('studentData');
    delete axios.defaults.headers.common['Authorization'];
    setStudent(null);
    setFeedbackData(null);
  };

  const handleSubmitSuccess = (data) => {
    setFeedbackData(data);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Bar (only show when authenticated) */}
        {student && (
          // <nav className="bg-white shadow-sm border-b border-gray-200">
          //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          //     <div className="flex justify-between h-16 items-center">
          //       <div className="flex items-center">
          //         <h1 className="text-xl font-bold text-gray-900">
          //           Essay Grading System
          //         </h1>
          //       </div>
          //       <div className="flex items-center gap-6">
          //         <div className="text-sm">
          //           <span className="text-gray-600">Welcome, </span>
          //           <span className="font-semibold text-gray-900">{student.name}</span>
          //           <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
          //             student.level === 'advanced' ? 'bg-green-100 text-green-800' :
          //             student.level === 'intermediate' ? 'bg-purple-100 text-purple-800' :
          //             'bg-blue-100 text-blue-800'
          //           }`}>
          //             {student.level}
          //           </span>
          //         </div>
          //         <a href="/" className="text-gray-600 hover:text-gray-900">
          //           Submit Essay
          //         </a>
          //         <a href="/dashboard" className="text-gray-600 hover:text-gray-900">
          //           Dashboard
          //         </a>
          //         <button
          //           onClick={handleLogout}
          //           className="text-red-600 hover:text-red-700 font-medium"
          //         >
          //           Logout
          //         </button>
          //       </div>
          //     </div>
          //   </div>
          // </nav>
          <Header student={student} onLogout={handleLogout} />
        )}

        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/register" element={<Register onRegisterSuccess={handleRegisterSuccess} />} />

          {/* Protected Routes */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                {feedbackData ? (
                  <EssayFeedback feedbackData={feedbackData} />
                ) : (
                  <EssayUpload 
                    studentId={student?.id} 
                    onSubmitSuccess={handleSubmitSuccess}
                  />
                )}
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <StudentDashboard studentId={student?.id} />
              </ProtectedRoute>
            } 
          />

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;