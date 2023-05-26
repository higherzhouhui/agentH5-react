import http from '../util/request';

export function getConfigDataInfo() {
    return http.request({
        url: '/api/agent-server/agent/config/getConfigDataInfo',
        method: 'get',
    })
}

// 确认提款
export function withdrawConfirm(data) {
    return http.request({
        url: '/api/agent-server/agent/withdraw/confirm',
        method: 'post',
        data: data
    })
}