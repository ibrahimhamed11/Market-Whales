import axiosInstance from './apiInstance';
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post(`/user/login`, {
      email: email,
      password: password,
    });

    const { token, status, error } = response.data;
    if (status === 200) {

      // Decode the token to get user information
      const decodedToken = jwt_decode(token);
      const userRole = decodedToken.role;
   const userId=decodedToken.userId;

      // Store the token and user role in AsyncStorage
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("userRole", userRole);
       await AsyncStorage.setItem("userId", userId);


      // // Print the user role for testing

      return { token, userRole, error: null };
    } else {
      throw new Error(error || 'Invalid email or password');
    }
  } catch (error) {
    return { token: null, userRole: null, error: error.message };
  }
};

export { loginUser };
