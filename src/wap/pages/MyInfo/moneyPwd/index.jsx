import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from "react-i18next"
import { Form, Button, Toast, DotLoading } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import style from './index.module.scss'
import Input from "../../../components/input";
import useContextReducer from '../../../state/useContextReducer'
import { sendEmailCode, updatePayPwd } from '../../../api/user'
const MoneyPwd = () => {
  const { t } = useTranslation()
  const history = useNavigate()
  const [emailloading, setemailLoading] = useState(false);
	const [count, setCount] = useState(false);
	const countTime = useRef();
	const timer = useRef(null);
  const form = useRef()
  const {
    state: { user }, dispatch
  } = useContextReducer.useContextReducer()
  const [loading, setLoading] = useState(false)
  const onFinish = (data) => {
    setLoading(true)
    updatePayPwd({
      payPwd: data.payPwd,
      verifyCode: data.verifyCode
    }).then(res => {
      setLoading(false)
      if (res.code === 200) {
        dispatch({
          type: 'UPDATE_USERINFO',
          payload: {...user, haveMoneyPwd: true}
        });
        history(-1)
        Toast.show(t('CUST.translate106'))
      } else {
        Toast.show(res.msg)
      }
    })
  }
  const sendEmail = async () => {
		setemailLoading(true);
		sendEmailCode({ email: user.email}).then((res) => {
			setemailLoading(false);
			if (res.code === 200) {
				Toast.show(t("CUST.translate104"));
        countTimeDown()
			} else {
				Toast.show(res.msg);
			}
		});
	};
  const countTimeDown = () => {
    countTime.current = 60
    setCount(countTime.current)
    timer.current = setInterval(() => {
        countTime.current = countTime.current - 1
        setCount(countTime.current)
        if (countTime.current === 0) {
            clearInterval(timer.current)
        }
    }, 1000);
  };
  const checkEmail = (_, value) => {
		if (value) {
			return Promise.resolve();
		}
		return Promise.reject(new Error(t("CUST.translate91")));
	};
  const checkNewVerifyCode = (_, value) => {
		if (value) {
			return Promise.resolve();
		}
		return Promise.reject(new Error(t("CUST.translate7")));
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
      if (form.current.getFieldValue('payPwd') === value) {
        return Promise.resolve();
      } else {
		    return Promise.reject(new Error(t("CUST.translate89")));
      }
		}
		return Promise.reject(new Error(t("CUST.translate88")));
	};
  const hidePhoneEmail = (e) => {
    if (e) {
        if (e.includes('@')) {
            const arr = e.split('@')
            return arr[0].substring(0, 3) + ' **** ' + '@' + arr[1]
        } else {
            return e.substring(0, 3) + ' **** ' + e.substring(e.length - 4, e.length)
        }
    }
    return ''
  }
  useEffect(() => {
    // 切换选项重置表单
		if (form && form.current) {
			form.current.resetFields();
		}
  }, [])
  return <div className={`${style.container} ${loading && 'loading'}`}>
    <div className={style.header}>
      {user.haveMoneyPwd ? t('CUST.translate413') : t('CUST.translate414')}
      <img src={require('../../../assets/image/info/back.png')} className={style.backBtn} onClick={() => history(-1)} />
    </div>
    <div className={style.main}>
      <Form
        layout="vertical"
        ref={form}
        onFinish={onFinish}
        className={style.form}
        initialValues={{
          email: hidePhoneEmail(user.email)
        }}
      >
          <Form.Item
            label={t("CUST.translate68")}
            name="email"
            rules={[{ validator: checkEmail }]}
          >
            <Input
              className={style.inputStyle}
              maxLength={50}
              placeholder={t("CUST.translate91")}
            />
          </Form.Item>
          <Form.Item
            label={t("CUST.translate6")}
            name="verifyCode"
            rules={[{ validator: checkNewVerifyCode }]}
            className={style.formItemWrapper}
            extra={
              <div className={style.emailCode} onClick={sendEmail}>
							{emailloading ? (
								<DotLoading />
							) : (
								<span
									style={{
										color: user.email ? "#FC708B" : "#999",
									}}
								>
									{count ? count : t('CUST.translate110')}
								</span>
							)}
						</div>
            }
          >
            <Input
              className={style.inputStyle}
              placeholder={t("CUST.translate7")}
              maxLength={8}
            />
          </Form.Item>
          <Form.Item
            label={t("CUST.translate85")}
            name="payPwd"
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
export default MoneyPwd
