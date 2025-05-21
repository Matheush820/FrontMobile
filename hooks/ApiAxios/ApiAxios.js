import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://10.100.2.167:8080/',   //toda vez que muda o wi-fi tem que mudar aqui
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token'); // pega o token 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // adiciona no header
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;
