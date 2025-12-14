import axios from 'axios';



// Get auth token from localStorage
const getAuthToken = () => {
    return localStorage.getItem('token');
};

// Configure axios instance with auth
const API_URL = 'http://localhost:5000/api';

// Configure axios instance with auth
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = getAuthToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Get dashboard statistics
export const getDashboardStats = async () => {
    try {
        const response = await api.get('/admin/dashboard/stats');
        return response.data;
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        throw error;
    }
};

// Get recent enrollments
export const getRecentEnrollments = async (limit = 10) => {
    try {
        const response = await api.get(`/admin/dashboard/enrollments/recent?limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching recent enrollments:', error);
        throw error;
    }
};

// Get all students
export const getAllStudents = async () => {
    try {
        const response = await api.get('/admin/dashboard/students');
        return response.data;
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
};

// Get all instructors
export const getAllInstructors = async () => {
    try {
        const response = await api.get('/admin/dashboard/instructors');
        return response.data;
    } catch (error) {
        console.error('Error fetching instructors:', error);
        throw error;
    }
};

// Get all courses
export const getAllCourses = async () => {
    try {
        const response = await api.get('/admin/dashboard/courses');
        return response.data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error;
    }
};

// Get analytics data
export const getAnalytics = async () => {
    try {
        const response = await api.get('/admin/dashboard/analytics');
        return response.data;
    } catch (error) {
        console.error('Error fetching analytics:', error);
        throw error;
    }
};

// --- Action Methods ---

// Create a new course
export const createCourse = async (courseData: any) => {
    try {
        const response = await api.post('/courses', courseData);
        return response.data;
    } catch (error) {
        console.error('Error creating course:', error);
        throw error;
    }
};

// Bulk delete courses
export const deleteCourses = async (ids: (string | number)[]) => {
    try {
        const response = await api.delete('/courses/bulk', { data: { ids } });
        return response.data;
    } catch (error) {
        console.error('Error deleting courses:', error);
        throw error;
    }
};

// Suspend students
export const suspendStudents = async (ids: (string | number)[]) => {
    try {
        const response = await api.post('/admin/users/suspend', { ids, status: 'Inactive' });
        return response.data;
    } catch (error) {
        console.error('Error suspending students:', error);
        throw error;
    }
};

// Delete students
export const deleteStudents = async (ids: (string | number)[]) => {
    try {
        const response = await api.delete('/admin/users', { data: { ids } });
        return response.data;
    } catch (error) {
        console.error('Error deleting students:', error);
        throw error;
    }
};

// Get Settings
export const getSettings = async () => {
    try {
        const response = await api.get('/admin/settings');
        return response.data; // returns { success: true, data: settings }
    } catch (error) {
        console.error('Error fetching settings:', error);
        throw error;
    }
};

// Update Settings
export const updateSettings = async (settings: any) => {
    try {
        const response = await api.put('/admin/settings', settings);
        return response.data;
    } catch (error) {
        console.error('Error updating settings:', error);
        throw error;
    }
};

export default {
    getDashboardStats,
    getRecentEnrollments,
    getAllStudents,
    getAllInstructors,
    getAllCourses,
    getAnalytics,
    createCourse,
    deleteCourses,
    suspendStudents,
    deleteStudents,
    getSettings,
    updateSettings
};
