import axios from "axios";
import { config } from "zod";
import useAuthStore from "../store/authStore";

// const API_URL = "http://localhost:5000/api";
const API_URL = "https://mentorship-api-3ymg.onrender.com/api";


const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


// Interceptor to add the Authorization header

api.interceptors.request.use((config) =>{
  const token = useAuthStore.getState().token;

  if(token){
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config
})


export default api