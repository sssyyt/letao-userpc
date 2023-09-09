import httpInstance from '@/utils/http'

//获取miaosha商品
export const findmiaoshaAPI = (page) => {
    return httpInstance({
        url: '/seckill',
         params: {
            page,
            pageSize: 20
        }
    })
}


export const miaoshaAPI = (id) => {
    return httpInstance({
        url: '/seckill/'+id,
       
    })
}

