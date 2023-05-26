import React, { useEffect, useState } from 'react'
import { useTranslation } from "react-i18next"
import { Button, Toast, Skeleton } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import style from './index.module.scss'
import useContextReducer from '../../../state/useContextReducer'
import { list } from '../../../api/extension'
import { copyUrlToClip } from '../../../../common'

const Promote = () => {
  const { t } = useTranslation()
  const history = useNavigate()
  const { state: { user } } = useContextReducer.useContextReducer()
  const [promoteLit, setPromoteList] = useState({})
  const [loading, setLoading] = useState(true)
  const getAgentLevel = (type) => {
    return levelList[type || 0].label
  }
  const  levelList = [
    { label: t('CUST.translate190'), value: '' },
    { label: t('CUST.translate197'), value: 0 },
    { label: t('CUST.translate323'), value: 1 },
    { label: t('CUST.translate324'), value: 2 },
    { label: t('CUST.translate325'), value: 3 },
    { label: t('CUST.translate326'), value: 4 },
    { label: t('CUST.translate326'), value: 5 },
    { label: t('CUST.translate326'), value: 6 },
    { label: t('CUST.translate326'), value: 7 },
    { label: t('CUST.translate326'), value: 8 },
  ]
  const handleBindCname = () => {
    history('/baseInfo/bindCname', {state: {groupId: promoteLit.groupId}})
  }
  const handleRouter = (type) => {
    history(type)
  }
  const firstToUpper = (str) => {
    if (str) {
      let name = str.charAt(0).toUpperCase()
      return name + str.slice(1)
    }
    return str
  }
  const handleCopy = (url) => {
    copyUrlToClip(url)
    Toast.show(t('CUST.translate144'))
  }
  useEffect(() => {
    setLoading(true)
    list({}).then(item => {
      setLoading(false)
      if (item.code === 200) {
        const result = item.rows || []
        let total = item.total
        result.map((ritem) => {
          ritem.privateDomainList = [];
          if (ritem.privateDomains) {
            (ritem.privateDomains || '').split('|').map(pitem => {
              if (pitem && ritem.bindCname) {
                ritem['privateDomainList'].push(`${pitem}(${ritem.bindCname})`)
              }
            })
          }
        })
        // 将相同agentId数据合并
        let newResult = []
        let idsArray = []
        for (let i = 0; i < result.length; i++) {
          const idx = idsArray.indexOf(result[i].agentId)
          if (idx === -1) {
            idsArray.push(result[i].agentId)
            newResult.push(result[i])
          } else {
            newResult[idx].privateDomainList = newResult[idx].privateDomainList.concat(result[i].privateDomainList)
            total = total - 1
          }
        }
        setPromoteList(newResult[0])
      } else {
        Toast.show(item.msg)
      }
    })
  }, [])
  return <div className={`${style.container}`}>
    <div className={style.header}>
      {t('CUST.translate184')}
      <img src={require('../../../assets/image/info/back.png')} className={style.backBtn} onClick={() => history(-1)} />
    </div>
    <div className={style.main}>
      <div className={`${style.content} ${style.topItem}`}>
        <div className={style.listItem}>
          <div className={style.left}>{t('CUST.dlID')}</div>
          <div className={style.right}>{promoteLit.agentId}</div>
        </div>
        <div className={style.listItem}>
          <div className={style.left}>{t('CUST.translate209')}</div>
          <div className={style.right}>{promoteLit.agentAccount}</div>
        </div>
        <div className={style.listItem}>
          <div className={style.left}>{t('CUST.translate320')}</div>
          <div className={style.right}>{getAgentLevel(promoteLit.agentLevel)}</div>
        </div>
        <div className={style.listItem}>
          <div className={style.left}>{t('CUST.translate203')}</div>
          <div className={style.right}>{promoteLit.parentAccount || t('CUST.translate309')}</div>
        </div>
      </div>
      <div className={style.content}>
        {
          promoteLit?.otherDomain?.split('|').length ? <div className={style.title}>{t('CUST.translate321')}</div> : null
        }
        {
          loading ? [...Array(2)].map((_item,index) => {
              return <Skeleton animated key={index} style={{'--height': '42px', marginTop: '8px'}}/>
            }) : null
          
        }
        {
          promoteLit?.otherDomain?.split('|').map((item, index) => {
            return <div key={index}>
              <div className={style.subTitle}>{firstToUpper(item.split(':')[0])}:</div>
              <div className={`${style.linkList} ${style.listItem}`}>
                <div className={style.left}>{item.replace('website:', '').replace('download:', '')}</div>
                <div className={style.right} onClick={() => handleCopy(item.replace('website:', '').replace('download:', ''))}><img src={require('../../../assets/image/common/fz.png')}/></div>
              </div>
              <div className={style.divider}></div>
            </div>
          })
        }
      </div>
      <div className={style.content}>
        {
          promoteLit?.otherCname?.split('|').length ? <div className={style.title}>{t('CUST.translate314')}</div> : null
        }
        {
          loading ? [...Array(2)].map((_item,index) => {
              return <Skeleton animated key={index} style={{'--height': '42px', marginTop: '8px'}}/>
            }) : null
          
        }
        {
          promoteLit?.otherCname?.split('|').map((item, index) => {
            return <div key={index}>
              <div className={style.subTitle}>{firstToUpper(item.split(':')[0])}:</div>
              <div className={`${style.linkList} ${style.listItem}`}>
                <div className={style.left}>{item.replace('website:', '').replace('download:', '')}</div>
                <div className={style.right} onClick={() => handleCopy(item.replace('website:', '').replace('download:', ''))}><img src={require('../../../assets/image/common/fz.png')}/></div>
              </div>
              <div className={style.divider}></div>
            </div>
          })
        }
      </div>
      <div className={style.content}>
        {
          promoteLit?.privateDomainList?.length ? <div className={style.title}>{t('CUST.translate316')}</div> : null
        }
        {
          loading ? [...Array(5)].map((_item,index) => {
              return <Skeleton animated key={index} style={{'--height': '42px', marginTop: '8px'}}/>
            }) : null
          
        }
        {
          promoteLit?.privateDomainList?.map((item, index) => {
            return <div key={index}>
              <div className={`${style.linkList} ${style.listItem}`}>
                <div className={style.left}>{item}</div>
                <div className={style.right} onClick={() => handleCopy(item)}><img src={require('../../../assets/image/common/fz.png')}/></div>
              </div>
              <div className={style.divider}></div>
            </div>
          })
        }
      </div>
    </div>
    <div className={style.bottom}>
      <Button
        className={style.submitBtn}
        onClick={() => handleBindCname()}
      >
        {t("CUST.translate311")}
      </Button>
    </div>
  </div >
}
export default Promote
