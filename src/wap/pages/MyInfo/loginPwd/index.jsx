import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from "react-i18next"
import { Form, Button, Toast } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import style from './index.module.scss'
import Input from "../../../components/input";
import useContextReducer from '../../../state/useContextReducer'
import { changePwd } from '../../../api/user'
const LoginPwd = () => {
  const { t } = useTranslation()
  const history = useNavigate()
  const form = useRef()
  const {
    state: { user }, dispatch
  } = useContextReducer.useContextReducer()
  const [loading, setLoading] = useState(false)
  const onFinish = (data) => {
    setLoading(true)
    changePwd(data).then(res => {
      setLoading(false)
      if (res.code === 200) {
        Toast.show(t('CUST.translate106'))
        history(-1)
      } else {
        Toast.show(res.msg)
      }
    })
  }
  const checkOriginPwd = (_, value) => {
		if (value) {
			return Promise.resolve();
		}
		return Promise.reject(new Error(t("CUST.translate83")));
	};
  const checkNewPwd = (_, value) => {
		if (value) {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
      const re = new RegExp(reg)
      if (!re.test(value)) {
		  return Promise.reject(new Error(t("CUST.translate84")));
      }
			return Promise.resolve();
		}
		return Promise.reject(new Error(t("CUST.translate83")));
	};
  const checkReNewPwd = (_, value) => {
		if (value) {
      if (form.current.getFieldValue('newPassword') === value) {
        return Promise.resolve();
      } else {
		    return Promise.reject(new Error(t("CUST.translate89")));
      }
		}
		return Promise.reject(new Error(t("CUST.translate88")));
	};
  useEffect(() => {
    // 切换选项重置表单
		if (form && form.current) {
			form.current.resetFields();
		}
  }, [])
  return <div className={`${style.container} ${loading && 'loading'}`}>
    <div className={style.header}>
      {t('CUST.translate79')}
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
            label={t("CUST.translate82")}
            name="loginPwd"
            rules={[{ validator: checkOriginPwd }]}
          >
            <Input
              type="password"
              className={style.inputStyle}
              placeholder={t("CUST.translate83")}
            />
          </Form.Item>
          <Form.Item
            label={t("CUST.translate85")}
            name="newPassword"
            rules={[{ validator: checkNewPwd }]}
          >
            <Input
              type="password"
              className={style.inputStyle}
              placeholder={t("CUST.translate84")}
            />
          </Form.Item>
          <Form.Item
            label={t("CUST.translate85")}
            name="rePassword"
            rules={[{ validator: checkReNewPwd }]}
          >
            <Input
              type="password"
              className={style.inputStyle}
              placeholder={t("CUST.translate88")}
            />
          </Form.Item>
          <Button
						className={style.submitBtn}
						type="submit"
						loading="auto"
					>
						{t("CUST.translate98")}
					</Button>
      </Form>
    </div>
  </div >
}
export default LoginPwd
