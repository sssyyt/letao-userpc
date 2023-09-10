import request from '@/utils/http'


//通过spuid查询sku信息
export function getSKU(spuId) {
    return request({
        url: '/product/sku',
        params: {
            spuId
        }
    })
}

//通过spuid查询评价
export function getcomSKU(spuId) {
    return request({
        url: '/product/comment',
        params: {
            spuId
        }
    })
}

