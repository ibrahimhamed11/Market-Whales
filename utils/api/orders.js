import axios from 'axios';

export const createOrder = async (orderData) => {
  try {
    console.log('Order Data:', orderData);

    const formData = new FormData();
    formData.append('courseId', orderData.courseId);
    formData.append('courseName', orderData.courseName);
    formData.append('coursePrice', orderData.coursePrice);
    formData.append('selectedItemData', orderData.selectedItemData);
    formData.append('userEmail', orderData.userEmail);
    formData.append('userId', orderData.userId);
    formData.append('userName', orderData.userName);
    formData.append('userPhone', orderData.userPhone);
    formData.append('userRole', orderData.userRole);
    formData.append('image', orderData.image); // Assuming 'image' is the key for the file

    const response = await axios.post('http://192.168.1.7:4000/orders/add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
