import React, { useEffect } from "react"
import { TabBar } from "antd-mobile"
import { useTranslation } from "react-i18next"
import { useNavigate, useLocation } from "react-router-dom"
import style from './index.module.scss'
import IconActivity from '../../assets/image/tab/index.png'
import IconActivityActive from '../../assets/image/tab/index-active.png'
import IconLive from '../../assets/image/tab/live.png'
import IconLiveActive from '../../assets/image/tab/live-active.png'
import IconGame from '../../assets/image/tab/game.png'
import IconGameActive from '../../assets/image/tab/game-active.png'
import IconMy from '../../assets/image/tab/my.png'
import IconMyActive from '../../assets/image/tab/my-active.png'
import { Local } from "../../../common"
const Tab = (props) => {
    const history = useNavigate()
    const location = useLocation()
    const { t } = useTranslation()
    let { active } = props
    useEffect(() => {
        active = location.pathname
    }, [])
    const tabs = [
        {
            key: '/home',
            title: t('CUST.translate336'),
            icon: (active) =>
                active ? <img src={IconActivityActive} className={style.tabIcon} /> : <img src={IconActivity} className={style.tabIcon} />,
        },
        {
            key: '/report',
            title: t('CUST.baobiao'),
            icon: (active) =>
                active ? <img src={IconGameActive} className={style.tabIcon} /> : <img src={IconGame} className={style.tabIcon} />,
        },
        {
            key: '/agent',
            title: t('CUST.daili'),
            icon: (active) =>
                active ? <img src={IconLiveActive} className={style.tabIcon} /> : <img src={IconLive} className={style.tabIcon} />,
        },
        {
            key: '/baseInfo',
            title: t('CUST.myOwn'),
            icon: (active) =>
                active ? <img src={IconMyActive} className={style.tabIcon} /> : <img src={IconMy} className={style.tabIcon} />,
        },
    ]

    const changeTab = (val) => {
        Local('proxyType', 1)
        history(val)
    }

    return <TabBar safeArea={true} className={style.tabBox} onChange={changeTab} defaultActiveKey={active}>
        {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
    </TabBar>
}
export default Tab