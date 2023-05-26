import http from '../util/request'

// 游戏输赢报表
export function agentGameStatis(query) {
    return http.request({
        url: '/api/commission-server/agent/agentGameStatis',
        method: 'post',
        data: query
    })
}

// 游戏分类统计
export function agentGameTypeStatis(data) {
    return http.request({
        url: '/api/commission-server/agent/agentGameTypeStatis',
        method: 'post',
        data: data
    })
}

// 活动红利报表
export function activityBonusStatis(data) {
    return http.request({
        url: '/api/commission-server/agent/activityBonusStatis',
        method: 'post',
        data: data
    })
}

// 平台费报表
export function gamePlatformStatis(data) {
    return http.request({
        url: '/api/commission-server/agent/gamePlatformStatis',
        method: 'post',
        data: data
    })
}

// 主播打赏抽成报表
export function giftCommissionStatis(data) {
    return http.request({
        url: '/api/commission-server/agent/giftCommissionStatis',
        method: 'post',
        data: data
    })
}

// 代理佣金调整统计
export function commissionModifyStatis(data) {
    return http.request({
        url: '/api/commission-server/agent/commissionModifyStatis',
        method: 'post',
        data: data
    })
}
// 代理佣金调整明细
export function commissionModifyRecord(data) {
    return http.request({
        url: '/api/commission-server/agent/commissionModifyRecord',
        method: 'post',
        data: data
    })
}
// 直属会员佣金报表
export function memberCommissionStatis(data) {
    return http.request({
        url: '/api/commission-server/agent/memberCommissionStatis',
        method: 'post',
        data: data
    })
}

// 我的佣金结算报表
export function myCommissionSettleRecord(data) {
    return http.request({
        url: '/api/commission-server/agent/myCommissionSettleRecord',
        method: 'post',
        data: data
    })
}

// 下级代理佣金报表
export function childCommissionStatisRequest(data) {
    return http.request({
        url: '/api/commission-server/agent/childCommissionStatis',
        method: 'post',
        data: data
    })
}

// 我的佣金领取明细
export function getWithdrawList(data) {
    return http.request({
        url: '/api/agent-server/agent/withdraw/getWithdrawList',
        method: 'post',
        data: data
    })
}

// 团队代理佣金
export function teamCommissionStatis(data) {
    return http.request({
        url: '/api/commission-server/agent/teamCommissionStatis',
        method: 'post',
        data: data
    })
}

// 团队游戏输赢报表
export function teamGameStatis(data) {
    return http.request({
        url: '/api/commission-server/agent/teamGameStatis',
        method: 'post',
        data: data
    })
}

// 定时任务立即执行一次
export function runJob(jobId, jobGroup) {
    const data = {
        jobId,
        jobGroup
    }
    return http.request({
        url: '/api/agent-job/job/run',
        method: 'put',
        data: data
    })
}

// 导出活动红利
export function activityBonusStatisExport(data) {
    return http.request({
        url: '/api/commission-server/agent/activityBonusStatis/export',
        method: 'post',
        data,
        responseType: 'blob'
    })
}
// 导出游戏输赢总报表
export function agentGameStatisExport(data) {
    return http.request({
        url: '/api/commission-server/agent/agentGameStatis/export',
        method: 'post',
        data,
        responseType: 'blob'
    })
}
// 导出游戏分类统计
export function agentGameTypeStatisExport(data) {
    return http.request({
        url: '/api/commission-server/agent/agentGameTypeStatis/export',
        method: 'post',
        data,
        responseType: 'blob'
    })
}
// 导出下级代理佣金报表
export function childCommissionStatisExport(data) {
    return http.request({
        url: '/api/commission-server/agent/childCommissionStatis/export',
        method: 'post',
        data,
        responseType: 'blob'
    })
}
// 导出佣金调整统计
export function commissionModifyRecordExport(data) {
    return http.request({
        url: '/api/commission-server/agent/commissionModifyRecord/export',
        method: 'post',
        data,
        responseType: 'blob'
    })
}
// 导出游戏平台费统计
export function gamePlatformStatisExport(data) {
    return http.request({
        url: '/api/commission-server/agent/gamePlatformStatis/export',
        method: 'post',
        data,
        responseType: 'blob'
    })
}
// 导出主播打赏抽成报表
export function giftCommissionStatisExport(data) {
    return http.request({
        url: '/api/commission-server/agent/giftCommissionStatis/export',
        method: 'post',
        data,
        responseType: 'blob'
    })
}
// 导出直属会员佣金报表
export function memberCommissionStatisExport(data) {
    return http.request({
        url: '/api/commission-server/agent/memberCommissionStatis/export',
        method: 'post',
        data,
        responseType: 'blob'
    })
}
// 导出我的佣金结算报表
export function myCommissionSettleRecordExport(data) {
    return http.request({
        url: '/api/commission-server/agent/myCommissionSettleRecord/export',
        method: 'post',
        data,
        responseType: 'blob'
    })
}
// 导出团队代理佣金报表
export function teamCommissionStatisExport(data) {
    return http.request({
        url: '/api/commission-server/agent/teamCommissionStatis/export',
        method: 'post',
        data,
        responseType: 'blob'
    })
}
// 导出团队游戏输赢报表
export function teamGameStatisExport(data) {
    return http.request({
        url: '/api/commission-server/agent/teamGameStatis/export',
        method: 'post',
        data,
        responseType: 'blob'
    })
}



// 代理彩票返水明细
export function agentLotteryRebateRecord(data) {
    return http.request({
        url: '/api/commission-server/agent/agentLotteryRebateRecord',
        method: 'post',
        data
    })
}
// 发放彩票返水(一键发放)
export function giveAllLotteryRebate(data) {
    return http.request({
        url: `/api/commission-server/agent/giveAllLotteryRebate?operator=${data.operator}&date=${data.date}&month=${data.month}`,
        method: 'post',
        data
    })
}
//发放彩票返水(单条)
export function giveLotteryRebateById(data) {
    return http.request({
        url: `/api/commission-server/agent/giveLotteryRebateById?operator=${data.operator}&id=${data.id}`,
        method: 'post',
        data
    })
}

//代理彩票返水明细-excel导出
export function agentLotteryRebateRecordExport(data) {
    return request({
        url: `/api/commission-server/agent/agentLotteryRebateRecord/export`,
        method: 'post',
        data,
        responseType: 'blob'
    })
}