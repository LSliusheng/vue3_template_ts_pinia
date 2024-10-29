import axios, {AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig, AxiosRequestConfig} from 'axios';
import { isURL } from 'utils/validate';
import { getToken } from 'utils/auth'
import { ElMessage } from 'element-plus';
import { useRouter } from "vue-router";
import { baseUrl } from '@/config/env';
import router from "@/router";
// 在非setup函数内无法使用 useRouter

// const router = useRouter()
// const service: AxiosInstance = axios.create({
//     timeout: 5000
// });
axios.defaults.timeout = 10000;

axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        if (!isURL(config.url) && !config.url.startsWith(baseUrl)) {
            config.url = baseUrl + config.url;
        }
        const meta = (config.meta || {});
        const token = getToken();
        config.headers['Authorization'] = `Bearer ${token}`;
        //headers中配置serialize为true开启序列化
        if (config.method === 'post' && meta.isSerialize === true) {
            config.data = serialize(config.data);
        }
        // console.log('config', config)
        return config;
    },
    (error: AxiosError) => {
        console.log(error);
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (res: AxiosResponse) => {
        const status = res.status || 200
        let message = res.data.msg || '未知错误';
        //如果是401则跳转到登录页面
        if (status === 401) {
            // store.dispatch('FedLogOut').then(() => router.push({ path: '/login' }));
            router.replace('/login')
            message = '登录失效'
        }
        // 如果请求为非200否者默认统一处理
        if (status !== 200) {
            ElMessage({
                message: message,
                type: 'error'
            })
            return Promise.reject(new Error(message))
        }
        return res.data;
    },
    (error: AxiosError) => {
        console.log(error);
        return Promise.reject(new Error(error));
    }
);

export default axios;
