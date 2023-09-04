import axios from 'axios'
import { ElMessage } from 'element-plus'
// import { useUserStore } from '/Users/shiyutian/letao/letao_userpc/src/stores/userStore.js'
// const userStore = useUserStore()


// 创建axios实例
const httpInstance = axios.create({
    baseURL: 'http://6553ee59.r8.cpolar.top',
    timeout: 5000,
    
})

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
    return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
    // 统一错误提示
    ElMessage({
        type: 'warning',
        message: e.response.data.message
    })
    return Promise.reject(e)
})

export default httpInstance