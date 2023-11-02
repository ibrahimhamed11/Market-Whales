import axiosInstance from './apiInstance';

export const createOrder = async (orderData) => {
  try {
    console.log('Order Data:', orderData); 

    const response = await axiosInstance.post('/orders/add', orderData);


    return response.data;
  } catch (error) {
    throw error;
  }
};
