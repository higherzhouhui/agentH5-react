import React, { useEffect } from 'react'
import { useTranslation } from "react-i18next"
import { useNavigate } from 'react-router-dom'
import style from './index.module.scss'
const OperationSuccess = () => {
  const { t } = useTranslation()
  const history = useNavigate()

  useEffect(() => {
  
  }, [])
  return <div className={`${style.container}`}>
    <div className={style.header}>
      {t('CUST.translate181')}
      <img src={require('../../../assets/image/info/back.png')} className={style.backBtn} onClick={() => history(-1)} />
    </div>
    <div className={style.main}>
      <div className={style.content}>
          <img src={require('../../../assets/image/common/success.png')} alt="success" className={style.logo} />
          <div className={style.title}>{t('CUST.translate181')}</div>
          <div className={style.desc}>{t('CUST.tikuan_confirm')}</div>
      </div>
      <div className={style.backHome} onClick={() => history('/home')}>{t('CUST.btn_backHome')}</div>
    </div>
  </div >
}
export default OperationSuccess
