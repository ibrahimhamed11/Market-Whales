import axiosInstance from './apiInstance';
import AsyncStorage from "@react-native-async-storage/async-storage";

const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post(`/user/login`, {
      email: email,
      password: password,
    });
    const { data, status } = response.data;
    if (status === 200) {
      const { token, user } = data;
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("userId", user._id);
      await AsyncStorage.setItem("role", user.role);

      return { token, user, error: null };
    } else {
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    return { token: null, user: null, error: error.message };
  }
};

export { loginUser };
