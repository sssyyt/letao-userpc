
import httpInstance from "@/utils/http"
import request from '@/utils/http'
export function getCategoryAPI () {
  return httpInstance({
    url: '/base/category'
  })
}

export function getCategoryoneid(id) {
  return request({
    url: '/base/category/'+id,
  })
}

