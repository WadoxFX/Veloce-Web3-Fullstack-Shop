import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true,
})

// Alternative http://192.168.1.4:8080/
