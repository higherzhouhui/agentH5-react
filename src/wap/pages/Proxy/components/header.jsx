import React, { useState, forwardRef, useImperativeHandle } from 'react'
import LEFT_ICON_IMG from '../../../assets/image/form/left-jt-icon.png'
import style from '../common.module.scss'
import { useNavigate } from "react-router-dom"
import Search from './search';
import { useTranslation } from "react-i18next"

const Header = forwardRef((props, ref) => {
    let timer = 200
    let { t } = useTranslation()
    let tm = null
    let [visible, setVisible] = useState(false)
    const history = useNavigate()
    useImperativeHandle(ref, () => {
        return {
            searchShow
        }
    })
    const toBack = () => {
        history(props.backLink || '/report')
    }
    const searchShow = (bol = true) => {
        setVisible(bol)
    }

    const onChange = (e) => {
        clearTimeout(tm)
        let value = e.target.value
        tm = setTimeout(() => {
            props.searchOnchange(value)
        }, timer)
    }
    const cancel = () => {
        setVisible(false)
        props.searchOnchange('')
    }
    return <div>
        {!visible ? props.topDom : ''}
        {
            props.searchOnchange ? <Search placeholder={props.type == 1 ? t('CUST.translate188') : t('CUST.translate223')} visible={visible} onChange={onChange} cancel={cancel} choice={searchShow} /> : ''
        }

    </div>
})
export default Header