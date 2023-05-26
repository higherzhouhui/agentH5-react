import React, { useEffect, useState } from 'react'
import { ConfigProvider, Toast } from 'antd-mobile'
import i18n from "i18next";
import RouterGuard from './react-router-guard'
import routes, { onRouteBefore } from "./routes";
import './util/rem.js'
import './assets/style/index.css'
import './assets/style/index.scss'
import './language/config'
import './util/finger'
import ContextReducer from './state/useContextReducer'
// import jp from 'antd-mobile/es/locales/ja-JP'
import en from 'antd-mobile/es/locales/en-US'
import zh from 'antd-mobile/es/locales/zh-CN'
import fr from 'antd-mobile/es/locales/fr-FR'
import { useLocation } from 'react-router-dom';
const App = () => {
  const query = useLocation()
  const lang = i18n.language
  const [localeLang, setLocaleLang] = useState(zh)
  const localeLangObj = {
    // jp: jp,
    en: en,
    zhtw: en,
    zh: zh,
    fr: fr,
  }
  const getQuery = () => {
    return query.search.replace('?', '').replace('@', '&').split('&').reduce((arr, item) => {
      arr[item.split('=')[0]] = item.split('=')[1]
      return arr
    }, {})
  }
  const { puid, device } = getQuery()
  if (puid) {
    sessionStorage.setItem('puid', puid)
  }
  if (device) {
    sessionStorage.setItem('device', device)
  }
  Toast.config({ position: 'bottom', maskClickable: true })


  useEffect(() => {
    setLocaleLang(localeLangObj[lang])
  }, [lang])

  return <ContextReducer.Provider>
    <RouterGuard
      routers={routes}
      onRouterBefore={onRouteBefore}
      loading={<div>
        <img src={require('./assets/image/loading.png')} alt="" className='loadingPng' />
      </div>}
    />
</ContextReducer.Provider>
{/* <ConfigProvider locale={localeLang}>
    
  </ConfigProvider> */}
}

export default App
