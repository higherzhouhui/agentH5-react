import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from "react-i18next"
import { Form, Button, Toast } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import style from './index.module.scss'
import Input from "../../../components/input";
import useContextReducer from '../../../state/useContextReducer'
import { updateOverviewInfo } from '../../../api/user'
const FaceBook = () => {
  const { t } = useTranslation()
  const history = useNavigate()
  const form = useRef()
  const {
    state: { user }, dispatch
  } = useContextReducer.useContextReducer()
  const [loading, setLoading] = useState(false)
  const onFinish = (data) => {
    setLoading(true)
    updateOverviewInfo(data).then(res => {
      setLoading(false)
      if (res.code === 200) {
        Toast.show(t('CUST.translate106'))
        dispatch({
          type: 'UPDATE_USERINFO',
          payload: {...user, qq: data.qq}
        });
        history(-1)
      } else {
        Toast.show(res.msg)
      }
    })
  }
  const checkFaceBook = (_, value) => {
		if (value) {
			return Promise.resolve();
		}
		return Promise.reject(new Error(t("CUST.translate71")));
	};
  useEffect(() => {
    // 切换选项重置表单
		if (form && form.current) {
			form.current.resetFields();
		}
  }, [])
  return <div className={`${style.container} ${loading && 'loading'}`}>
    <div className={style.header}>
      {t('CUST.translate70')}
      <img src={require('../../../assets/image/info/back.png')} className={style.backBtn} onClick={() => history(-1)} />
    </div>
    <div className={style.main}>
      <Form
        layout="vertical"
        ref={form}
        onFinish={onFinish}
        className={style.form}
        initialValues={{
          qq: user?.qq
        }}
      >
          <Form.Item
            label={t("")}
            name="qq"
            rules={[{ validator: checkFaceBook }]}
          >
            <Input
              className={style.inputStyle}
              placeholder={t("CUST.translate71")}
            />
          </Form.Item>
          <Button
						className={style.submitBtn}
						type="submit"
						loading="auto"
					>
						{t("CUST.translate72")}
					</Button>
      </Form>
    </div>
  </div >
}
export default FaceBook
