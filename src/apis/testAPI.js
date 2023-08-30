import httpInstance from "@/utils/http"


export function getCategory() {
    return httpInstance({
        url: '/base/category',
        params: {
                        id: 1
                    }
    })
}