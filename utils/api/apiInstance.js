import axios from 'axios';
import ip from "../../ipConfig";


const axiosInstance = axios.create({
  baseURL: ip, 
});

export default axiosInstance;
