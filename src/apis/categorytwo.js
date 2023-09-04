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

//通过id查询某个分类
export function getaCategorytwoid(id) {
    return httpInstance({
        url: '/base/category/' + id,
    })
}


//通过二级id查询某个二级分类下所有商品（某一页）
export function getproductCategorytwo(twoCategoryId, page) {
    return httpInstance({
        url: '/product/spu',
        params: {
            twoCategoryId,
            page,
            pageSize: 20
        }
    })
}

export default {
    getCategorytwoid,
    getaCategorytwoid,
    getproductCategorytwo
}