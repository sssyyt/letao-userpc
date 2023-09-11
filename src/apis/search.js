import request from '@/utils/http'


export const getsearch = ({ query }) => {
    return request({
        url: '/product/spu/suggest',
        method: 'POST',
        data: {
            query
            
        }
    })
}