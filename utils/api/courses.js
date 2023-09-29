import axiosInstance from './apiInstance';

export const getAll = async (authToken) => {

    try {
      const response = await axiosInstance.get(`/courses`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
        
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };