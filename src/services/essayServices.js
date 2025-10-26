import { api } from "../config/api";

export const essayService = {
  // Upload new essay
  uploadEssay: async (essayData) => {
    try {
      const response = await api.post('/essays/grade', essayData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get all essays for student
  getStudentEssays: async () => {
    try {
      const response = await api.get(`/essays/student`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get specific essay details
  getEssayDetails: async (essayId) => {
    try {
      const response = await api.get(`/essays/${essayId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get essay feedback
  getEssayFeedback: async (essayId) => {
    try {
      const response = await api.get(`/essays/${essayId}/feedback`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete essay
  deleteEssay: async (essayId) => {
    try {
      const response = await api.delete(`/essays/${essayId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update essay
  updateEssay: async (essayId, essayData) => {
    try {
      const response = await api.put(`/essays/${essayId}`, essayData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default essayService;
