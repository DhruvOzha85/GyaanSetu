/**
 * GyaanSetu — Global Error Handler Utilities
 */

/**
 * Extracts a human-readable error message from various error shapes
 * (Axios errors, native JS errors, string errors, etc.)
 * @param {*} error
 * @returns {string}
 */
export const getErrorMessage = (error) => {
  // String error
  if (typeof error === 'string') return error;

  // Axios error with server response
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  // Axios error with server response (array of messages)
  if (error?.response?.data?.errors) {
    const errors = error.response.data.errors;
    if (Array.isArray(errors)) {
      return errors.map((e) => e.message || e.msg || e).join('. ');
    }
  }

  // Axios error with status text
  if (error?.response?.statusText) {
    return error.response.statusText;
  }

  // Network error (no response from server)
  if (error?.code === 'ERR_NETWORK' || error?.message === 'Network Error') {
    return 'No internet connection. Please check your network and try again.';
  }

  // Timeout error
  if (error?.code === 'ECONNABORTED') {
    return 'Request timed out. Please try again.';
  }

  // Native JS error
  if (error?.message) {
    return error.message;
  }

  // Fallback
  return 'Something went wrong. Please try again later.';
};

/**
 * Maps HTTP status codes to user-friendly messages.
 * @param {number} status
 * @returns {string}
 */
export const getStatusMessage = (status) => {
  const messages = {
    400: 'Bad request. Please check your inputs.',
    401: 'Session expired. Please login again.',
    403: "You don't have permission to do that.",
    404: 'Resource not found.',
    409: 'This resource already exists.',
    422: 'Validation failed. Please check your inputs.',
    429: 'Too many requests. Please wait a moment.',
    500: 'Server error. Please try again later.',
    502: 'Service temporarily unavailable.',
    503: 'Service is under maintenance. Please try later.',
  };
  return messages[status] || 'An unexpected error occurred.';
};

/**
 * Determines if an error is a network/connectivity error.
 * @param {*} error
 * @returns {boolean}
 */
export const isNetworkError = (error) => {
  return (
    error?.code === 'ERR_NETWORK' ||
    error?.message === 'Network Error' ||
    !error?.response
  );
};
