import React, { useEffect, useState, useRef } from 'react'
import { TabBar } from '../../components'
import { useNavigate } from "react-router-dom"
import { Tabs, List, Skeleton } from 'antd-mobile'
import Header from './components/header'
import style from './common.module.scss'
import './common.scss'
import { useTranslation } from "react-i18next"
import TimePicker from './components/timePicker';
import Select from './components/select'
import Item from './components/item'
import MemberItem from './components/memberItem'
import { AddOutline } from 'antd-mobile-icons'
import useContextReducer from '../../state/useContextReducer'
import InfiniteScroll from 'react-infinite-scroll-component';
import { pageList, directMemberList } from '../../api/poxy'
import { RoleTypeDictory } from '../../util/tool'
import { Local } from '../../../common'


function PoxyIndex() {
    const { state: { role } } = useContextReducer.useContextReducer()
    let { t } = useTranslation()
    const history = useNavigate()
    const pageSize = 20
    const LIST = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    let [load, setLoad] = useState(true)
    let [loading, setLoading] = useState(false)
    let TYPE = role.includes(RoleTypeDictory.Direct) ? 2 : (Local('proxyType') || 1);
    let Search = window.location.search;
    if (Search && Search.indexOf('type=') != -1) {
        let type = Search.split('type=')[1].split('&')[0]
        TYPE = type
        Local('proxyType', type)
    }
    let [type, setType] = useState(TYPE)
    let [list, setList] = useState([])
    let [pageNum, setPageNum] = useState(1)
    let [searchInfo, setSearchInfo] = useState({})
    const [hasMore, setHasMore] = useState(true)
    let headerRef = useRef()
    let TimerRef = useRef()
    // setType(2)
    useEffect(() => {
        if (Search && Search.indexOf('type=') != -1) {
            let type = Search.split('type=')[1].split('&')[0]
            loadMore(1, {}, type)
        } else {
            loadMore()
        }
    }, [])
    const getIndex = (index)=> {
        
        return index % 5
    }
    async function loadMore(page, data = {}, stype) {
        if (loading) return
        setLoading(true)
        try {
            let isReload = page == 1 || !list.length
            if (isReload) {
                setList(LIST)
                setLoad(true)
            }
            let page_num = page || pageNum
            let method = stype == 1 || (!stype && type == 1) ? pageList : directMemberList
            let append = await method(Object.assign({}, {
                pageNum: page_num,
                pageSize,
            }, data))
            append.rows = append.rows || []
            append.rows.forEach((item, index)=>{
                item.index = getIndex(index)
            })
            setList(val => {
                if (!isReload && page_num != 1) return [...val, ...append.rows]
                return append.rows
            })
            setLoading(false)
            setLoad(false)
            setPageNum(page_num + 1)
            setHasMore(page_num * pageSize < append.total)
        } catch (error) {
            setLoading(false)
        }

    }

    const tabChange = (type) => {
        if (loading) return
        Local('proxyType', type)
        setType(type)
        setList([])
        setSearchInfo({})
        setHasMore(false)
        loadMore(1, {}, type)
        headerRef.current.searchShow(false)
        TimerRef?.current?.clearTime()
    }
    const searchOnchange = (val) => {
        if (type == 1) {
            search({ agentAccount: val })
        } else {
            search({ uid: val })
        }
    }
    const search = (data) => {
        setList([])
        setHasMore(false)
        searchInfo = Object.assign({}, searchInfo, data)
        setSearchInfo(searchInfo)
        loadMore(1, searchInfo)
    }
    const toProxyDetail = (state) => {
        // location.search = '?type=' + type
        if (type == 1) history('/proxy_detail', { state })
        else history('/member_detail', { state })
    }
    const topDom = () => {
        return <div className={style.searchBox}>
            {type == 1 ?
                <Select key="select" onChange={search} /> : ''
            }
            <TimePicker ref={TimerRef} key="timer" onChange={search} />
        </div>
    }
    return <div className={style.body}>
        <div className={style.toFixed}>
            <div className={style.topStyles}>
                {
                    role.includes(RoleTypeDictory.Direct) ? null :
                        <div className={`${style.topItemStyle} ${type == '1' && style.active}`} onClick={() => tabChange('1')} >{t('CUST.translate185')}</div>
                }
                <div className={`${style.topItemStyle} ${type == '2' && style.active}`} onClick={() => tabChange('2')} >{t('CUST.translate221')}</div>
            </div>
            {/* <Tabs className={style.topStyle} defaultActiveKey={type} onChange={tabChange}> */}
            {/* 总代的二级代理之下无下级代理 */}
            {/* {
                     : <Tabs.Tab title={t('CUST.translate185')} key={'1'} className={style.topItemStyle}>
                    </Tabs.Tab>
                } */}


            {/* <Tabs.Tab title={t('CUST.translate221')} key={'2'} className={style.topItemStyle}> */}
            {/* </Tabs.Tab> */}
            {/* </Tabs> */}
            <Header key='headerRef' type={type} ref={headerRef} noBack={true} searchOnchange={searchOnchange} topDom={topDom()} />
        </div>
        {
            type == 1 ?
                <AddOutline className={style.addProxyIcon} onClick={() => history('/create_proxy')} /> : ''
        }
        <div className={`${style.scrollBox3} ${style.scrollBox}`}>
            {
                list.length > 0 ?
                    <InfiniteScroll
                        next={loadMore}
                        scrollableTarget="scrollableDiv"
                        hasMore={hasMore}
                        dataLength={list.length}>
                        <List className={style.formBody}>
                            {list.map((item, index) => (<div onClick={() => toProxyDetail(item)} key={index}>{
                                load ? <Skeleton key={index} style={{ height: '7rem', marginBottom: '.5rem' }} animated className={`${style.formItem} ${load && 'loading'}`} /> :
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

        <TabBar active="/agent" />
    </div>
}

export default PoxyIndex