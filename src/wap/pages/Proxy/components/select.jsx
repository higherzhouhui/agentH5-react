import React, { useState } from 'react'
import { Picker } from 'antd-mobile'
import style from '../common.module.scss'
import { useTranslation } from "react-i18next"
import ICON from '../../../assets/image/common/down-icon.png'
const Select = (props) => {
    let { t } = useTranslation()
    let [visible, setVisible] = useState(false)
    let [value, setValue] = useState('')
    let columns = [[
        { label: t('CUST.translate190'), value: '' },
        { label: t('CUST.translate191'), value: '2' },
        { label: t('CUST.translate116'), value: '1' }
    ]]
    const showValue = () => {
        let str = ''
        columns[0].some(item => {
            if (item.value == value) {
                str = item.label
                return true
            }
        })
        return str
    }
    function onConfirm(val) {
        setVisible(false)
        if (!val) return
        setValue(val[0])
        props.onChange({agentStatus: val[0]})
    }
    return <>
        <div onClick={() => setVisible(true)} className={style.searchInput}>
            <span className={style.moudleColor}>{showValue()}</span>
            <img src={ICON} />
        </div>
        <Picker
            cancelText={t('CUST.translate97')}
            confirmText={t('CUST.translate98')}
            visible={visible}
            columns={columns}
            onConfirm={onConfirm}
            onClose={onConfirm}
        />
    </>
}

export default Select