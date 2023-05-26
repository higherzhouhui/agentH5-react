
import React, { useState, forwardRef, useImperativeHandle } from 'react'
import style from '../common.module.scss'
import { DatePicker } from 'antd-mobile'
import { CloseCircleOutline } from 'antd-mobile-icons'
import { useTranslation } from "react-i18next"

import ICON from '../../../assets/image/form/date-icon.png'
const TimePicker = forwardRef((props, ref) => {
    let [visible, setVisible] = useState(false)
    let [visible2, setVisible2] = useState(false)
    let [min, setMin] = useState(new Date(0))
    let [time, setTime] = useState('')
    let { t } = useTranslation()

    function onClick() {
        setVisible(true)
    }
    useImperativeHandle(ref, () => {
        return {
            clearTime
        }
    })
    function onConfirm(val) {
        setVisible(false)
        if (!val) return
        setMin(val)
        setVisible2(true)
    }

    function onConfirm2(val) {
        setVisible2(false)
        if (!val) return
        let y = val.getFullYear()
        let m = val.getMonth() + 1
        let d = val.getDate()
        d = d >= 10 ? d : ('0' + d)
        m = m >= 10 ? m : ('0' + m)
        let str = `${y}-${m}-${d}`
        let my = min.getFullYear()
        let mm = min.getMonth() + 1
        let md = min.getDate()
        md = md >= 10 ? md : ('0' + md)
        mm = mm >= 10 ? mm : ('0' + mm)
        let str1 = `${my}-${mm}-${md}`
        setTime(`${str1} / ${str}`)
        props.onChange({
            startDate: str1,
            endDate: str
        })
    }
    function clearTime(e) {
        e?.preventDefault()
        e?.stopPropagation()
        setTime('')
        if(!e) return
        props.onChange({
            startDate: '',
            endDate: ''
        })
    }
    return <>
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
            title={t('CUST.translate193')}
            visible={visible}
            size="middle" />
        <DatePicker
            min={min}
            cancelText={t('CUST.translate97')}
            confirmText={t('CUST.translate98')}
            title={t('CUST.translate194')}
            onConfirm={onConfirm2}
            onClose={onConfirm2}
            visible={visible2}
            size="middle" />
    </>

})
export default TimePicker
