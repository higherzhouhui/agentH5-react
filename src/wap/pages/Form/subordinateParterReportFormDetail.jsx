// 团队佣金结算详情
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
        <Header title={t('CUST.translate0')} backLink='/subordinate_parter_report' />
        <div className={style.formBody}>
            <div className={style.formItem}>
                <div className={style.topInfo}>
                    <div className={`${style.leftInfo} ${style.noIcon}`}>
                        <div>{state.month}</div>
                        <div className={style.txt}>{t('CUST.dlID')}:{state.agentId}</div>
                    </div>
                    <div className={`${style.rightInfo} ${style['status' + state.status]} ${style.icon}`}>
                        {
                            state.status === 1
                                ? t('CUST.translate257')
                                : state.status === 2
                                    ? t('CUST.translate258')
                                    : t('CUST.translate285')
                        }
                    </div>
                </div>
                <div className={style.bottomInfo}>
                    <div className={style.bottomInfoItem}>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.translate246')}</div>
                            <div className={style.val}>{state.totalProfit}</div>
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
                            <div className={style.key}>{t('CUST.translate55')}</div>
                            <div className={style.val}>{state.commissionRatio}</div>
                        </div>
                    </div>
                </div>

                <div className={style.bottomInfo}>
                    <div className={style.bottomInfoItem}>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.translate41')}</div>
                            <div className={style.val}>{state.supportAmt}</div>
                        </div>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.translate43')}</div>
                            <div className={style.val}>{state.giftAmt}</div>
                        </div>
                    </div>
                </div>
                <div className={style.bottomInfo}>
                    <div className={style.bottomInfoItem}>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.translate42')}</div>
                            <div className={style.val}>{state.modifyAmt}</div>
                        </div>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.translate256')}</div>
                            <div className={style.val}>{state.totalAmt}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

}

export default AnchorList