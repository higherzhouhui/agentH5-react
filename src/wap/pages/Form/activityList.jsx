// 活动红利
import React, { useEffect, useState } from 'react'
import { List, Skeleton } from 'antd-mobile'
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from './components/header'
import { activityBonusStatis } from '../../api/form.js'
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
        let append = await activityBonusStatis({
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
        <Header title={t('CUST.translate238')} topDom={<TimePicker onChange={search} />} />
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
                                <div className={style.formItem} key={index}>
                                    <div className={style.topInfo}>
                                        <div className={style.leftInfo}>{item.month}</div>
                                        <div className={style.rightInfo}>{t('CUST.dlID')}:{item.agentId}</div>
                                    </div>
                                    <div className={style.bottomInfo}>
                                        <div className={style.bottomInfoItem}>
                                            <div className={style.item}>
                                                <div className={style.key}>{t('CUST.translate239')}</div>
                                                <div className={style.val}>{item.joinPerson}</div>
                                            </div>
                                            <div className={style.item}>
                                                <div className={style.key}>{t('CUST.translate240')}</div>
                                                <div className={style.val}>{item.bonusAmt}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={style.bottomInfo}>
                                        <div className={style.bottomInfoItem}>
                                            <div className={style.item}>
                                                <div className={style.key}>{t('CUST.qitahongli')}</div>
                                                <div className={style.val}>{item.otherBonusAmt}</div>
                                            </div>
                                            <div className={style.item}>
                                                <div className={style.key}>{t('CUST.huodongpafazonghongli')}</div>
                                                <div className={style.val}>{item.totalBonusAmt}</div>
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