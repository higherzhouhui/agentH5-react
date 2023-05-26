// 直属会员佣金
import React, { useEffect, useState } from 'react'
import { List, Skeleton } from 'antd-mobile'
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from './components/header'
import { memberCommissionStatis } from '../../api/form.js'
import style from './common.module.scss'
import { useTranslation } from "react-i18next"
import './common.scss'
import TimePicker from './components/timePicker';
import { RightOutline } from 'antd-mobile-icons'
import { useNavigate } from "react-router-dom"

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
    async function loadMore(month, page) {
        let isReload = page == 1 || !list.length
        if (isReload) {
            setList(LIST)
            setLoad(true)
        }
        let page_num = page || pageNum
        let append = await memberCommissionStatis({
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
    const toDetail = (state) => {
        history('/member_commission_detail', { state })
    }
    const search = (month) => {
        setList([])
        setHasMore(false)
        loadMore(month, 1)
    }
    return <div className={style.formBg}>
        <Header title={t('CUST.translate241')} topDom={<TimePicker onChange={search} />} />
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
                                        <div className={style.rightInfo}>{t('CUST.dlID')}:{item.agentId} <RightOutline /></div>
                                    </div>
                                    <div className={style.bottomInfo}>
                                        <div className={style.bottomInfoItem}>
                                            <div className={style.item}>
                                                <div className={style.key}>{t('CUST.translate35')}</div>
                                                <div className={style.val}>{item.totalBetValidAmt}</div>
                                            </div>
                                            <div className={style.item}>
                                                <div className={style.key}>{t('CUST.translate38')}</div>
                                                <div className={style.val}>{item.platformAmt}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={style.bottomInfo}>
                                        <div className={style.bottomInfoItem}>
                                            <div className={style.item}>
                                                <div className={style.key}>{t('CUST.translate39')}</div>
                                                <div className={style.val}>{item.netProfitAmt}</div>
                                            </div>
                                            <div className={style.item}>
                                                <div className={style.key}>{t('CUST.translate241')}</div>
                                                <div className={`${style.val}`}>{item.memberCommission}</div>
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