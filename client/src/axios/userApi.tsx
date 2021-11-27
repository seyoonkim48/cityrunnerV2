import axios, { AxiosInstance } from 'axios';

const url = 'https://localhost/3000'

const instance : AxiosInstance = axios.create({
    baseURL: `${url}/user`,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
})

export const userApi = {
    register: (data: {}) => instance.post('/signup', data),
    login: (data: {}) => instance.post('/login', data),
    logout: (id? : number ) => instance.get('/logout')
}