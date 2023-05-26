


import http from '../util/request'

// 获取代理列表
export function pageList(query) {
    return http.request({
        url: '/api/agent-server/agent/user/pageList',
        method: 'post',
        data: query
    })
}
// 获取会员列表
export function directMemberList(query) {
    return http.request({
        url: '/api/agent-server/agent/user/directMemberList',
        method: 'post',
        data: query
    })
}
// 新建代理
export function addChildAgent(query) {
    return http.request({
        url: '/api/agent-server/agent/user/addChildAgent',
        method: 'post',
        data: query
    })
}
// 获取计划列表
export function getSysSupportPlan(query) {
    return http.request({
        url: '/api/agent-server/agent/user/getSysSupportPlan',
        method: 'get',
        data: query
    })
}