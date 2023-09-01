import request from '@/utils/http'

export function getCategorytwoid(id) {
    return request({
        url: '/base/category',
        params: {
            id
        }
    })
}

