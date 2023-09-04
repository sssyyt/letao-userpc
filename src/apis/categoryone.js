
import httpInstance from "@/utils/http"

//所有一级分类
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

