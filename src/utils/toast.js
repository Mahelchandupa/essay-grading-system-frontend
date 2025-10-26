import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Dark theme configuration - applied globally
const toastConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  style: {
    background: '#1f2937',
    color: '#f9fafb',
    border: '1px solid #374151',
    borderRadius: '12px',
    fontFamily: 'inherit',
    fontSize: '12px'
  },
  progressStyle: {
    background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
  }
};

// Configure toast globally
export const configureToast = () => {
  return toastConfig;
};

// Simple toast functions - only message and type
export const showToast = (message, type = 'info') => {
  const config = {
    ...toastConfig,
    style: {
      ...toastConfig.style,
      border: getBorderColor(type),
    },
    progressStyle: {
      ...toastConfig.progressStyle,
      background: getProgressColor(type),
    }
  };

  switch (type) {
    case 'success':
      toast.success(message, config);
      break;
    case 'error':
      toast.error(message, config);
      break;
    case 'warning':
      toast.warning(message, config);
      break;
    case 'info':
      toast.info(message, config);
      break;
    default:
      toast(message, config);
  }
};

// Helper functions for colors
const getBorderColor = (type) => {
  const colors = {
    success: '1px solid #10b981',
    error: '1px solid #ef4444',
    warning: '1px solid #f59e0b',
    info: '1px solid #3b82f6'
  };
  return colors[type] || '1px solid #374151';
};

const getProgressColor = (type) => {
  const colors = {
    success: 'linear-gradient(to right, #10b981, #059669)',
    error: 'linear-gradient(to right, #ef4444, #dc2626)',
    warning: 'linear-gradient(to right, #f59e0b, #d97706)',
    info: 'linear-gradient(to right, #3b82f6, #1d4ed8)'
  };
  return colors[type] || 'linear-gradient(to right, #3b82f6, #8b5cf6)';
};

// Specific toast functions for common use cases
export const showSuccessToast = (message) => showToast(message, 'success');
export const showErrorToast = (message) => showToast(message, 'error');
export const showWarningToast = (message) => showToast(message, 'warning');
export const showInfoToast = (message) => showToast(message, 'info');

// Session expired specific toast
export const showSessionExpiredToast = () => {
  showWarningToast('Session expired. Please login again.');
};

export default {
  success: showSuccessToast,
  error: showErrorToast,
  warning: showWarningToast,
  info: showInfoToast,
  sessionExpired: showSessionExpiredToast,
  show: showToast
};