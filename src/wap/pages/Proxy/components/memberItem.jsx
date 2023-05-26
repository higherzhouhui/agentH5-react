
import React, { useEffect, useState } from 'react'
import style from '../common.module.scss'
import { useTranslation } from "react-i18next"

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
            <div className={style.leftInfo}>
                {
                    state.userIcon ? <img className={style.avatar} src={state.userIcon} /> :
                        <div className={`${style.head} ${style['head' + state.index]}`}>{toUpcase(state.nickName)}</div>
                }
                {/* <div className={style.head}>{toUpcase(state.nickName)}</div> */}
                <div className={style.UserInfo}>
                    <div className={style.name}>{state.nickName}</div>
                    <div className={style.id}>ID:{state.uid}</div>
                </div>
            </div>
            <div className={style.rightInfo}>
                <div></div>
                <div className={style.time}>{state.createTime}</div>
            </div>

        </div>
        <div className={style.bottomStyle}>
            <div className={style.bottomStyleItem}>
                <div className={style.key}>{state.totalGiftAmt}</div>
                <div className={style.val}>{t('AGENT.translate6')}</div>
            </div>
            <div className={style.bottomStyleItem}>
                <div className={style.key}>{state.totalBetAmt}</div>
                <div className={style.val}>{t('CUST.translate233')}</div>
            </div>
            <div className={style.bottomStyleItem}>
                <div className={style.key}>{state.netProfitAmt}</div>
                <div className={style.val}>{t('CUST.translate39')}</div>
            </div>
        </div>
    </div >
}

export default Item