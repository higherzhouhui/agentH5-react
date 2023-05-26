// 代理详情
import React, { useEffect, useState } from 'react'
import Header from '../Form/components/header'
import { useTranslation } from "react-i18next"
import { List, Skeleton } from 'antd-mobile'
import InfiniteScroll from 'react-infinite-scroll-component';
import style from './common.module.scss'
import './common.scss'
import { useLocation, useNavigate } from "react-router-dom"
import ICON from '../../assets/image/form/plat_icon.png'
import Item from './components/item'
import MemberItem from './components/memberItem'
import { pageList, directMemberList } from '../../api/poxy'
import { Local } from '../../../common'



const ProxyDetail = () => {
    let { t } = useTranslation()
    const pageSize = 20
    const LIST = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    const history = useNavigate()
    let [load, setLoad] = useState(false)
    let { state } = useLocation()
    let [type, setType] = useState(1)
    let [list, setList] = useState([])
    let [pageNum, setPageNum] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    function toBack() {
        history('/agent?type=1')
    }
    useEffect(() => {
        // window.addEventListener("popstate", toBack)
        loadMore()
    }, [])
    useEffect(() => {
        // return () => {
        //     setTimeout(() => {
        //         window.removeEventListener('popstate', toBack)
        //     }, 10)

        // }
    }, [])
    const toUpcase = (str) => {
        if (!str) return ''
        let F = str.substr(0, 1).toUpperCase()
        return `${F}${str.substr(1, 1)}`
    }
    const poxyNameList = [
        t('CUST.translate197'),
        t('CUST.translate198'),
        t('CUST.translate199'),
        t('CUST.translate200'),
        t('CUST.translate201')
    ]
    async function loadMore(page, data = {}, stype) {
        try {
            let isReload = page == 1 || !list.length
            setLoad(true)
            if (isReload) {
                setList(LIST)
            }
            let page_num = page || pageNum
            let method = stype == 1 || (!stype && type == 1) ? pageList : directMemberList
            const agentId = state.agentId
            let param = {
                pageNum: page_num,
                pageSize,
                agentStatus: '',
                agentAccount: ''
            }
            if (stype == 1 || (!stype && type == 1)) {
                param.agentPid = agentId
            } else {
                param.agentId = agentId
            }
            let append = await method(Object.assign({}, param, data))
            setList(val => {
                if (!isReload) return [...val, ...append.rows]
                return append.rows
            })
            setLoad(false)
            setPageNum(page_num + 1)
            setHasMore(page_num * pageSize < append.total)
        } catch (error) {
            setLoad(false)
        }

    }
    const checkType = (type) => {
        if (load) return
        setType(type)
        setList([])
        setHasMore(false)
        loadMore(1, {}, type)
    }
    return <div style={{ minHeight: '100vh', background: '#ECEFF7' }}> <div className={`${style.proxyIndex} ${style.proxyDetial}`}>
        <Header title={t('CUST.translate427')} backLink='/agent' />
        <div className={style.itemDetail}>
            <div className={style.topStyle}>
                <div className={style.leftInfo}>
                    <div className={`${style.head} ${style['head' + state.index]}`}>{toUpcase(state.agentAccount)}</div>
                    <div className={style.UserInfo}>
                        <div className={style.name}>{state.agentAccount}</div>
                        <div className={style.id}>{t('CUST.dlID')}:{state.agentId}</div>
                    </div>
                </div>
                <div className={style.rightInfo}>
                    <div className={`${style.status}  ${state.agentStatus == 1 ? style.status1 : ''}`} >{state.agentStatus == 1 ? t('CUST.translate116') : t('CUST.translate191')}</div>
                    <div className={style.time}></div>
                </div>
            </div>
        </div>
        <div className={style.itemDetail}>
            <div className={style.centerStyle}>
                <div className={style.centerStyleItem}>
                    <div className={style.key}>{t('CUST.translate65')}</div>
                    <div className={style.val}>{poxyNameList[state.agentType]}</div>
                </div>
                <div className={style.centerStyleItem}>
                    <div className={style.key}>{t('CUST.translate409')}{t('CUST.translate30')}</div>
                    <div className={style.val}>{state.registerTime}</div>
                </div>
            </div>
        </div>
        <div className={style.itemOterBox}>
            <div className={style.itemDetailTitle}>{t('CUST.translate428')}</div>
            <div className={style.itemDetail}>
                <div className={style.bottomStyle}>
                    <div className={style.bottomStyleItem}>
                        <div className={style.key}>{state.directAgentNum}</div>
                        <div className={style.val}>{t('CUST.translate213')}</div>
                    </div>
                    <div className={style.bottomStyleItem}>
                        <div className={style.key}>{state.thisMonthDirectAgentNum}</div>
                        <div className={style.val}>{t('CUST.translate214')}</div>
                    </div>
                </div>
                <div className={style.bottomStyle}>
                    <div className={style.bottomStyleItem}>
                        <div className={style.key}>{state.directUserNum}</div>
                        <div className={style.val}>{t('CUST.translate215')}</div>
                    </div>
                    <div className={style.bottomStyleItem}>
                        <div className={style.key}>{state.thisMonthDirectUserNum}</div>
                        <div className={style.val}>{t('CUST.translate216')}</div>
                    </div>
                </div>
                <div className={style.bottomStyle}>
                    <div className={style.bottomStyleItem}>
                        <div className={style.key}>{state.thisMonthDepositUserNum}</div>
                        <div className={style.val}>{t('CUST.translate23')}</div>
                    </div>
                    <div className={style.bottomStyleItem}>
                        <div className={style.key}>{state.thisMonthValidUserNum}</div>
                        <div className={style.val}>{t('CUST.translate24')}</div>
                    </div>
                </div>
            </div>

        </div>
        <div className={style.proxyDetialDec}><img src={ICON} /> <span>{t('CUST.translate429')}</span></div>
        <div className={style.proxyDetailCheckTitle}>
            <div onClick={() => checkType(1)} className={`${style.proxyDetailCheckTitleItem} ${type == 1 ? style.active : ''}`}>
                {t('CUST.translate213')}
            </div>
            <div onClick={() => checkType(2)} className={`${style.proxyDetailCheckTitleItem} ${type == 2 ? style.active : ''}`}>
                {t('CUST.translate215')}
            </div>
        </div>

    </div>
        <div className={style.scrollBox2}>
            {
                list.length > 0 ?
                    <InfiniteScroll
                        next={loadMore}
                        scrollableTarget="scrollableDiv"
                        hasMore={hasMore}
                        dataLength={list.length}>
                        <List className={style.formBody}>
                            {list.map((item, index) => (<div key={index}>{
                                load ? <Skeleton key={index} style={{ height: '7rem', marginBottom: '.5rem' }} animated className={`${style.formItem}`} /> :
                                    type == 1 ?
                                        <Item key={index} state={item} />
                                        :
                                        <MemberItem key={index} state={item} />
                            }</div>)
                            )}
                        </List>
                    </InfiniteScroll>
                    :
                    <div className={style.noData}>{t('CUST.translate327')}</div>
            }
        </div>
    </div>
}
export default ProxyDetail