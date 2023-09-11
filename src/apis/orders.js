import request from '@/utils/http'


export const getorders = () => {
    return request({
        url: '/order/user',
        method: 'get',
       
    })
}

export const sendcheck = (orderId) => {
    return request({
        url: '/order/pay/' + orderId ,
        method: 'put',

    })
}