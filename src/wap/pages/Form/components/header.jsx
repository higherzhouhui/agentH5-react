import React, { useEffect, useState } from 'react'
import LEFT_ICON_IMG from '../../../assets/image/form/left-jt-icon.png'
import style from '../common.module.scss'
import { useNavigate } from "react-router-dom"
import Search from './search';

const Header = (props) => {
    let timer = 200
    let tm = null
    let [visible, setVisible] = useState(false)
    const history = useNavigate()
    const toBack = () => {
        history(props.backLink || '/report')
    }
    const searchShow = () => {
        setVisible(true)
    }
    const onChange = (e) => {
        clearTimeout(tm)
        let value = e.target.value
        tm = setTimeout(()=>{
            props.searchOnchange(value)
        }, timer)
    }
    const cancel = () => {
        setVisible(false)
        props.searchOnchange('')
    }
    return <div className={style.topFixed} >
        <div className={style.commonHeader}>
            {
                !props.noBack ? <img onClick={toBack} className={style.icon} src={LEFT_ICON_IMG} /> : ''
            }
            {props.title}
        </div>
        {!visible ? props.topDom : ''}
        {
            props.searchOnchange ? <Search visible={visible} onChange={onChange} cancel={cancel} choice={searchShow} /> : ''
        }
        
    </div>
}
export default Header