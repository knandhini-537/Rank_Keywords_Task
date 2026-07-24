import axios from 'axios';
import { PropertyFormData } from '../types/property';

const API = axios.create({
  baseURL: '/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('magic_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const loginApi = (email: string, password?: string) =>
  API.post('/auth/login', { email, password: password || 'demo123' });
export const registerApi = (data: any) => API.post('/auth/register', data);
export const getMeApi = () => API.get('/auth/me');

// Location
export const searchLocationsApi = (query: string) =>
  API.get(`/locations/search?q=${encodeURIComponent(query)}`);

// Drafts
export const saveDraftApi = (stepIndex: number, formData: Partial<PropertyFormData>) =>
  API.post('/drafts/save', { stepIndex, formData });
export const getDraftApi = () => API.get('/drafts/my-draft');
export const deleteDraftApi = () => API.delete('/drafts');

// Media
export const uploadMediaApi = (files: File[]) => {
  const data = new FormData();
  files.forEach((f) => data.append('files', f));
  return API.post('/media/upload', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// AI
export const generateAIDescriptionApi = (payload: any) =>
  API.post('/ai/generate-description', payload);
export const getSmartPriceApi = (payload: any) =>
  API.post('/ai/price-recommendation', payload);
export const calculateQualityScoreApi = (formData: Partial<PropertyFormData>) =>
  API.post('/ai/quality-score', formData);
export const sendAIChatApi = (message: string, currentStep: number, propertyData: any) =>
  API.post('/ai/chat', { message, currentStep, propertyData });

// Properties
export const createPropertyApi = (propertyData: PropertyFormData) =>
  API.post('/properties', propertyData);
export const getPropertiesApi = (params?: Record<string, string>) =>
  API.get('/properties', { params });
export const getPropertyByIdApi = (id: string) => API.get(`/properties/${id}`);
export const getUserPropertiesApi = () => API.get('/properties/my-listings');
export const deletePropertyApi = (id: string) => API.delete(`/properties/${id}`);

export default API;
