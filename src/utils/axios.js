import axios from 'axios';
import * as constant from '../config/config';
import { updateSnackMessage, updateAuthorized } from '../redux/slice/zendeskSlice';
import store from "../redux/store/configure-store"

axios.interceptors.request.use(
    config => {
        if (config.url !== constant.IDENTITY + 'oauth/token') {
            const token = localStorage.getItem('at');
            if (token) {
                config.headers['Authorization'] = 'Bearer ' + token;
            }
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    response => {
        return response;
    },
    function (error) {
        const originalRequest = error.config;
       
        if (error.response.status === 401 && originalRequest.url === constant.IDENTITY + 'oauth/token') {
            console.log('401 error');
            return Promise.reject(error);
        }
        if (error.response.status === 401 && !originalRequest._retry) {
            console.log('called');
            originalRequest._retry = true;
            const config = {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('rt') },
            };
            return axios
                .get(constant.IDENTITY + 'oauth/token', config)
                .then(res => {
                    if (res.status === 200) {
                        localStorage.setItem('at', res.data.access_token);
                        localStorage.setItem('rt', res.data.refresh_token);
                        console.log(res.data);
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('at');
                        return axios(originalRequest);
                    }
                    if(res.status===400){
                        console.log('400 error');

                        store.dispatch(updateAuthorized(false))
                        store.dispatch(updateSnackMessage({detail:"Session expired"}))
                    }
                });
        }

        return error.response;
    }
);

export default axios;
