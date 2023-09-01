import request from '@/utils/http'
//通过一级分类的id查询底下所有二级分类
export function getCategorytwoid(id) {
    return request({
        url: '/base/category',
        params: {
            id
        }
    })
}


export function getaCategorytwoid(id) {
    return request({
        url: '/base/category/' + id,
    })
}

