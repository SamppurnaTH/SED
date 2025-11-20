// Base API configuration
const API_BASE_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}${import.meta.env.VITE_API_BASE_PATH || '/api'}`;

// Store CSRF token
let csrfToken: string | null = null;

// Function to get CSRF token
const getCsrfToken = async (): Promise<string> => {
  if (csrfToken) return csrfToken;
  
  try {
    const response = await fetch(`${API_BASE_URL}/csrf-token`, {
      credentials: 'include',
    });
    const data = await response.json();
    csrfToken = data.csrfToken;
    return csrfToken;
  } catch (error) {
    console.error('Failed to fetch CSRF token:', error);
    throw new Error('Failed to initialize CSRF protection');
  }
};

// Helper function to handle API responses
async function handleResponse(response: Response) {
  const contentType = response.headers.get('content-type');
  let data;
  
  // If unauthorized, clear token and redirect to login
  if (response.status === 401) {
    localStorage.removeItem('student_session_token');
    window.location.href = '/login';
  }

  try {
    // Only try to parse as JSON if the content-type is application/json
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      // If the response is not JSON, get the text instead
      const text = await response.text();
      return text || response.statusText;
    }
    
    if (!response.ok) {
      const error = (data && (data.message || data.error)) || response.statusText || 'Unknown error occurred';
      return Promise.reject(new Error(error));
    }
    
    return data;
  } catch (error) {
    console.error('Error parsing response:', error);
    return Promise.reject(new Error('Invalid response from server'));
  }
}

// Generic API request function
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  // Ensure CSRF token is available for mutating requests
  const method = options.method?.toUpperCase() || 'GET';
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    try {
      const token = await getCsrfToken();
      options.headers = {
        ...options.headers,
        'X-CSRF-Token': token,
      };
    } catch (error) {
      console.error('CSRF token not available:', error);
      throw new Error('Security token not available');
    }
  }

  // Add authorization header if token exists
  const token = localStorage.getItem('student_session_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const config: RequestInit = {
    ...options,
    headers,
    credentials: 'include' as const, // Important for cookies/sessions
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    return handleResponse(response);
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// API methods for authentication
export const authApi = {
  // Student authentication
  login: async (credentials: { email: string; password: string }) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    // Save token if received
    if (response.token) {
      localStorage.setItem('student_session_token', response.token);
    }
    
    return response;
  },
  
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    acceptTerms: boolean;
  }) => {
    const response = await apiRequest('/auth/register/student', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    // Save token if received
    if (response.token) {
      localStorage.setItem('student_session_token', response.token);
    }
    
    return response;
  },
  
  logout: async () => {
    try {
      await apiRequest('/auth/logout', { method: 'POST' });
    } finally {
      // Always clear local storage and token
      localStorage.removeItem('student_session_token');
      // The auth token is already managed by the apiRequest function
      // No need to manually delete from headers
    }
  },
  
  getCurrentUser: async () => {
    try {
      return await apiRequest('/auth/me/student');
    } catch (error) {
      if (error.message.includes('401')) {
        localStorage.removeItem('student_session_token');
        return null;
      }
      throw error;
    }
  },
  
  requestPasswordReset: (email: string) =>
    apiRequest('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
    
  resetPassword: (token: string, password: string) =>
    apiRequest('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    }),
};

// API methods for courses
export const coursesApi = {
  getAll: () => apiRequest('/courses'),
  getBySlug: (slug: string) => apiRequest(`/courses/${slug}`),
  create: (data: any) => 
    apiRequest('/courses', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (slug: string, data: any) =>
    apiRequest(`/courses/${slug}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (slug: string) =>
    apiRequest(`/courses/${slug}`, {
      method: 'DELETE',
    }),
};

// Export API instance
export const api = {
  courses: coursesApi,
  auth: authApi,
  
  // Helper to set auth token
  setAuthToken: (token: string | null) => {
    if (token) {
      localStorage.setItem('student_session_token', token);
    } else {
      localStorage.removeItem('student_session_token');
    }
  },
  
  // Helper to get auth token
  getAuthToken: (): string | null => {
    return localStorage.getItem('student_session_token');
  },
};

export default api;
