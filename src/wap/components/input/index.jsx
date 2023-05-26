import React, { useEffect, useState } from "react"
import Style from './index.module.scss'
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons'
import { Input } from "antd-mobile"

const Inputs = (props) => {

    const { type, placeholder, maxLength, onChange, value, disabled, eye_color, color } = props

    //是否为密码数据框
    const [showPass, setShowPass] = useState(false)
    const inputRightIcon = () => {
        if (type === 'password') {
            return showPass ? <EyeOutline onClick={switchEyes} fontSize={18} color={eye_color || '#333'} /> : <EyeInvisibleOutline color={eye_color || '#333'} onClick={switchEyes} fontSize={18} />
        } else return <div></div>
    }

    //切换可见密码
    const switchEyes = () => {
        setShowPass(!showPass)
    }

    //当密码框可显示时切换
    useEffect(() => {
        setInputType(type === 'password' && !showPass ? 'password' : (type === 'account' || type === 'phone') ? 'tel' : 'text')
    }, [showPass, type])

    const [inputType, setInputType] = useState('text')

    return <div className={`${Style.inputBox} ${props.className}`}>
        <Input {...props} clearable={!props.hideClearable} disabled={disabled} type={inputType} placeholder={placeholder} maxLength={maxLength || 16} onChange={onChange} value={value} className={
            color === 'color3' ?
                Style.color3 :
                ''}
        />
        {inputRightIcon()}
    </div>
}

export default Inputs