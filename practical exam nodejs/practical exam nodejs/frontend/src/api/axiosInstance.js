import axios from 'axios';

// Get API base URL from environment or use default
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Create axios instance with default config
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // This is CRITICAL for sending cookies
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for debugging and adding auth tokens
axiosInstance.interceptors.request.use(
    (config) => {
        console.log('API Request:', config.url);
        // Add auth token if available
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor for handling errors
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            console.log('Unauthorized - redirecting to login');
            localStorage.removeItem('authToken');
            window.location.href = '/login';
        } else if (error.response?.status === 500) {
            console.error('Server error:', error.response.data);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
