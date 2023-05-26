import { Toast } from 'antd-mobile';
import React, { useEffect, useState } from 'react'
import { useTranslation } from "react-i18next"
import { useNavigate, useLocation } from 'react-router-dom'
import { getWalletList, getBankList, bankmyUpdate, walletmyUpdate } from '../../../api/user';
import CardItem from '../../../components/cardItem';

import style from './index.module.scss'

const BindCard = () => {
  const { t } = useTranslation()
  const history = useNavigate()
  const { state } = useLocation();
  const tabList = [
    {label: t('CUST.translate111'), value: 'bank'}, 
    {label: t('CUST.translate113'), value: 'usdt'}, 
  ]
  const [bankList, setBankList] = useState([])
  const [usdtList, setUsdtList] = useState([])
  const [currentTab, setCurrentTab] = useState(tabList[0])
  const [loading, setLoading] = useState(true)
  const initData = async(type) => {
    setLoading(true)
    if (!type || type === 'bank') {
      const bankList = await getBankList()
      setLoading(false)
      if (bankList.code === 200) {
        setBankList([...(bankList.rows || [])])
      } else {
        Toast.show(res.msg)
      }
    }
    if (!type || type === 'usdt') {
      setLoading(true)
      const wallList =  await getWalletList()
      setLoading(false)
      if (wallList.code === 200) {
        setUsdtList([...(wallList.rows || [])])
      } else {
        Toast.show(res.msg)
      }
    }
  }
  const handleChangeStatus = (item, type, isDelete) => {
    const cstatus = item.bindStatus === 0 ? 1 : 0;
    const delFlag = isDelete ? 1 : 0
    setLoading(true)
    if (type === 'bank') {
      bankmyUpdate({...item, bindStatus: cstatus, delFlag}).then(res => {
        setLoading(false)
        if (res?.code === 200) {
          Toast.show(t('CUST.translate146'))
          initData(type)
        } else {
          Toast.show(res.msg)
        }
      })
    }
    if (type === 'usdt') {
      walletmyUpdate({...item, bindStatus: cstatus, delFlag}).then(res => {
        setLoading(false)
        if (res?.code === 200) {
          Toast.show(t('CUST.translate146'))
          initData(type)
        } else {
          Toast.show(res.msg)
        }
      })
    }
  }
  const addNewCard = () => {
    history('/baseInfo/addNew', {state: {type: currentTab.value}})
  }
  // 返回到申请提款
  const handleBack = () => {
    if (state?.path) {
      history('/baseInfo/withdraw', {state: {type: currentTab.value}})
    } else {
      history('/baseInfo')
    }
  }
  useEffect(() => {
    initData()
    tabList.forEach(item => {
      if (item.value === state?.type) { 
        setCurrentTab(item)
      }
    })
  }, [])
  return <div className={`${style.container} ${loading ? 'loading' : ''}`}>
    <div className={style.header}>
    {t('CUST.translate102')}
      <img src={require('../../../assets/image/info/back.png')} className={style.backBtn} onClick={() => handleBack()} />
    </div>
    <div className={style.tabList}>
      {
        tabList.map((item, index) => {
          return <div key={index} className={`${style.tab} ${currentTab.value === item.value ? style.tabActive : ''}`} onClick={() => setCurrentTab(item)}>
            {item.label}
          </div>
        })
      }
    </div>
    <div className={style.main}>
      {
        currentTab.value === tabList[0].value ? <div>
          {
            bankList.map((item, index) => {
              return <CardItem {...item} key={index} handleChangeStatus={() => handleChangeStatus(item, 'bank')} handleDelete={() => handleChangeStatus(item, 'bank', true)}/>
            })
          }
        </div> : <div>
          {
            usdtList.map((item, index) => {
              return <CardItem {...item} key={index} handleChangeStatus={() => handleChangeStatus(item, 'usdt')} handleDelete={() => handleChangeStatus(item, 'usdt', true)}/>
            })
          }
        </div>
      }
      <div className={style.addNew} onClick={() => addNewCard()}>
        <img src={require('../../../assets/image/common/oadd.png')} />
        <span>{`${t('CUST.translate112')}${currentTab.value === tabList[0].value ? t('CUST.translate111') : t('CUST.translate113')}`}</span>
      </div>
    </div>
  </div>
}
export default BindCard
