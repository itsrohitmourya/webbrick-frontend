import axios from 'axios';

// ✅ Updated baseURL to deployed backend
const API = axios.create({
  baseURL: 'https://webbrick-backend.onrender.com/api',
});

// ✅ Automatically attach token to headers
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ✅ Global error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message || "Something went wrong!";
    console.error("API Error:", errorMessage);
    alert(errorMessage);
    return Promise.reject(error);
  }
);

// ✅ Auth API Endpoints
export const registerUser = async (userData) => await API.post('/auth/register', userData);
export const loginUser = async (userData) => await API.post('/auth/login', userData);
export const logoutUser = async () => await API.post('/auth/logout');

// 🔥 Projects API
export const getUserProjects = async () => await API.get('/projects');
export const createProject = async (data) => await API.post('/projects', data);
export const deleteProject = async (id) => await API.delete(`/projects/${id}`);
export const getProjectById = async (id) => await API.get(`/projects/${id}`);
export const updateProject = async (id, data) => await API.put(`/projects/${id}`, data);
export const updateProjectComplete = async (id, complete) => 
  await API.put(`/projects/${id}/complete`, { complete });
