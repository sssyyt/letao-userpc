
import httpInstance from "@/utils/http"
import request from '@/utils/http'
//所有一级分类
export function getCategoryAPI() {
  return httpInstance({
    url: '/base/category'
  })
}
//通过id查询某个一级分类
export function getCategoryoneid(id) {
  return request({
    url: '/base/category/' + id,
  })
}
