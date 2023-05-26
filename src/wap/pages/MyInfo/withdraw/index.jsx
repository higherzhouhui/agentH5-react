import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from "react-i18next"
import { Form, Button, Toast } from 'antd-mobile'
import { useNavigate, useLocation } from 'react-router-dom'
import style from './index.module.scss'
import './index.css'
import Input from "../../../components/input";
import useContextReducer from '../../../state/useContextReducer'
import { getWalletList, getBankList } from '../../../api/user';
import { withdrawConfirm, getConfigDataInfo } from '../../../api/common';

const Withdraw = () => {
  const { t } = useTranslation()
  const history = useNavigate()
  const form = useRef()
  const {
    state: { user, baseConfig }, dispatch
  } = useContextReducer.useContextReducer()
  const { state } = useLocation();
  const [bankList, setBankList] = useState([])
  const [usdtList, setUsdtList] = useState([])
  const tabList = [
    {label: t('CUST.translate111'), value: 'bank', withdrawType: 1}, 
    {label: t('CUST.translate113'), value: 'usdt', withdrawType: 2}, 
  ]
  const [currentTab, setCurrentTab] = useState(tabList[0])
  const [currentNo, setCurrentNo] = useState({})
  const [currentWallet, setCurrentWallet] = useState({})
  const [loading, setLoading] = useState(false)
  const [estimateAmount, setestimateAmount] = useState(0)
  const onFinish = (data) => {
    const requestData = {
      ...data,
      withdrawType: currentTab.withdrawType,
      account: user?.agentAccount,
      typeRecordId: currentTab.value === tabList[0].value ? currentNo.id : currentWallet.id
    }
    setLoading(true)
    withdrawConfirm(requestData).then(res => {
      setLoading(false)
      if (res.code === 200) {
        history('/baseInfo/operationSuccess')
      } else {
        Toast.show(res.msg)
      }
    })
  }
  const initData = async(type) => {
    setLoading(true)
    if (!type || type === 'bank') {
      const bankList = await getBankList()
      setLoading(false)
      if (bankList.code === 200) {
        const rows = (bankList.rows || []).filter(item => {
          return item.bindStatus != 0
        })
        setBankList([...rows])
        setCurrentNo(rows[0])
      } else {
        Toast.show(res.msg)
      }
    }
    if (!type || type === 'usdt') {
      setLoading(true)
      const wallList =  await getWalletList()
      setLoading(false)
      if (wallList.code === 200) {
        const rows = (wallList.rows || []).filter(item => {
          return item.bindStatus != 0
        })
        setUsdtList([...rows])
        setCurrentWallet(rows[0])
      } else {
        Toast.show(res.msg)
      }
    }
  }
  const getCaculate = (e) => {
    let amount =  form.current?.getFieldValue('amount')
    if (currentTab.value === tabList[0].value) {
      amount = Math.round(amount * baseConfig.baseRate * 100) / 100
    } else {
      amount = Math.floor(amount * baseConfig.baseRate / baseConfig.usedtRate * 100) / 100
    }
    setestimateAmount(amount)
  }
  const checkFormMoney = (_, value) => {
		if (value) {
			return Promise.resolve();
		}
		return Promise.reject(new Error(t("CUST.translate178")));
	};
  const checkFormPwd = (_, value) => {
		if (value) {
			return Promise.resolve();
		}
		return Promise.reject(new Error(t("CUST.translate419")));
	};
  const handleBindCart = () => {
    history('/baseInfo/addNew', {state: {type: currentTab.value, path: '/baseInfo/withdraw'}})
  }
  const handleClickTab = (item) => {
    setCurrentTab(item)
    // 切换选项重置表单
		if (form && form.current) {
			form.current.resetFields();
		}
  }

  useEffect(() => {
    // 切换选项重置表单
		if (form && form.current) {
			form.current.resetFields();
		}
    tabList.forEach(item => {
      if (item.value === state?.type) {
        setCurrentTab(item)
      }
    })
    initData()
    if (baseConfig && Object.keys(baseConfig).length) {
      console.log(baseConfig)
    } else {
      getConfigDataInfo().then((res) => {
        if (res.code === 200) {
          dispatch({
            type: 'BASECONFIG',
            payload: res?.data.currencyRateVO
          });
        } else {
          Toast.show(res.msg)
        }
      });
    }
  }, [])
  return <div className={`${style.container} ${loading && 'loading'}`}>
    <div className={style.header}>
      {t('CUST.translate149')}
      <img src={require('../../../assets/image/info/back.png')} className={style.backBtn} onClick={() => history('/baseInfo')} />
    </div>
    <div className={style.main}>
      <div className={style.balanceWrapper}>
        <div className={style.balance}>{(user?.availableBalance || 0).toLocaleString()}</div>
        <div className={style.desc}>{t('CUST.translate151')}</div>
      </div>
      <div className={style.content}>
        <div className={style.title}>{t('CUST.translate153')}</div>
        <div className={style.tabList}>
          {
            tabList.map((item, index) => {
              return <div key={index} className={`${style.tab} ${currentTab.value === item.value ? style.tabActive : ''}`} onClick={() => handleClickTab(item)}>
                {item.label}
              </div>
            })
          }
        </div>
        <div className={style.divider} />
        <div className={style.title}>{currentTab.label}</div>
        {
          currentTab.value === tabList[0].value ? <div className={style.listWrapper}>
            {
              bankList.map((item, index) => {
                return <div className={`${style.list} ${currentNo.id === item.id ? style.listActive : ''}`} key={index} onClick={() => setCurrentNo(item)}>
                  <div className={style.bankName}>{item.bankName}</div>
                  <div className={style.bankNo}>{item.bankNo.replace(/(.{4})/g, "$1 ")}</div>
                </div>
              })
            }
            <div className={style.list} onClick={() => handleBindCart()}>
              <div className={style.addWrapper}>
                <img className={style.addIcon} src={require('../../../assets/image/common/add.png')} alt="add" />
                <div className={style.bankNo}>{currentTab.value === tabList[0].value ? t('CUST.tianjiayinhanka') : t('CUST.tianjiaxnhb')}</div>
              </div>
            </div>
          </div> : <div className={style.listWrapper}>
            {
              usdtList.map((item, index) => {
                return <div className={`${style.list} ${currentWallet.id === item.id ? style.listActive : ''}`} key={index} onClick={() => setCurrentWallet(item)}>
                  <div className={style.bankName}>
                    <span className={style.walletName}>{item.walletName}</span>
                    <span className={style.protocol}>{item.walletProtocol}</span>
                  </div>
                  <div className={style.bankNo}>{item.walletAddress}</div>
                </div>
              })
            }
            <div className={style.list} onClick={() => handleBindCart()}>
              <div className={style.addWrapper}>
                <img className={style.addIcon} src={require('../../../assets/image/common/add.png')} alt="add" />
                <div className={style.bankNo}>{currentTab.value === tabList[0].value ? t('CUST.tianjiayinhanka') : t('CUST.tianjiaxnhb')}</div>
              </div>
            </div>
          </div>
        }
        {
          !loading && currentTab === tabList[0].value && !bankList.length && <div className={style.empty} onClick={() => handleBindCart()}>
            {currentTab.value === tabList[0].value ? t('CUST.translate166') : t('CUST.translate168')}
            <span className={style.router}>{t('CUST.to_binding')}</span>
          </div>
        }
        {
          !loading && currentTab === tabList[0].value && !usdtList.length && <div className={style.empty} onClick={() => handleBindCart()}>
            {currentTab.value === tabList[0].value ? t('CUST.translate166') : t('CUST.translate168')}
            <span className={style.router}>{t('CUST.to_binding')}</span>
          </div>
        }
        <div className={style.divider} />
        {
          ((currentTab.value === tabList[0].value && bankList.length) || (currentTab.value === tabList[1].value && usdtList.length) ) ? <Form
          layout="vertical"
          ref={form}
          onFinish={onFinish}
          className={`${style.form} withDraw`}
        >
            <Form.Item
              label={t("AGENT.translate19")}
              name="amount"
              rules={[{ validator: checkFormMoney }]}
            >
              <Input
                className={style.inputStyle}
                type='number'
                placeholder={t("CUST.translate178")}
                onChange={(e) => getCaculate(e)}
              />
            </Form.Item>
            {
              estimateAmount ? <div className={style.caculate}>
              {currentTab.value === tabList[0].value ? t('CUST.translate159') : t('CUST.translate160')}:
                <span>{estimateAmount}</span>
              </div> : null
            }
            <Form.Item
              label={t("CUST.translate411")}
              name="payPwd"
              rules={[{ validator: checkFormPwd }]}
            >
              <Input
                type="password"
                className={style.inputStyle}
                placeholder={t("CUST.translate419")}
              />
            </Form.Item>
            <div className={style.divider2} />
            <Button
              className={style.submitBtn}
              type="submit"
              loading="auto"
            >
              {t("CUST.translate173")}
            </Button>
        </Form> : null
        }
      </div>
    </div>
  </div >
}
export default Withdraw
