// 主播打赏抽成
import React, { useEffect, useState } from 'react'
import { List, Skeleton } from 'antd-mobile'
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from './components/header'
import TimePicker from './components/timePicker';
import { giftCommissionStatis } from '../../api/form.js'
import style from './common.module.scss'
import './common.scss'
import { useTranslation } from "react-i18next"

const AnchorList = () => {
    const { t } = useTranslation()
    const pageSize = 20
    const LIST = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    let [load, setLoad] = useState(true)
    let [list, setList] = useState([])
    let [pageNum, setPageNum] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    async function loadMore(month, page) {
        let isReload = page == 1 || !list.length
        if (isReload) {
            setList(LIST)
            setLoad(true)
        }
        let page_num = page || pageNum
        let append = await giftCommissionStatis({
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
    useEffect(() => {
        loadMore()
    }, [])
    return <div className={style.formBg}>
        <Header title={t('CUST.translate261')} topDom={<TimePicker onChange={search} />} />
        {
            list.length > 0 ?
                <InfiniteScroll
                    next={loadMore}
                    scrollableTarget="scrollableDiv"
                    hasMore={hasMore}
                    dataLength={list.length}>
                    <List className={style.formBody}>
                        {list.map((item, index) => {
                            return load ? <Skeleton key={index} style={{ height: '6.68rem' }} animated className={`${style.formItem} ${load && 'loading'}`}  /> :
                                <div className={style.formItem} key={index}>
                                    <div className={style.topInfo}>
                                        <div className={style.leftInfo}>{item.month}</div>
                                        <div className={style.rightInfo}>{t('CUST.dlID')}:{item.agentId}</div>
                                    </div>
                                    <div className={style.bottomInfo}>
                                        <div className={style.bottomInfoItem}>
                                            <div className={style.item}>
                                                <div className={style.key}>{t('CUST.translate262')}</div>
                                                <div className={style.val}>{item.giftAmt}</div>
                                            </div>
                                            <div className={style.item}>
                                                <div className={style.key}>{t('CUST.translate263')}</div>
                                                <div className={style.val}>{item.commissionRatio}%</div>
                                            </div>
                                            <div className={style.item}>
                                                <div className={style.key}>{t('CUST.translate264')}</div>
                                                <div className={style.val}>{item.giftAmt / 100 * item.commissionRatio}</div>
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