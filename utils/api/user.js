import axiosInstance from './apiInstance';


export const registerUser = async (formData) => {
  try {
    // console.log(formData)
    const response = await axiosInstance.post(`/user/register`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const getUserById = async (userId, authToken) => {

  try {
    const response = await axiosInstance.get(`/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};