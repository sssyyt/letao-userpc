import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '/Users/shiyutian/letao/letao_userpc/src/stores/userStore.js'
// const userStore = useUserStore()


// 创建axios实例
const httpInstance = axios.create({
    baseURL: 'http://fe7074a.r9.vip.cpolar.cn',
    timeout: 50000,
    // headers: { authorization: 123456 }

})

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
    const userStore = useUserStore()
    const token = userStore.userToken.data
    if (token) {
        config.headers.authorization = `${token}`
    }
    return config
}, e => Promise.reject(e))


// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
    //const userStore = useUserStore()
    // 统一错误提示
    ElMessage({
        type: 'warning',
        message: e.message

    })
    // if (e.request.status === 401)
    // {
    //     userStore.clearUserInfo()
    //     }
    return Promise.reject(e)
})

export default httpInstance