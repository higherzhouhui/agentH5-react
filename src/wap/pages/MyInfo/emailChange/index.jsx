import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from "react-i18next"
import { Form, Button, Toast, DotLoading } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import style from './index.module.scss'
import Input from "../../../components/input";
import useContextReducer from '../../../state/useContextReducer'
import { sendEmailCode, updateAgentEmail } from '../../../api/user'
const EmailChange = () => {
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
    updateAgentEmail({
      ...data,
      email: currentStep === 'first' ? user.email : data.email,
    }).then(res => {
      setLoading(false)
      if (res.code === 200) {
        if (currentStep === 'first') {
          setCurrentStep('second')
          clearInterval(timer.current)
          setCount(0)
          // 切换选项重置表单
          if (form && form.current) {
            form.current.resetFields();
          }
        } else {
          history(-1)
          dispatch({
            type: 'UPDATE_USERINFO',
            payload: {...user, email: data.email}
          });
          Toast.show(t('CUST.translate106'))
        }
      } else {
        Toast.show(res.msg)
      }
    })
  }
  const [currentStep, setCurrentStep] = useState(user.email ? 'first' : 'second')
  const sendEmail = async () => {
    const email = currentStep === 'first' ? user.email : form.current.getFieldValue('email')
		setemailLoading(true);
		sendEmailCode({ email: email}).then((res) => {
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
      {user.email ? t('CUST.translate80') : t('CUST.translate81')}
      <img src={require('../../../assets/image/info/back.png')} className={style.backBtn} onClick={() => history(-1)} />
    </div>
    <div className={style.main}>
      <Form
        layout="vertical"
        ref={form}
        onFinish={onFinish}
        className={style.form}
        initialValues={{
          showEmail: hidePhoneEmail(user.email)
        }}
      >
          {
            currentStep === 'first' ? <Form.Item
            label={t("CUST.translate68")}
            name="showEmail"
            rules={[{ validator: checkEmail }]}
          >
            <Input
              className={style.inputStyle}
              maxLength={50}
              placeholder={t("CUST.translate91")}
            />
          </Form.Item> : <Form.Item
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
          }
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
										color: "#FC708B",
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
          <Button
						className={style.submitBtn}
						type="submit"
						loading="auto"
					>
						{currentStep === 'first' ? t('CUST.translate99') : t("CUST.translate72")}
					</Button>
      </Form>
    </div>
  </div >
}
export default EmailChange
