
import React, { useEffect, useState } from 'react'
import style from '../common.module.scss'
import { useTranslation } from "react-i18next"

// translate216  thisMonthDirectUserNum
// 
const Item = (props) => {
    const { t } = useTranslation()
    const toUpcase = (str) => {
        if (!str) return ''
        let F = str.substr(0, 1).toUpperCase()
        return `${F}${str.substr(1, 1)}`

    }
    let { state } = props
    return <div className={style.item}>
        <div className={style.topStyle}>
            <div className={style.leftInfo}>{
                state.userIcon ? <img className={style.avatar} src={state.userIcon} /> :
                    <div className={`${style.head} ${style['head' + state.index]}`}>{toUpcase(state.agentAccount)}</div>
            }
                <div className={style.UserInfo}>
                    <div className={style.name}>{state.agentAccount}</div>
                    <div className={style.id}>{t('CUST.dlID')}:{state.agentId}</div>
                </div>
            </div>
            <div className={style.rightInfo}>
                <div className={`${style.status}  ${state.agentStatus == 1 ? style.status1 : ''}`} >{state.agentStatus == 1 ? t('CUST.translate116') : t('CUST.translate191')}</div>
                <div className={style.time}>{state.registerTime}</div>
            </div>

        </div>
        <div className={style.bottomStyle}>
            <div className={style.bottomStyleItem}>
                <div className={style.key}>{state.directAgentNum}</div>
                <div className={style.val}>{t('CUST.translate213')}</div>
            </div>
            <div className={style.bottomStyleItem}>
                <div className={style.key}>{state.directUserNum}</div>
                <div className={style.val}>{t('CUST.translate215')}</div>
            </div>
            <div className={style.bottomStyleItem}>
                <div className={style.key}>{state.thisMonthDepositUserNum}</div>
                <div className={style.val}>{t('CUST.translate23')}</div>
            </div>
        </div>
    </div >
}

export default Item