import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin/dashboard';

// Get auth token from localStorage
const getAuthToken = () => {
    return localStorage.getItem('token');
};

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
        const response = await api.get('/stats');
        return response.data;
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        throw error;
    }
};

// Get recent enrollments
export const getRecentEnrollments = async (limit = 10) => {
    try {
        const response = await api.get(`/enrollments/recent?limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching recent enrollments:', error);
        throw error;
    }
};

// Get all students
export const getAllStudents = async () => {
    try {
        const response = await api.get('/students');
        return response.data;
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
};

// Get all instructors
export const getAllInstructors = async () => {
    try {
        const response = await api.get('/instructors');
        return response.data;
    } catch (error) {
        console.error('Error fetching instructors:', error);
        throw error;
    }
};

// Get analytics data
export const getAnalytics = async () => {
    try {
        const response = await api.get('/analytics');
        return response.data;
    } catch (error) {
        console.error('Error fetching analytics:', error);
        throw error;
    }
};

export default {
    getDashboardStats,
    getRecentEnrollments,
    getAllStudents,
    getAllInstructors,
    getAnalytics
};
