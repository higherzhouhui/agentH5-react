// 直属代理抽成
import React, { useEffect, useState } from 'react'
import { List, Skeleton } from 'antd-mobile'
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from './components/header'
import { childCommissionStatisRequest } from '../../api/form.js'
import style from './common.module.scss'
import { useTranslation } from "react-i18next"
import { RightOutline } from 'antd-mobile-icons'
import { useNavigate } from "react-router-dom"

import './common.scss'
import TimePicker from './components/timePicker';


const AnchorList = () => {
    const { t } = useTranslation()
    const pageSize = 20
    const LIST = [{ list: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}] }]
    let [load, setLoad] = useState(true)
    let [list, setList] = useState([])
    let [pageNum, setPageNum] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const history = useNavigate()
    useEffect(() => {
        loadMore()
    }, [])
    async function loadMore(month, page, agentAccount) {
        let isReload = page == 1 || !list.length
        if (isReload) {
            setList(LIST)
            setLoad(true)
        }
        let page_num = page || pageNum
        let append = await childCommissionStatisRequest({
            month,
            pageNum: page_num,
            pageSize,
            agentAccount
        })
        append.rows = append.rows || []
        let info = {}
        append.rows.forEach(item => {
            if (info[item.mouth]) {
                info[item.mouth].push(item)
            } else {
                info[item.month] = [item]
            }
        })
        let lists = Object.keys(info).map(key => {
            return {
                mouth: key,
                list: info[key]
            }
        }).sort((a, b) => a.mouth - b.mouth)
        setList(val => {
            if (!isReload) return [...val, ...lists]
            return lists
        })
        setLoad(false)
        setPageNum(page_num + 1)
        setHasMore(page_num * pageSize < append.total)
    }
    const toDetail = (state) => {
        history('/drawing_directreport_detail', { state })
    }
    const search = (month) => {
        setList([])
        setHasMore(false)
        loadMore(month, 1)
    }
    const searchOnchange = (val) => {
        setList([])
        setHasMore(false)
        loadMore('', 1, val)
    }
    return <div className={style.formBg}>
        <Header title={t('CUST.translate252')} searchOnchange={searchOnchange} topDom={<TimePicker onChange={search} />} />
        {
            list.length > 0 ?
                <InfiniteScroll
                    next={loadMore}
                    scrollableTarget="scrollableDiv"
                    hasMore={hasMore}
                    dataLength={list.length}>
                    <List className={style.formBody}>
                        {list.map((item, index) => (
                            <div key={index}>
                                <div className={style.monthStyle}>
                                    {item.mouth}
                                </div>
                                {
                                    item.list.map((iitem, iindex) => {
                                        return load ? <Skeleton key={iindex} style={{ height: '11rem' }} animated className={`${style.formItem} ${load && 'loading'}`}  /> :
                                            <div className={style.formItem} key={iindex} onClick={() => toDetail(iitem)}>
                                                <div className={style.topInfo}>
                                                    <div className={style.leftInfo}>{t('CUST.dlID')}:{iitem.agentId}</div>
                                                    <div className={style.rightInfo}><RightOutline /></div>
                                                </div>
                                                <div className={style.bottomInfo}>
                                                    <div className={style.bottomInfoItem}>
                                                        <div className={style.item}>
                                                            <div className={style.key}>{t('CUST.translate247')}</div>
                                                            <div className={style.val}>{iitem.bonusAmt}</div>
                                                        </div>
                                                        <div className={style.item}>
                                                            <div className={style.key}>{t('CUST.translate248')}</div>
                                                            <div className={style.val}>{iitem.platformAmt}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={style.bottomInfo}>
                                                    <div className={style.bottomInfoItem}>
                                                        <div className={style.item}>
                                                            <div className={style.key}>{t('CUST.translate249')}</div>
                                                            <div className={style.val}>{iitem.netProfitAmt}</div>
                                                        </div>
                                                        <div className={style.item}>
                                                            <div className={style.key}>{t('CUST.translate254')}</div>
                                                            <div className={`${style.val}`}>{iitem.parentAgentCommission}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    })
                                }

                            </div>

                        ))}
                    </List>
                </InfiniteScroll>
                :
                <div className={style.noData}>{t('CUST.translate327')}</div>
        }

    </div>

}

export default AnchorList