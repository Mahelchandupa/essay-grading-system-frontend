import { api } from "../config/api";
import { handleApiError } from "../utils/errorHandler";

export const dashboardService = {
  // Get Student Profile
  getStudentProfile: async () => {
    try {
      const response = await api.get("/students");
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Student Progress
  getStudentProgress: async () => {
    try {
      const response = await api.get("/students/progress");
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Fetch achievements
  fetchAchievements: async () => {
    try {
       const response = await api.get('/achievements');
       return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
  },

  fetchAnalytics: async () => {
    try {
      const response = await api.get(`/analytics/student`);
      return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
  },

  fetchWritingTips: async () => {
    try {
      const response = await api.get(`/analytics/writing-tips`);
      return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
  }
};
