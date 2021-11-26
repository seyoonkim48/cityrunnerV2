import axios from 'axios';

const url = 'https://localhost/3000/user'

export const userApi = {
    register: (Submitdata) => axios.post(`${url}/signup`, Submitdata),
    login: (Logindata) => axios.post(`${url}/login`,Logindata),
    patchUser: (Patchdata) => axios.post(`${url}/mypage`,Patchdata),
}