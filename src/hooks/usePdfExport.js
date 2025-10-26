import { useState } from 'react';
import { exportEssayFeedbackPDF } from '../utils/pdfExport';

export const usePdfExport = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  const exportFeedbackPDF = async (essayData, studentData, options = {}) => {
    setIsExporting(true);
    setExportProgress(0);

    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setExportProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      const result = await exportEssayFeedbackPDF(essayData, studentData, options);

      clearInterval(progressInterval);
      setExportProgress(100);

      setTimeout(() => {
        setIsExporting(false);
        setExportProgress(0);
      }, 1000);

      return result;
    } catch (error) {
      setIsExporting(false);
      setExportProgress(0);
      throw error;
    }
  };

  return {
    isExporting,
    exportProgress,
    exportFeedbackPDF,
  };
};