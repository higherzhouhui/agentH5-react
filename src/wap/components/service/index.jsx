import React from "react"
import { useTranslation } from "react-i18next"
import style from './index.module.scss'
const Service = (props) => {
    let url = 'https://kaijibetservice.com:443/chat/text/chat_10EgRA.html?skill=2c9d362b840ed391018432d509782a9b&l=ja'
    const onService = () => {
        window.location = url;
    }
    const { t } = useTranslation()

    return <div onClick={() => { onService() }}>
        <div className={style.service}><span>{t('text39')}</span></div>
    </div>
}
export default Service