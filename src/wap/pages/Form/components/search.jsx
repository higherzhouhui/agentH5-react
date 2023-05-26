// 搜索功能
import React, { useEffect, useState } from 'react'
import ICON from '../../../assets/image/form/search-icon.png'
import style from '../common.module.scss'
import { useTranslation } from "react-i18next"

const Search = (props) => {
    let { t } = useTranslation()
    let { visible, choice, cancel, onChange } = props
    return <div className={`${style.rightSearchBox} ${visible ? style.show : ''}`}>
        {
            visible ? <>

                <img className={style.inputSeachIcon} src={ICON} />
                <div className={style.searchInputBox}>
                    <input placeholder={t('CUST.translate188')} className={style.input} type="text" onChange={onChange}  />
                    <div className={style.txt} onClick={cancel}>{t('CUST.translate97')}</div>
                </div>
            </> : ''
        }

        <img onClick={choice} className={style.searchIcon} src={ICON} />
    </div>
}

export default Search