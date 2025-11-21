// src/api.js
import axios from 'axios';
import { API_ENDPOINTS } from './apiEndPoints';

// Create Axios Instance
const sellerApi = axios.create({
  baseURL: API_ENDPOINTS.baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// --- GET ---
export const getAxios = async (url) => {
  try {
    const response = await sellerApi.get(url);
    return response.data.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

// --- POST ---
export const postData = async (url, data) => {
  try {
    const response = await sellerApi.post(url, data);
    return response.data.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

// --- PUT ---
export const putAxios = async (url, data) => {
  try {
    const response = await sellerApi.put(url, data);
    return response.data.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

// --- DELETE ---
export const removeAxios = async (url) => {
  try {
    const response = await sellerApi.delete(url);
    return response.data.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

// --- ERROR HANDLING ---
const handleError = (error) => {
  console.error('API Error:', error.message);
  throw error;
};
