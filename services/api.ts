// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// Helper function to handle API responses
async function handleResponse(response: Response) {
  const data = await response.json();
  if (!response.ok) {
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }
  return data;
}

// Generic API request function
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const headers = {
    'Content-Type': 'application/json',
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

// Add more API modules as needed (auth, blog, etc.)
export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  register: (userData: any) =>
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  getCurrentUser: () => apiRequest('/auth/me'),
};

export default {
  courses: coursesApi,
  auth: authApi,
};
