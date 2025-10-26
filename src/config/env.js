// Environment configuration utility
export const getEnv = (key, defaultValue = '') => {
  // For Vite (client-side)
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key] || defaultValue;
  }
  
  // For Node.js (server-side)
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || defaultValue;
  }
  
  return defaultValue;
};

// Commonly used environment variables
export const env = {
  API_URL: getEnv('VITE_API_URL', 'http://localhost:5003/api'),
  APP_NAME: getEnv('VITE_APP_NAME', 'AcademicWrite'),
  NODE_ENV: getEnv('VITE_NODE_ENV', 'development'),
};