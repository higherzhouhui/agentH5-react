// 直属代理抽成详情
import React, { useEffect, useState } from 'react'
import Header from './components/header'
import style from './common.module.scss'
import { useTranslation } from "react-i18next"
import './common.scss'
import { useLocation } from "react-router-dom"


const AnchorList = () => {
    const { t } = useTranslation()
    let location = useLocation()
    const { state } = location

    return <div className={`${style.formBg} ${style.formBg2}`}>
        <Header title={t('CUST.translate0')} backLink='/subordinate_report' />
        <div className={style.formBody}>
            <div className={style.formItem}>
                <div className={style.topInfo}>
                    <div className={style.leftInfo}>{state.month}</div>
                    <div className={style.rightInfo}>{t('CUST.dlID')}:{state.agentId}</div>
                </div>
                <div className={style.bottomInfo}>
                    <div className={style.bottomInfoItem}>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.translate246')}</div>
                            <div className={`${style.val} ${state.totalProfit < 0 ? style.lose : style.win}`}>{state.totalProfit}</div>
                        </div>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.translate247')}</div>
                            <div className={style.val}>{state.bonusAmt}</div>
                        </div>
                    </div>
                </div>
                <div className={style.bottomInfo}>
                    <div className={style.bottomInfoItem}>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.translate248')}</div>
                            <div className={style.val}>{state.platformAmt}</div>
                        </div>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.translate249')}</div>
                            <div className={style.val}>{state.netProfitAmt}</div>
                        </div>
                    </div>
                </div>

                <div className={style.bottomInfo}>
                    <div className={style.bottomInfoItem}>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.translate243')}</div>
                            <div className={style.val}>{state.newValidPerson}</div>
                        </div>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.translate250')}</div>
                            <div className={style.val}>{state.commissionRatio > 0 ? state.commissionRatio + '%' : 0}</div>
                            </div>
                        </div>
                    </div>
                    <div className={style.bottomInfo}>
                        <div className={style.bottomInfoItem}>
                            <div className={style.item}>
                                <div className={style.key}>{t('CUST.translate253')}</div>
                                <div className={style.val}>{state.parentAgentRatio > 0 ? state.parentAgentRatio + '%' : 0}</div>
                            </div>
                            <div className={style.item}>
                                <div className={style.key}>{t('CUST.zbcpfanshui')}</div>
                                <div className={style.val}>{state.totalLotteryRebate}</div>
                            </div>
                        </div>
                    </div>
                    <div className={style.bottomInfo}>
                        <div className={style.bottomInfoItem}>
                            <div className={style.item}>
                                <div className={style.key}>{t('CUST.translate254')}</div>
                                <div className={style.val}>{state.parentAgentCommission}</div>
                            </div>
                            <div className={style.item}>
                                {/* <div className={style.key}>{t('CUST.translate256')}</div>
                            <div className={style.val}>{state.totalAmt}</div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

}

        export default AnchorList