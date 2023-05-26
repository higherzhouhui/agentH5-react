import http from '../util/request'
// 概况佣金数据
export function generalInfo(data) {
  return http.request({
    url: '/api/commission-server/agent/index/generalInfo',
    method: 'get',
    data,
  })
}

// 最新加入代理
export function getNewAgentList(data) {
  return http.request({
    url: '/api/commission-server/agent/index/getNewAgentList',
    method: 'post',
    data,
  })
}

// 最新存款会员
export function getNewDepositMemberList(data) {
  return http.request({
    url: '/api/commission-server/agent/index/getNewDepositMemberList',
    method: 'post',
    data,
  })
}

// 最新加入会员
export function getNewMemberList(data) {
  return http.request({
    url: '/api/commission-server/agent/index/getNewMemberList',
    method: 'post',
    data,
  })
}

// 本月佣金统计
export function getThisMonthCommission(data) {
  return http.request({
    url: '/api/commission-server/agent/index/getThisMonthCommission',
    method: 'get',
    data,
  })
}

// 上月佣金统计
export function getLastMonthCommission(data) {
  return http.request({
    url: '/api/commission-server/agent/index/getLastMonthCommission',
    method: 'get',
    data,
  })
}

// 首页代理佣金列表
export function getAgentCommissionList() {
  return http.request({
    url: '/api/commission-server/agent/index/getAgentCommissionList',
    method: 'get',
  })
}


// 团队概览
export function getGroupOverviewInfo(data) {
  return http.request({
    url: '/api/commission-server/agent/index/getGroupOverviewInfo',
    method: 'get',
    data,
  })
}