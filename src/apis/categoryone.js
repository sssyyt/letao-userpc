
import httpInstance from "@/utils/http"

//返回所有一级分类列表
export function getCategoryAPI() {
  return httpInstance({
    url: '/base/category'
  })
}
//通过id查询某个分类
export function getCategoryoneid(id) {
  return httpInstance({
    url: '/base/category/' + id,
  })
}

export function getproductCategoryone(oneCategoryId, page) {
  //console.log('  getproductCategoryone  ', oneCategoryId, page);
  return httpInstance({
    url: '/product/spu',
    params: {
      oneCategoryId,
      page,
      pageSize: 20
    }
  })
}

