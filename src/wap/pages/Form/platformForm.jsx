import React, { useEffect, useState } from 'react'
import { List, Skeleton } from 'antd-mobile'
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from './components/header'
import { gamePlatformStatis } from '../../api/form.js'
import style from './common.module.scss'
import './common.scss'
import { useTranslation } from "react-i18next"
import TimePicker from './components/timePicker';
import { useNavigate } from "react-router-dom"
import { RightOutline } from 'antd-mobile-icons'

const AnchorList = () => {
    const { t } = useTranslation()
    const pageSize = 20
    const LIST = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    let [load, setLoad] = useState(true)
    let [list, setList] = useState([])
    let [pageNum, setPageNum] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const history = useNavigate()

    useEffect(() => {
        loadMore()
    }, [])
    const toDetail = (state) => {
        history('/platform_detail', { state })
    }
    async function loadMore(month, page) {
        let isReload = page == 1 || !list.length
        if (isReload) {
            setList(LIST)
            setLoad(true)
        }
        let page_num = page || pageNum
        let append = await gamePlatformStatis({
            month,
            pageNum: page_num,
            pageSize
        })
        append.rows = append.rows || []
        append.rows = append.rows.map(item => {
            let info = {}
            item.gamePlatformVOList.forEach(data => {
                switch (data.gameType) {
                    case 12: {
                        info.zr = {
                            name: 'translate300',
                            platformAmt: data.platformAmt,
                            platformRatio: data.platformRatio,
                            totalProfit: data.totalProfit
                        }
                        break;
                    }
                    case 13: {
                        info.ty = {
                            name: 'translate298',
                            platformAmt: data.platformAmt,
                            platformRatio: data.platformRatio,
                            totalProfit: data.totalProfit
                        }
                        break;
                    }
                    case 14: {
                        info.dz = {
                            name: 'translate303',
                            platformAmt: data.platformAmt,
                            platformRatio: data.platformRatio,
                            totalProfit: data.totalProfit
                        }
                        break;
                    }
                    case 16: {
                        info.qp = {
                            name: 'translate299',
                            platformAmt: data.platformAmt,
                            platformRatio: data.platformRatio,
                            totalProfit: data.totalProfit
                        }
                        break;
                    }
                    case 18: {
                        info.by = {
                            name: 'translate302',
                            platformAmt: data.platformAmt,
                            platformRatio: data.platformRatio,
                            totalProfit: data.totalProfit
                        }
                        break;
                    }
                    case 999: {
                        info.cp = {
                            name: 'translate301',
                            platformAmt: data.platformAmt,
                            platformRatio: data.platformRatio,
                            totalProfit: data.totalProfit
                        }
                        break;
                    }
                }
            })
            item.info = info
            return item
        })
        setList(val => {
            if (!isReload) return [...val, ...append.rows]
            return append.rows
        })
        setLoad(false)
        setPageNum(page_num + 1)
        setHasMore(page_num * pageSize < append.total)
    }
    const search = (month) => {
        setList([])
        setHasMore(false)
        loadMore(month, 1)
    }
    return <div className={style.formBg}>
        <Header title={t('CUST.translate295')} topDom={<TimePicker onChange={search} />} />
        {
            list.length > 0 ?
                <InfiniteScroll
                    next={loadMore}
                    scrollableTarget="scrollableDiv"
                    hasMore={hasMore}
                    dataLength={list.length}>
                    <List className={style.formBody}>
                        {list.map((item, index) => {
                            return load ? <Skeleton key={index} style={{ height: '10rem' }} animated className={`${style.formItem} ${load && 'loading'}`}  /> :
                                <div className={style.formItem} key={index} onClick={() => toDetail(item)}>
                                    <div className={style.topInfo}>
                                        <div className={style.leftInfo}>{item.month}</div>
                                        <div className={style.rightInfo}>{t('CUST.dlID')}:{item.agentId}<RightOutline /></div>
                                    </div>
                                    <div className={style.bottomInfo}>
                                        <div className={style.bottomInfoItem}>
                                            <div className={style.item}>
                                                <div className={style.key}>{t('CUST.' + item.info.ty.name)}</div>
                                                <div className={style.val}>{item.info.ty.platformAmt}</div>
                                            </div>
                                            <div className={style.item}>
                                                <div className={style.key}>{t('CUST.' + item.info.qp.name)}</div>
                                                <div className={style.val}>{item.info.qp.platformAmt}</div>
                                            </div>
                                            <div className={style.item}>
                                                <div className={style.key}>{t('CUST.' + item.info.zr.name)}</div>
                                                <div className={style.val}>{item.info.zr.platformAmt}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={style.bottomInfo}>
                                        <div className={style.bottomInfoItem}>
                                            <div className={style.item}>
                                                <div className={style.key}>{t('CUST.' + item.info.cp.name)}</div>
                                                <div className={style.val}>{item.info.cp.platformAmt}</div>
                                            </div>
                                            <div className={style.item}>
                                                <div className={style.key}>{t('CUST.' + item.info.by.name)}</div>
                                                <div className={style.val}>{item.info.by.platformAmt}</div>
                                            </div>
                                            <div className={style.item}>
                                                <div className={style.key}>{t('CUST.' + item.info.dz.name)}</div>
                                                <div className={style.val}>{item.info.dz.platformAmt}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        })}
                    </List>
                </InfiniteScroll>
                :
                <div className={style.noData}>{t('CUST.translate327')}</div>
        }
    </div>

}

export default AnchorList