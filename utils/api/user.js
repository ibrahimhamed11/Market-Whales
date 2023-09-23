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
