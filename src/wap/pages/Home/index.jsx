import React, { useEffect, useState } from 'react'
import { useTranslation } from "react-i18next"
import { Modal, Tabs, Empty, Skeleton, Swiper } from 'antd-mobile'
import { TabBar } from '../../components'
import style from './index.module.scss'
import './index.css'
import { shiftToReadNumber } from '../../util/tool'
import { useNavigate } from 'react-router-dom'
import {
  generalInfo,
  getNewAgentList,
  getNewDepositMemberList,
  getNewMemberList,
  getGroupOverviewInfo,
} from '../../api/home'
const Home = () => {
  const history = useNavigate()
  const { t } = useTranslation()
  const [popVisible, setPopVisible] = useState(false)
  const [generInfo, setGenerInfo] = useState({})
  const [teamInfo, setTeamInfo] = useState({})
  const [newUserList, setNewUserList] = useState([])
  const [newAgentList, setNewAgentList] = useState([])
  const [joinUserList, setJoinUserList] = useState([])
  const [loading, setLoading] = useState(false)
  const shiftObjToReadNumber = (obj) => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        obj[key] = shiftToReadNumber(obj[key])
      })
    }
  }
  
  const getListData = async() => {
    setLoading(true)
    const depositMember = await getNewDepositMemberList()
    setLoading(false)
    setNewUserList(depositMember.rows || [])
    const agent = await getNewAgentList()
    setNewAgentList(agent.rows || [])
    const newMember = await getNewMemberList()
    setJoinUserList(newMember.rows || [])
  }
  const handleShowHint = () => {
    setPopVisible(true)
  }
  useEffect(() => {
    generalInfo().then(res => {
      if (res.code === 200) {
        shiftObjToReadNumber(res.data)
        setGenerInfo(res.data)
      }
    })
    getGroupOverviewInfo().then(res => {
      if (res.code === 200) {
        setTeamInfo(res.data)
      }
    })
    getListData()
  }, [])
  return <div className={`${style.homeRoot} homeRoot`}>
     <div className={style.title}>
      <div className={style.content} onClick={() => history('/home')}>
        <img src={require('../../assets/image/common/logo.png')} alt='logo' height={28} width={100}/>
      </div>
     </div>
     <div className={style.main}>
        <div className={style.tongji}>
          <div className={style.time}>
              <span className={style.desc}>{t('CUST.translate12')}:</span>
              <span className={style.remain}>{generInfo?.lastDay}</span>
              <div className={style.hint} onClick={() => handleShowHint()}>
                <img src={require('../../assets/image/common/hint.png')} alt='logo' height={12} width={12}/>
              </div>
          </div>
          <Swiper autoplay style={{paddingBottom: '5px'}} loop>
            <Swiper.Item>
              <div className={style.yongjin}>
                <div className={style.item}>
                  <div className={style.number}>{generInfo?.predictTotalAmt}</div>
                  <div className={style.desc}>
                    <img src={require('../../assets/image/sy/money.png')} />
                    {t('CUST.translate52')}
                  </div>
                </div>
                <div className={style.item}>
                  <div className={style.number}>{generInfo?.unTotalAmt}</div>
                  <div className={style.desc}>
                    <img src={require('../../assets/image/sy/qbicon.png')} />
                    {t('CUST.translate14')}
                  </div>
                </div>
              </div>
              <div className={style.zhishuWrapper}>
                <div className={style.item}>
                  <div className={style.top}>{generInfo?.directlyMemberAmt}</div>
                  <div className={style.bot}>
                    <img src={require('../../assets/image/sy/zsyj.png')} />
                      {t('CUST.translate53')}
                  </div>
                </div>
                <div className={style.item}>
                  <div className={style.top}>{generInfo?.directlyAgentAmt}</div>
                  <div className={style.bot}>
                    <img src={require('../../assets/image/sy/dlcc.png')} />
                      {t('CUST.translate54')}
                  </div>
                </div>
                <div className={style.item}>
                  <div className={style.top}>{generInfo?.currentPredictRatio}%</div>
                  <div className={style.bot}>
                    <img src={require('../../assets/image/sy/yjbl.png')} />
                      {t('CUST.translate55')}
                  </div>
                </div>
              </div>
            </Swiper.Item>
            <Swiper.Item>
              <div className={`${style.yongjin} ${style.lastyongjin}`}>
                <div className={style.item}>
                  <div className={style.number}>{generInfo?.lastTotalAmt}</div>
                  <div className={style.desc}>
                    <img src={require('../../assets/image/sy/money.png')} />
                    {t('CUST.translate57')}
                  </div>
                </div>
              </div>
              <div className={style.zhishuWrapper}>
                <div className={style.item}>
                  <div className={style.top}>{generInfo?.lastMemberAmt}</div>
                  <div className={style.bot}>
                    <img src={require('../../assets/image/sy/zsyj.png')} />
                      {t('CUST.translate53')}
                  </div>
                </div>
                <div className={style.item}>
                  <div className={style.top}>{generInfo?.lastAgentAmt}</div>
                  <div className={style.bot}>
                    <img src={require('../../assets/image/sy/dlcc.png')} />
                      {t('CUST.translate54')}
                  </div>
                </div>
                <div className={style.item}>
                  <div className={style.top}>{generInfo?.lastRatio}%</div>
                  <div className={style.bot}>
                    <img src={require('../../assets/image/sy/yjbl.png')} />
                      {t('CUST.translate55')}
                  </div>
                </div>
              </div>
            </Swiper.Item>
          </Swiper>

        </div>
        <div className={style.teamWrapper}>
          <div className={style.teamTitle}>
            <img src={require('../../assets/image/form/plat_icon.png')} />
            {t('CUST.translate27')}
          </div>
          <div className={style.teamContent}>
          <div className={style.zhishuWrapper}>
            <div className={style.item}>
              <div className={style.top}>{teamInfo?.directAgentNum}</div>
              <div className={style.bot}>
                  {t('CUST.translate45')}
              </div>
            </div>
            <div className={style.item}>
              <div className={style.top}>{teamInfo?.directUserNum}</div>
              <div className={style.bot}>
                  {t('CUST.translate46')}
              </div>
            </div>
            <div className={style.item}>
              <div className={style.top}>{teamInfo?.totalBetPerson}</div>
              <div className={style.bot}>
                  {t('CUST.translate47')}
              </div>
            </div>
          </div>
          <div className={style.zhishuWrapper}>
            <div className={style.item}>
              <div className={style.top}>{teamInfo?.totalValidPerson}</div>
              <div className={style.bot}>
                  {t('CUST.translate49')}
              </div>
            </div>
            <div className={style.item}>
              <div className={style.top}>{teamInfo?.newAgent}</div>
              <div className={style.bot}>
                  {t('CUST.translate50')}
              </div>
            </div>
            <div className={style.item}>
              <div className={style.top}>{teamInfo?.newMember}</div>
              <div className={style.bot}>
                  {t('CUST.translate51')}
              </div>
            </div>
          </div>
          </div>
        </div>
        <div className={`${style.tabWrapper} tabWrapper`}>
        <Tabs defaultActiveKey='1'>
          <Tabs.Tab title={t('CUST.translate21')} key='1'>
            {
              newUserList.map((item, index) => {
                return <div className='personItem' key={index}>
                <div className='avatar'>
                  <img src={item.userIcon || 'https://ossimg.fbs55.com/headicon/m10.png'} alt='avatar'/>
                </div>
                <div className='rightWrapper'>
                  <div className='title'>{item.memberAccount}</div>
                  <div className='idTime'>
                    <div className='id'>ID:{item.uid}</div>
                    <div className='time'>{item.date}</div>
                  </div>
                </div>
              </div>
              })
            }
            {
              loading ? [...Array(5)].map((_item,index) => {
                  return <Skeleton animated key={index} style={{'--height': '56px', marginTop: '8px'}}/>
                }) : newUserList.length ? null : <Empty description={t('CUST.translate327')} />
              
            }
          </Tabs.Tab>
          <Tabs.Tab title={t('CUST.translate23')} key='2'>
            {
              newAgentList.map((item, index) => {
                return <div className='personItem' key={index}>
                <div className={`avatar head${(index % 4)}`}>{item.agentAccount?.slice(0,2).toLocaleUpperCase()}</div>
                <div className='rightWrapper'>
                  <div className='title'>{item.agentAccount}</div>
                  <div className='idTime'>
                    <div className='id'>ID:{item.agentId}</div>
                    <div className='time'>{item.createTime}</div>
                  </div>
                </div>
              </div>
              })
            }
            {
              newAgentList.length ? null : <Empty description={t('CUST.translate327')} />
            }
          </Tabs.Tab>
          <Tabs.Tab title={t('CUST.translate24')} key='3'>
            {
              joinUserList.map((item, index) => {
                return <div className='personItem' key={index}>
                <div className='avatar'>
                  <img src={item.userIcon || 'https://ossimg.fbs55.com/headicon/m10.png'} alt='avatar'/>
                </div>
                <div className='rightWrapper'>
                  <div className='title'>{item.memberAccount}</div>
                  <div className='idTime'>
                    <div className='id'>ID:{item.uid}</div>
                    <div className='time'>{item.date}</div>
                  </div>
                </div>
              </div>
              })
            }
            {
              joinUserList.length ? null : <Empty description={t('CUST.translate327')} />
            }
          </Tabs.Tab>
        </Tabs>
        </div>
     </div>
     <Modal
      visible={popVisible}
      onClose={() => setPopVisible(false)}
      closeOnAction
      bodyStyle={{borderRadius: '8px'}} 
      closeOnMaskClick={true}
      actions={[
        {
          key: 'confirm',
          text: t('CUST.translate98'),
        },
      ]}
      content= <div className='hintWrapper'>
          <div className='hintWord'>{t('CUST.translate15')}</div>
          <div className='desc'>{t('CUST.translate56')}</div>
          <div className='desc'>{t('CUST.translate16')}；</div>
          <div className='method'>{t('CUST.translate17')}；</div>
          <div className='method'>{t('CUST.translate18')}；</div>
          <div className='method'>{t('CUST.translate19')}；</div>
          <div className='method'>{t('CUST.translate20')}；</div>
        </div>
      />
    <TabBar active="/home" />
  </div >
}
export default Home
