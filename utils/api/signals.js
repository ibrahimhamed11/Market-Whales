import { date } from 'yup';
import axiosInstance from './apiInstance';

export const getAllSignals = async (authToken) => {
  try {
    const response = await axiosInstance.get('/signals/all', {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });

    console.log(date)
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createSignal = async (authToken, signalData) => {
  try {
    const response = await axiosInstance.post('/signals', signalData, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSignalById = async (authToken, signalId) => {
  try {
    const response = await axiosInstance.get(`/signals/${signalId}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateSignal = async (authToken, signalId, updatedSignalData) => {
  try {
    const response = await axiosInstance.put(`/signals/${signalId}`, updatedSignalData, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteSignal = async (authToken, signalId) => {
  try {
    await axiosInstance.delete(`/signals/${signalId}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });
  } catch (error) {
    throw error;
  }
};
