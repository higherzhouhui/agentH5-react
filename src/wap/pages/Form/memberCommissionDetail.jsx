// 直属会员佣金详情
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
        <Header title={t('CUST.translate0')} backLink='/member_commission_list' />
        <div className={style.formBody}>
            <div className={style.formItem}>
                <div className={style.topInfo}>
                    <div className={style.leftInfo}>{state.month}</div>
                    <div className={style.rightInfo}>{t('CUST.dlID')}:{state.agentId}</div>
                </div>
                <div className={style.bottomInfo}>
                    <div className={style.bottomInfoItem}>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.translate243')}</div>
                            <div className={style.val}>{state.newValidPerson}</div>
                        </div>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.translate244')}</div>
                            <div className={style.val}>{state.totalBetAmt}</div>
                        </div>
                    </div>
                </div>
                <div className={style.bottomInfo}>
                    <div className={style.bottomInfoItem}>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.translate245')}</div>
                            <div className={style.val}>{state.totalBetValidAmt}</div>
                        </div>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.translate246')}</div>
                            <div className={`${style.val} ${state.totalProfit < 0 ? style.lose : style.win}`}>{state.totalProfit}</div>
                        </div>
                    </div>
                </div>

                <div className={style.bottomInfo}>
                    <div className={style.bottomInfoItem}>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.translate247')}</div>
                            <div className={style.val}>{state.bonusAmt}</div>
                        </div>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.translate248')}</div>
                            <div className={style.val}>{state.platformAmt}</div>
                        </div>
                    </div>
                </div>
                <div className={style.bottomInfo}>
                    <div className={style.bottomInfoItem}>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.translate249')}</div>
                            <div className={style.val}>{state.netProfitAmt}</div>
                        </div>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.translate250')}</div>
                            <div className={style.val}>{state.commissionRatio}</div>
                        </div>
                    </div>
                </div>
                <div className={style.bottomInfo}>
                    <div className={style.bottomInfoItem}>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.translate251')}</div>
                            <div className={style.val}>{state.memberCommission}</div>
                        </div>
                        <div className={style.item}>
                            {/* <div className={style.key}>{t('CUST.huodongpafazonghongli')}</div>
                            <div className={style.val}>{state.totalBonusAmt}</div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

}

export default AnchorList