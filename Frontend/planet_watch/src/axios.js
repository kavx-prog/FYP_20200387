import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/';
const axiosInstance = axios.create({
    baseURL:baseURL,
    timeout:60000,
    headers:{
        Authorization : localStorage.getItem('access_token')?
        'Bearer' + localStorage.getItem('access_token'):null,
        'Content-Type':'application/json',
        Accept:'application/json',
    }
})
export default axiosInstance;