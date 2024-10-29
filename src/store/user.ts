import { defineStore } from 'pinia'
import {getMenuRoutesApi} from "@/api/user";
import {useRouter} from "vue-router";
import router from "@/router";


export const useUserStore = defineStore('user', {
    state: () => ({
        userInfo: <Object | null>null,
        routes: <Array<Object>>[],
    }),
    getters: {

    },
    actions: {
        setUserInfo(userInfo: Object) {
            this.userInfo = userInfo
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
            localStorage.setItem('vuems_name', userInfo.staffName)
            this.setRoutes()
        },
        setRoutes(routes: Array<Object>) {
            // const router = useRouter()
            // 在非setup函数内无法使用 useRouter
            getMenuRoutesApi().then(res => {
                this.routes = res.data
                localStorage.setItem('routes', JSON.stringify(this.routes))
                router.replace('/')
            })
        }
    }
})