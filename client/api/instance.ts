import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:8080/',
  withCredentials: true,
})

// Alternative http://192.168.1.4:8080/
