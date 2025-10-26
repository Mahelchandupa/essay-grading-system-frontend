// Error handler for API responses
export class APIError extends Error {
  constructor(message, code, statusCode, details = null) {
    super(message);
    this.name = 'APIError';
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    this.timestamp = new Date().toISOString();
  }
}

// Extract error message from various error formats
export const getErrorMessage = (error) => {
  // If it's already our APIError
  if (error instanceof APIError) {
    return error.message;
  }

  // If it's our standardized backend error format
  if (error.response?.data?.error?.message) {
    return error.response.data.error.message; // Add .message here
  }

  // If it's axios error with response
  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  // If it's a network error
  if (error.message === 'Network Error') {
    return 'Unable to connect to server. Please check your internet connection.';
  }

  // Generic error message
  return error.message || 'Something went wrong. Please try again.';
};

// Extract error code
export const getErrorCode = (error) => {
  if (error instanceof APIError) return error.code;
  if (error.response?.data?.error?.code) return error.response.data.error.code;
  return 'UNKNOWN_ERROR';
};

// Extract status code
export const getErrorStatusCode = (error) => {
  if (error instanceof APIError) return error.statusCode;
  if (error.response?.status) return error.response.status;
  if (error.response?.data?.error?.statusCode) return error.response.data.error.statusCode;
  return 500;
};

// Check if error is specific type
export const isErrorType = (error, errorCode) => {
  return getErrorCode(error) === errorCode;
};

// Common error checks
export const isAuthError = (error) => {
  const code = getErrorCode(error);
  return ['UNAUTHORIZED', 'TOKEN_EXPIRED', 'INVALID_TOKEN'].includes(code);
};

export const isValidationError = (error) => {
  return getErrorCode(error) === 'VALIDATION_ERROR';
};

export const isNotFoundError = (error) => {
  return getErrorCode(error) === 'NOT_FOUND';
};

// Convert axios error to standardized APIError
export const handleApiError = (error) => {
  if (error.response?.data?.error) {
    const { message, code, statusCode, details } = error.response.data.error;
    return new APIError(message, code, statusCode, details);
  }
  
  return new APIError(
    getErrorMessage(error),
    getErrorCode(error),
    getErrorStatusCode(error)
  );
};