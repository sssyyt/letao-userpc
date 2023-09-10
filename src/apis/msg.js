import request from '@/utils/http'


export function getmsgAPI() {
    return request({
        url: '/message/user',
        method: "get",
      
    })
} export function sendmsgAPI({ content }) {
    return request({
        url: '/message/user',
        method: "post",
        data: { content }
    })
}