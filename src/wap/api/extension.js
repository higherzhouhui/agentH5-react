import http from '../util/request'

// 推广域名管理列表
export function list(query) {
    return http.request({
        url: '/api/agent-server/agent/promote/list',
        method: 'post',
        data: query
    })
}
// export function list(data) {
//     return http.request({
//         url: '/api/agent/promote/list',
//         method: 'get',
//         data: data
//     })
// }

// 推广域名管理绑定域名
export function bind(data) {
    return http.request({
        url: '/api/agent-server/agent/promote/bind',
        method: 'post',
        data: data
    })
}

// 推广域名管理绑定域名
export function getCnameAndIds(data) {
    return http.request({
        url: '/api/agent-server/api/promotionDoMain/getCnameIpInfo',
        method: 'get',
        data: data
    })
}

// 绑定域名-通过分组id查询网关ip-cname
export function getPrivateDomainByCname(data) {
    return http.request({
        url: '/api/agent-server/agent/promote/getPrivateDomainByCname',
        method: 'get',
        data: data
    })
}
