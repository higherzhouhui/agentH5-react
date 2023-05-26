// 会员详情
import React, { useEffect, useState } from 'react'
import Header from '../Form/components/header'
import { useTranslation } from "react-i18next"
import style from './common.module.scss'
import './common.scss'
import { useLocation, useNavigate } from "react-router-dom"

const ProxyDetail = () => {
    let { t } = useTranslation()
    let { state } = useLocation()
    const history = useNavigate()
    const toUpcase = (str) => {
        if (!str) return ''
        let F = str.substr(0, 1).toUpperCase()
        return `${F}${str.substr(1, 1)}`
    }
    useEffect(() => {
        // window.addEventListener("popstate", toBack)
    }, [])
    function toBack() {
        history('/agent?type=2')
    }
    useEffect(() => {
        return () => {
            // setTimeos

        }
    }, [])
    return <div style={{ minHeight: '100vh', background: '#ECEFF7' }}> <div className={`${style.proxyIndex} ${style.proxyDetial}`}>
        <Header title={t('AGENT.translate1')} backLink='/agent' />
        <div className={style.itemDetail}>
            <div className={style.topStyle}>
                <div className={style.leftInfo}>
                    {/* <div className={`${style.head} ${style['head' + state.index]}`}>{toUpcase(state.nickName)}</div> */}
                    {
                        state.userIcon ? <img className={style.avatar} src={state.userIcon} /> :
                            <div className={`${style.head} ${style['head' + state.index]}`}>{toUpcase(state.nickName)}</div>
                    }
                    <div className={style.UserInfo}>
                        <div className={style.name}>{state.nickName}</div>
                        <div className={style.id}>ID:{state.uid}</div>
                    </div>
                </div>
            </div>
        </div>
        <div className={style.itemDetail}>
            <div className={style.centerStyle}>
                <div className={style.centerStyleItem}>
                    <div className={style.key}>{t('CUST.dlID')}</div>
                    <div className={style.val}>{state.agentId}</div>
                </div>
                <div className={style.centerStyleItem}>
                    <div className={style.key}>{t('CUST.translate409')}{t('CUST.translate30')}</div>
                    <div className={style.val}>{state.createTime}</div>
                </div>
            </div>
        </div>
        <div className={style.itemOterBox}>
            <div className={style.itemDetailTitle}>{t('CUST.translate428')}</div>
            <div className={style.itemDetail}>
                <div className={style.bottomStyle}>
                    <div className={style.bottomStyleItem}>
                        <div className={style.key}>{state.firstDepositAmt}</div>
                        <div className={style.val}>{t('CUST.translate225')}</div>
                    </div>
                    <div className={style.bottomStyleItem}>
                        <div className={style.key}>{state.lastDepositAmt}</div>
                        <div className={style.val}>{t('CUST.translate224')}</div>
                    </div>
                </div>
                <div className={style.bottomStyle}>
                    <div className={style.bottomStyleItem}>
                        <div className={style.key}>{state.totalDepositAmt}</div>
                        <div className={style.val}>{t('AGENT.translate4')}</div>
                    </div>
                    <div className={style.bottomStyleItem}>
                        <div className={`${style.key}`}>{state.totalWithdrawAmt}</div>
                        <div className={`${style.val}`}>{t('AGENT.translate5')}</div>
                    </div>
                </div>
                <div className={style.bottomStyle}>
                    <div className={style.bottomStyleItem}>
                        <div className={style.key}>{state.totalGiftAmt}</div>
                        <div className={style.val}>{t('AGENT.translate6')}</div>
                    </div>
                    <div className={style.bottomStyleItem}>
                        <div className={`${style.key} ${state.netProfitAmt < 0 ? style.lose : style.win}`}>{state.netProfitAmt}</div>
                        <div className={style.val}>{t('CUST.translate39')}</div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    </div>
}
export default ProxyDetail