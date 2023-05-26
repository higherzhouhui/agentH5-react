// 佣金调整统计列表
import React, { useEffect, useState } from 'react'
import { List, Skeleton } from 'antd-mobile'
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from './components/header'
import { commissionModifyStatis } from '../../api/form.js'
import style from './common.module.scss'
import { useTranslation } from "react-i18next"
import './common.scss'
import TimePicker from './components/timePicker';


const AnchorList = () => {
    const { t } = useTranslation()
    const pageSize = 20
    const LIST = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    let [load, setLoad] = useState(true)
    let [list, setList] = useState([])
    let [pageNum, setPageNum] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    useEffect(() => {
        loadMore()
    }, [])
    async function loadMore(month, page) {
        let isReload = page == 1 || !list.length
        if (isReload) {
            setList(LIST)
            setLoad(true)
        }
        let page_num = page || pageNum
        let append = await commissionModifyStatis({
            month,
            pageNum: page_num,
            pageSize
        })
        append.rows = append.rows || []
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
        <Header title={t('CUST.translate265')} topDom={<TimePicker onChange={search} />} />
        {
            list.length ?
                <InfiniteScroll
                    next={loadMore}
                    scrollableTarget="scrollableDiv"
                    hasMore={hasMore}
                    dataLength={list.length}>
                    <List className={style.formBody}>
                        {list.map((item, index) => {
                            return load ? <Skeleton key={index} style={{ height: '10rem' }} animated className={`${style.formItem} ${load && 'loading'}`}  /> :
                                <div className={style.formItem} key={index}>
                                    <div className={style.topInfo}>
                                        <div className={`${style.leftInfo}`}>
                                            {item.month}
                                        </div>
                                        <div className={`${style.rightInfo}`}>
                                            {t('CUST.dlID')}:{item.agentId}
                                        </div>
                                    </div>
                                    <div className={style.bottomInfo}>
                                        <div className={style.bottomInfoItem}>
                                            <div className={style.item}>
                                                <div className={style.key}>{t('CUST.translate42')}</div>
                                                <div className={style.val}>{item.modifyAmt}</div>
                                            </div>
                                            <div className={style.item}>
                                                <div className={style.key}>{t('CUST.modifyUserNum')}</div>
                                                <div className={style.val}>{item.modifyUserNum}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={style.bottomInfo2}>
                                        <div className={style.key}>{t('CUST.translate266')}</div>
                                        <div className={style.val}>{item.updateTime}</div>
                                    </div>
                                </div>
                        })}
                    </List>
                </InfiniteScroll> :
                <div className={style.noData}>{t('CUST.translate327')}</div>
        }

    </div>

}

export default AnchorList