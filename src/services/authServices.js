import { api } from "../config/api";

export const authService = {
  // Student login
  studentLogin: async (loginData) => {
    try {
      const response = await api.post('/auth/signin', loginData);
      return response.data;
    } catch (error) {
      console.log('login error', error)
      throw error;
    }
  },

  // Student registration
  studentRegister: async (registerData) => {
    try {
      const response = await api.post('/auth/signup', registerData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get student profile
  getStudentProfile: async () => {
    try {
      const response = await api.get('/student/profile');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update student profile
  updateStudentProfile: async (profileData) => {
    try {
      const response = await api.put('/student/profile', profileData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Change password
  changePassword: async (passwordData) => {
    try {
      const response = await api.put('/student/change-password', passwordData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Forgot password
  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    try {
      const response = await api.post('/auth/reset-password', {
        token,
        newPassword
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default authService;