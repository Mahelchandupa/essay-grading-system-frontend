// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { User, Mail, Lock, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';
// import axios from 'axios';

// const Register = ({ onRegisterSuccess }) => {
//   const [formData, setFormData] = useState({
//     studentId: '',
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [validationErrors, setValidationErrors] = useState({});
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//     setError('');
//     setValidationErrors({});
//   };

//   const validateForm = () => {
//     const errors = {};

//     if (formData.studentId.length < 3) {
//       errors.studentId = 'Student ID must be at least 3 characters';
//     }

//     if (formData.name.length < 2) {
//       errors.name = 'Name must be at least 2 characters';
//     }

//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       errors.email = 'Please enter a valid email address';
//     }

//     if (formData.password.length < 6) {
//       errors.password = 'Password must be at least 6 characters';
//     }

//     if (formData.password !== formData.confirmPassword) {
//       errors.confirmPassword = 'Passwords do not match';
//     }

//     setValidationErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const response = await axios.post('/api/auth/signup', {
//         studentId: formData.studentId,
//         name: formData.name,
//         email: formData.email,
//         password: formData.password
//       });
      
//       const { token, student } = response.data;
      
//       // Store token in localStorage
//       localStorage.setItem('authToken', token);
//       localStorage.setItem('studentData', JSON.stringify(student));
      
//       // Set axios default header
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
//       // Call success callback
//       if (onRegisterSuccess) {
//         onRegisterSuccess(student);
//       }
      
//       // Redirect to dashboard
//       navigate('/');
      
//     } catch (err) {
//       setError(err.response?.data?.error || 'Registration failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
//             <UserPlus className="w-8 h-8 text-white" />
//           </div>
//           <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
//           <p className="text-gray-600 mt-2">Join us to start improving your essays</p>
//         </div>

//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
//             <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
//             <p className="text-sm text-red-800">{error}</p>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Student ID
//             </label>
//             <div className="relative">
//               <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type="text"
//                 name="studentId"
//                 value={formData.studentId}
//                 onChange={handleChange}
//                 required
//                 className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                   validationErrors.studentId ? 'border-red-300' : 'border-gray-300'
//                 }`}
//                 placeholder="STU001"
//               />
//             </div>
//             {validationErrors.studentId && (
//               <p className="text-xs text-red-600 mt-1">{validationErrors.studentId}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Full Name
//             </label>
//             <div className="relative">
//               <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                   validationErrors.name ? 'border-red-300' : 'border-gray-300'
//                 }`}
//                 placeholder="John Doe"
//               />
//             </div>
//             {validationErrors.name && (
//               <p className="text-xs text-red-600 mt-1">{validationErrors.name}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Email Address
//             </label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                   validationErrors.email ? 'border-red-300' : 'border-gray-300'
//                 }`}
//                 placeholder="student@example.com"
//               />
//             </div>
//             {validationErrors.email && (
//               <p className="text-xs text-red-600 mt-1">{validationErrors.email}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                   validationErrors.password ? 'border-red-300' : 'border-gray-300'
//                 }`}
//                 placeholder="Minimum 6 characters"
//               />
//             </div>
//             {validationErrors.password && (
//               <p className="text-xs text-red-600 mt-1">{validationErrors.password}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Confirm Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 required
//                 className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                   validationErrors.confirmPassword ? 'border-red-300' : 'border-gray-300'
//                 }`}
//                 placeholder="Re-enter your password"
//               />
//             </div>
//             {validationErrors.confirmPassword && (
//               <p className="text-xs text-red-600 mt-1">{validationErrors.confirmPassword}</p>
//             )}
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
//           >
//             {loading ? (
//               <>
//                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                 Creating account...
//               </>
//             ) : (
//               <>
//                 <UserPlus className="w-5 h-5" />
//                 Create Account
//               </>
//             )}
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           <p className="text-sm text-gray-600">
//             Already have an account?{' '}
//             <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
//               Sign in here
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, UserPlus, AlertCircle, CheckCircle, GraduationCap, BookOpen } from 'lucide-react';
import axios from 'axios';

const Register = ({ onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setValidationErrors({});
  };

  const validateForm = () => {
    const errors = {};

    if (formData.studentId.length < 3) {
      errors.studentId = 'Student ID must be at least 3 characters';
    }

    if (formData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid academic email address';
    }

    if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/auth/signup', {
        studentId: formData.studentId,
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      const { token, student } = response.data;
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('studentData', JSON.stringify(student));
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      if (onRegisterSuccess) {
        onRegisterSuccess(student);
      }
      
      navigate('/');
      
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl mb-6">
            <UserPlus className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Create Academic Account</h1>
          <p className="text-lg text-gray-600">Join thousands of students improving their writing skills</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            {/* Student ID */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Student ID
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                  className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                    validationErrors.studentId ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="STU001"
                />
              </div>
              {validationErrors.studentId && (
                <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {validationErrors.studentId}
                </p>
              )}
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                    validationErrors.name ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="John Doe"
                />
              </div>
              {validationErrors.name && (
                <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {validationErrors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                    validationErrors.email ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="student@university.edu"
                />
              </div>
              {validationErrors.email && (
                <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {validationErrors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                    validationErrors.password ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="Minimum 6 characters"
                />
              </div>
              {validationErrors.password && (
                <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {validationErrors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                    validationErrors.confirmPassword ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="Re-enter your password"
                />
              </div>
              {validationErrors.confirmPassword && (
                <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {validationErrors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    Create Academic Account
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { icon: <BookOpen className="w-6 h-6 text-blue-600" />, text: 'AI Essay Grading' },
            { icon: <GraduationCap className="w-6 h-6 text-blue-600" />, text: 'Personalized Feedback' },
            { icon: <User className="w-6 h-6 text-blue-600" />, text: 'Progress Tracking' },
            { icon: <CheckCircle className="w-6 h-6 text-blue-600" />, text: 'Academic Standards' }
          ].map((benefit, index) => (
            <div key={index} className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mb-2">
                {benefit.icon}
              </div>
              <p className="text-xs font-medium text-gray-700">{benefit.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Register;