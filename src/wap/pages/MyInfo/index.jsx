import React, { useEffect, useState } from 'react'
import { useTranslation } from "react-i18next"
import { ActionSheet, Modal } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { TabBar } from '../../components'
import style from './index.module.scss'
import { agentTypeDic, shiftToReadNumber } from '../../util/tool'
import useContextReducer from '../../state/useContextReducer'
import { Local } from '../../../common'
import i18n from '../../language/config'

const Home = () => {
  const { t } = useTranslation()
  const history = useNavigate()
  const { state: { user }, dispatch } = useContextReducer.useContextReducer()
  const getAgentType = (type) => {
    return agentTypeDic[type || 0]
  }
  const [visible, setVisible] = useState(false)
  const actions = [
    { text: "Tiếng Việt", key: "vi" },
    { text: "简体中文", key: "zh" },
  ]
  // 选择语言事件
  const handleSelectLang = (e) => {
    let lang = `${e.key}`
    Local('lang', lang)
    i18n.changeLanguage(lang)
    setVisible(false)
  }
  const handleRouter = async(type) => {
    if (type === '/baseInfo/moneyPwd') {
      if (user?.email) {
        history(type)
      } else {
        const result = await Modal.confirm({
          content: t('CUST.translate176'),
          cancelText: t('CUST.translate97'),
          confirmText: t('CUST.translate98')
        })
        if (result) {
          history('/baseInfo/emailChange')
        }
      }
    } else {
      history(type)
    }
  }

  const handleWithdraw = async() => {
    if (user?.haveMoneyPwd) {
      history('/baseInfo/withdraw')
    } else {
      if (user?.email) {
        const result = await Modal.confirm({
          content: t('CUST.translate410'),
          cancelText: t('CUST.translate97'),
          confirmText: t('CUST.translate98')
        })
        if (result) {
          history('/baseInfo/moneyPwd')
        }
      } else {
        const result = await Modal.confirm({
          content: t('CUST.translate176'),
          cancelText: t('CUST.translate97'),
          confirmText: t('CUST.translate98')
        })
        if (result) {
          history('/baseInfo/emailChange')
        }
      }
    }
  }
  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT',
      payload: {}
    });
    location.href = '/login'
  }

  return <div className={style.container}>
    <div className={style.header}>
      {t('CUST.translate60')}
    </div>
    <div className={style.main}>
      <div className={style.baseWrapper}>
        <div className={style.info}>
          <div className={style.left}>
            <div className={style.avatar}>{user?.agentAccount?.slice(0,2).toLocaleUpperCase()}</div>
            <div className={style.nameWrapper}>
              <div className={style.name}>{user?.agentAccount}</div>
              <div className={style.time}>{user?.createTime}</div>
            </div>
          </div>
          <div className={style.agentType}>{getAgentType(user?.agentType)}</div>
        </div>
        <div className={style.moneyWrapper}>
          <div className={style.accountDes}>{t('CUST.translate66')}</div>
          <div className={style.getMoney}>
            <div className={style.yue}>{shiftToReadNumber(user?.availableBalance)}</div>
            <div className={style.operation} onClick={() => handleWithdraw()}>{t('CUST.translate149')}</div>
          </div>
        </div>
      </div>
      <div className={style.tuiguangWrapper}>
        <div className={style.listItem} onClick={() => handleRouter('/baseInfo/promote')}>
          <img className={style.logo} src={require('../../assets/image/info/tuig.png')} />
          {t('CUST.translate184')}
        </div>
      </div>
      <div className={style.tuiguangWrapper}>
        <div className={style.listItem} onClick={() => handleRouter('/baseInfo/bindCard')}>
          <img className={style.logo} src={require('../../assets/image/info/kahao.png')} />
          {t('CUST.translate102')}
        </div>
        <div className={style.listItem} onClick={() => handleRouter('/baseInfo/faceBook')}>
          <img className={style.logo} src={require('../../assets/image/info/facebook.png')} />
          {t('CUST.translate70')}
        </div>
      </div>
      <div className={style.tuiguangWrapper}>
        <div className={style.listItem} onClick={() => handleRouter('/baseInfo/loginPwd')}>
          <img className={style.logo} src={require('../../assets/image/info/changelogin.png')} />
          {t('CUST.translate79')}
        </div>
        <div className={style.listItem} onClick={() => handleRouter('/baseInfo/emailChange')}>
          <img className={style.logo} src={require('../../assets/image/info/email.png')} />
          {user?.email ? t('CUST.translate80') : t('CUST.translate81')}
        </div>
        <div className={style.listItem} onClick={() => handleRouter('/baseInfo/moneyPwd')}>
          <img className={style.logo} src={require('../../assets/image/info/money.png')} />
          {t('CUST.translate413')}
        </div>
      </div>
      <div className={style.tuiguangWrapper}>
        <div className={style.listItem} onClick={() => setVisible(true)}>
          <img className={style.logo} src={require('../../assets/image/info/lang.png')} />
          {t('CUST.chooseLanguage')}
        </div>
      </div>
      <div className={style.logout} onClick={() => handleLogout()}>{t('CUST.translate150')}</div>
    </div>
    <ActionSheet
        extra={t('CUST.chooseLanguage')}
        cancelText={t('CUST.translate97')}
        visible={visible}
        actions={actions}
        onClose={() => setVisible(false)}
        onAction={handleSelectLang}
    />
    <TabBar active="/baseInfo" />
  </div >
}
export default Home
