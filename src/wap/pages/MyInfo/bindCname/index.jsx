import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from "react-i18next"
import { Form, Button, Toast, ActionSheet } from 'antd-mobile'
import { useNavigate, useLocation } from 'react-router-dom'
import style from './index.module.scss'
import Input from "../../../components/input";
import useContextReducer from '../../../state/useContextReducer'
import { bind, getCnameAndIds, getPrivateDomainByCname } from '../../../api/extension'
const FaceBook = () => {
  const { t } = useTranslation()
  const history = useNavigate()
  const form = useRef()
  const {
    state: { user }
  } = useContextReducer.useContextReducer()
  const [loading, setLoading] = useState(false)
  const [visiable, setVisible] = useState(false);
  const { state } = useLocation()
  const [ipList, setIpList] = useState([])
  const [addressList, setAddressList] = useState([])
  const handleSelectBank = (e) => {
    form.current?.setFieldsValue({cname: e.text})
    reFreshList(e.cnameId)
		setVisible(false);
	};
  const onFinish = (data) => {
    const requestData = JSON.parse(JSON.stringify(data))
    const cname = requestData.cname
    delete requestData.cname
    let requestArray = []
    const list = ipList.filter(item => {
      return item.text === cname
    })
    let cnameId = ''
    if (list.length) {
      cnameId = list[0].cnameId
    }
    Object.keys(requestData).forEach(item => {
      if (requestData[item]) {
        const obj = {
          agentId: user.agentId,
          cnameId: cnameId,
          operator: user.agentAccount,
          privateDomain: requestData[item]
        }
        requestArray.push(obj)
      }
    })
    // 如果为空仍需要重置
    if (!requestArray.length) {
      requestArray = [
        {
          agentId: user.agentId,
          cnameId: cnameId,
          operator: user.agentAccount,
          privateDomain: ''
        }
      ]
    }
    setLoading(true)
    bind(requestArray).then(res => {
      setLoading(false)
      if (res.code === 200) {
        Toast.show(t('CUST.translate108'))
        history(-1)
      } else {
        Toast.show(res.msg)
      }
    })
  }

  const reFreshList = (id) => {
    setLoading(true)
    getPrivateDomainByCname({
      agentId: user?.agentId,
      cnameId: id
    }).then(res => {
      setLoading(false)
      if (res.code === 200) {
        const rows = res.data || []
        if (!rows.length) {
          const obj = {
            privateDomain: ''
          }
          rows.push(obj)
        }
        setAddressList(rows)
      } else {
        Toast.show(res.msg)
      }
    })
  }
  const handleRemoveItem = (cindex) => {
    const newContent = addressList.filter((_item, index) => {
      return index !== cindex
    })
    setAddressList(newContent)
  }
  const handleAddItem = () => {
    const list = ipList.filter(item => {
      return item.text === cname
    })
    let cnameId = ''
    if (list.length) {
      cnameId = list[0].cnameId
    }
    const obj = {cnameId: cnameId, privateDomain: '' }
    addressList.push(obj)
    setAddressList([...addressList])
  }

  useEffect(() => {
    setTimeout(() => {
      const obj = {}
      addressList.forEach((item,index) => {
        obj[`privateDomain${index}`] = item.privateDomain
      })
      form.current?.setFieldsValue(obj)
    }, 10);
  }, [addressList])

  useEffect(() => {
    // 切换选项重置表单
		if (form && form.current) {
			form.current.resetFields();
		}
    setLoading(true)
    getCnameAndIds(state).then(res => {
      setLoading(false)
      if (res.code === 200) {
        const rows = res.data || []
        const data = []
        rows.forEach(item => {
          const obj = {
            text: item.cname,
            key: item.cname,
            cnameId: item.cnameId
          }
          data.push(obj)
        })
        setIpList(data)
        form.current?.setFieldsValue({cname: data[0].text})
        reFreshList(data[0].cnameId)
      } else {
        Toast.show(res.msg)
      }
    })
  }, [])
  return <div className={`${style.container} ${loading && 'loading'}`}>
    <div className={style.header}>
      {t('CUST.translate311')}
      <img src={require('../../../assets/image/info/back.png')} className={style.backBtn} onClick={() => history(-1)} />
    </div>
    <div className={style.main}>
      <Form
        layout="vertical"
        ref={form}
        onFinish={onFinish}
        className={style.form}
      >
          <Form.Item
            label={t("CUST.translate314")}
            name="cname"
            className={style.selectArrow}
          >
            <Input
              className={style.inputStyle}
              hideClearable={true}
              onClick={() => {
                setVisible(true);
              }}
            />
          </Form.Item>
          {
            addressList.map((item,index) => {
              return <div key={index} className={style.formItemWrapper}>
                <Form.Item
                key={index}
                label={t("CUST.translate316")}
                name={`privateDomain${index}`}
              >
                <Input
                  className={style.inputStyle}
                  placeholder={t("CUST.translate315")}
                />
              </Form.Item>
                <div className={style.operation}>
                  <img src={require('../../../assets/image/common/oadd.png')} className={style.add} alt="add" onClick={() => handleAddItem()} />
                  {
                    addressList.length > 1 ? <img src={require('../../../assets/image/common/ojian.png')} className={style.add} alt="minus" onClick={() => handleRemoveItem(index)} /> : null
                  }
                </div>
              </div>
            })
          }
          <Button
						className={style.submitBtn}
						type="submit"
						loading="auto"
					>
						{t("CUST.translate311")}
					</Button>
      </Form>
    </div>
    <ActionSheet
				extra={t("CUST.xuanzefafangriqi")}
				cancelText={t("CUST.translate97")}
				visible={visiable}
				actions={ipList}
				onClose={() => setVisible(false)}
				style={{ maxHeight: "50vh", overflow: "auto" }}
				onAction={handleSelectBank}
			/>
  </div >
}
export default FaceBook
