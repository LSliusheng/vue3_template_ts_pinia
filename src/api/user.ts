import request from '@/utils/request.ts';

export const loginApi = (data) => {
   return request({
        url: '/admin/sso/login',
        method: 'post',
        data
    });
}

export const getMenuRoutesApi = () => {
    return request({
        url: '/admin/menu/routes',
        method: 'get'
    });
}
