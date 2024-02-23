import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from "socket.io-client";

const BASE_URL = 'https://serepay.net';

const AxiosInstance = (contentType = 'application/json') => {
    const axiosInstance = axios.create({
        // baseURL: 'https://remitano.dk-tech.vn',
        // baseURL: 'https://serepay.net'
        baseURL: BASE_URL
    });

    axiosInstance.interceptors.request.use(
        async (config: any) => {
            const token = await AsyncStorage.getItem('token');

            config.headers = {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': contentType
            }
            return config;
        },
        err => Promise.reject(err)
    );

    axiosInstance.interceptors.response.use(
        res => res.data,
        err => Promise.reject(err)
    );
    return axiosInstance;
};

export default AxiosInstance;
export const socket = io(BASE_URL, {
    transports: ["websocket", "polling", "flashsocket"],
});