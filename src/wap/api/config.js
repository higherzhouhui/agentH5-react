import http from '@/utils/request';

export function getConfigDataInfo() {
    return http.request({
        url: '/api/agent-server/agent/config/getConfigDataInfo',
        method: 'get',
    })
}