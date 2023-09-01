import httpInstance from '@/utils/http'
//通过一级分类的id查询底下所有二级分类
export function getCategorytwoid(id) {
    return httpInstance({
        url: '/base/category',
        params: {
            id
        }
    })
}


export function getaCategorytwoid(id) {
    return httpInstance({
        url: '/base/category/' + id,
    })
}



export function getproductCategorytwo(twoCategoryId,page) {
    return httpInstance({
        url: '/product/spu' ,
        params: {
            twoCategoryId,
            page,
            pageSize:20
        }
    })
}

export default {
    getCategorytwoid,
    getaCategorytwoid,
    getproductCategorytwo
}