
import React, { useState } from 'react'
import style from '../common.module.scss'
import { DatePicker } from 'antd-mobile'
import { CloseCircleOutline } from 'antd-mobile-icons'
import { useTranslation } from "react-i18next"

import ICON from '../../../assets/image/form/date-icon.png'
const TimePicker = (props) => {
    let [visible, setVisible] = useState(false)
    let [time, setTime] = useState('')
    let { t } = useTranslation()
    function onClick() {
        setVisible(true)
    }
    function onConfirm(val) {
        setVisible(false)
        if (!val) return
        let date = new Date(val)
        let m = date.getMonth() + 1
        m = m >= 10 ? m : ('0' + m)
        let str = `${date.getFullYear()}-${m}`
        setTime(str)
        props.onChange(str)
    }
    function clearTime(e) {
        e.preventDefault()
        e.stopPropagation()
        setTime('')
        props.onChange('')
    }
    return <div className={style.searchBox}>
        <div className={style.searchInput} onClick={onClick}>
            {time || <span className={style.moudleColor}>{t('CUST.translate426')}</span>}
            {
                time ? <CloseCircleOutline onClick={clearTime} className={style.icon} /> : <img src={ICON} />
            }

        </div>
        <DatePicker
            cancelText={t('CUST.translate97')}
            confirmText={t('CUST.translate98')}
            onConfirm={onConfirm}
            onClose={onConfirm}
            precision="month"
            placeholder="请选择"
            visible={visible}
            size="middle" />
    </div>

}
export default TimePicker
