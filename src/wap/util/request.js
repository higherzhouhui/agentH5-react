'use strict'
import { Local } from '../../common'
import { Toast } from 'antd-mobile';
import axios from 'axios'
import i18n from '../language/config';
const translateTitle = (type) => {
    const {t} = i18n
    return t(type)
}
class HttpRequest {
  // #baseUrl
  constructor() {
    this.baseUrl = '';
    // this.baseUrl = this.getBaseUrl();
    this.withCredentials = false
    this.timeout = 60 * 60 * 24 * 1000
  }

  getBaseUrl() {
    const { envStr } = getEnvs()
    const baseUrlStr = envStr === 'dev' ? 'http://34.150.29.102:8086/' : 'http://34.150.29.102:8086/'
    return baseUrlStr
  }
  //由于cooke的存在，兼容
  getAcceptLanguage() {
    let acceptLang = Local('lang') || 'vi-VN'
    if (acceptLang) {
      if (acceptLang === 'zh_CN' || acceptLang === 'zh') {
        acceptLang = 'zh-CN'
      }
      if (acceptLang === 'vi_VN' || acceptLang === 'vi') {
        acceptLang = 'vi-VN'
      }
    } else {
      acceptLang = 'vi-VN'
    }
    return acceptLang
  }

  getConfig() {
    const token = Local('token')
    const config = {
      baseURL: this.baseUrl,
      timeout: this.timeout,
      withCredentials: this.withCredentials,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: token,
        'Accept-Language': this.getAcceptLanguage()
      },
      body: {}
    }
    return config
  }

  getParams(payload) {
    const { method, data } = payload
    if (['post', 'patch', 'put'].indexOf(method) >= 0) {
      payload.data = data
    } else {
      payload.params = data
      delete payload.data
    }
    return payload
  }

  checkStatus(status) {
    let errMessage = ''
    switch (status) {
      case 400:
        errMessage = ''
        break
      case 401:
        errMessage = translateTitle('CUST.translate340')
        break
      case 403:
        errMessage = translateTitle('CUST.translate341')
        break
      case 404:
        errMessage = translateTitle('CUST.translate342')
        break
      case 405:
        errMessage = translateTitle('CUST.translate343')
        break
      case 408:
        errMessage = translateTitle('CUST.translate344')
        break
      case 500:
        errMessage = translateTitle('CUST.translate345')
        break
      case 501:
        errMessage = translateTitle('CUST.translate346')
        break
      case 502:
        errMessage = translateTitle('CUST.translate347')
        break
      case 503:
        errMessage = translateTitle('CUST.translate348')
        break
      case 504:
        errMessage = translateTitle('CUST.translate349')
        break
      case 505:
        errMessage = translateTitle('CUST.translate350')
        break
      default:
        errMessage = ''
    }
    return errMessage
  }

  // 拦截处理
  setInterceptors(instance) {
    const that = this
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        if (!navigator.onLine) {
          return Promise.reject(new Error('请检查您的网络是否正常'))
        }
        // config.data = qs.stringify(config.data)

        return config
      },
      error => {
        return Promise.reject(new Error(error))
      }
    )

    // 响应拦截
    instance.interceptors.response.use(
      res => {
        const result = res.data || res;
        if (result && result.code) {
          const msg = that.checkStatus(result.code);
          if (msg) {
            Toast.show(msg)
            location.href = '/login'
            Local('token', '')
          }
        }
        const type = Object.prototype.toString.call(result)
        // 如果是文件流 直接返回
        if (type === '[object Blob]' || type === '[object ArrayBuffer]' || type === '[object Object]') {
          return result;
        } else {
          if (!result) {
            return Promise.reject(new Error(message || 'Error'))
          } else {
            return result.data
          }
        }
      },
      error => {
        if (error && error.response) {
          error.message = that.checkStatus(error.response.status)
        }
        return Promise.reject(new Error(error.message))
      }
    )
  }

  request(options) {
    const instance = axios.create()
    const baseOpt = this.getConfig()
    const params = Object.assign({}, baseOpt, this.getParams(options))
    this.setInterceptors(instance)
    return instance(params)
  }
}



const http = new HttpRequest()
export default http

