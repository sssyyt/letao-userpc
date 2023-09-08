import request from '@/utils/http'

//获取地区信息
export function getRegionsAPI(id) {
    return request({
        url: '/base/region',
        method: "get",
        params: id
        
    })
}

//获取地区内店铺信息
export function getshopRegionsAPI(districtId) {
    return request({
        url: '/shop',
        method: "get",
        params: districtId

    })
}
