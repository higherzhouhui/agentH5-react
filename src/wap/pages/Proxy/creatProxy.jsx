// 新增代理
import React, { useEffect, useState } from 'react'
import style from './common.module.scss'
import Header from '../Form/components/header'
import { useTranslation } from "react-i18next"
import { Toast, Input } from 'antd-mobile'
import { Local } from '../../../common'
import { getSysSupportPlan, addChildAgent } from '../../api/poxy'
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons'
import { useNavigate } from "react-router-dom"

const CreatProxy = () => {
    const { t } = useTranslation()
    const history = useNavigate()

    const { agentType, agentAccount } = Local('userInfo')
    const agentTypeList = ['', t('CUST.translate198'), t('CUST.translate199'), t('CUST.translate200'), t('CUST.translate201')]
    let [supportPlanList, setSupportPlanList] = useState([])
    let [loginPwd, setLoginPwd] = useState('')
    let [reloginPwd, setReloginPwd] = useState('')
    let [agentAccount2, setAgentAccount] = useState('')
    let [visible, setVisible] = useState(false)
    let [visible2, setVisible2] = useState(false)
    const getPlanList = async () => {
        let res = await getSysSupportPlan()
        if (res.code == 200) {
            setSupportPlanList(res.data)
        }
    }
    const vitify = () => {
        let bol = true;
        let msg
        if (!agentAccount2 || !agentAccount2.trim() || agentAccount2.trim().length > 16 || agentAccount2.trim().length < 6) {
            msg = t('CUST.translate210')
            bol = false
        } else if (!loginPwd || !loginPwd.trim() || loginPwd.trim().length > 16 || loginPwd.trim().length < 6) {
            msg = t('CUST.translate88')
            bol = false
        } else if (!reloginPwd || !reloginPwd.trim()) {
            msg = t('CUST.translate88')
            bol = false
        } else if (reloginPwd != loginPwd) {
            msg = t('CUST.translate89')
            bol = false
        }
        if (msg) Toast.show(msg)
        return bol
    }
    const addProxy = async () => {
        let bol = vitify()
        if (!bol) return
        try {
            const { agentType, agentId } = Local('userInfo')
            const params = {
                agentAccount: agentAccount2,
                agentPid: agentId,
                supportPlanList,
                agentType,
                loginPwd,
                reloginPwd,
                supportRatioConfig: 1,
                commissionRatio: ''
            }

            addChildAgent(params).then(rt => {
                if (rt.code == 200) {
                    Toast.show(t('CUST.translate148'))
                    history('/agent')
                }
                else Toast.show(t(rt.msg || 'CUST.translate105'))
            })
        } catch (error) {
            Toast.show(t('CUST.translate105'))
        }


    }
    useEffect(() => {

    }, [])

    return <div className={`${style.proxyIndex} ${style.proxyIndex2}`}>
        <Header title={t('CUST.translate202')} backLink='/agent' />
        <div className={style.createForm}>
            <div className={style.createFormItem}>
                <div className={style.key}>{t('CUST.translate203')}</div>
                <div className={style.val}>{agentAccount}</div>
            </div>
            <div className={style.createFormItem}>
                <div className={style.key}>{t('CUST.translate65')}</div>
                <div className={style.val}>{agentTypeList[agentType]}</div>
            </div>
            <div className={style.createFormItem}>
                <div className={style.key}>{t('CUST.translate209')}</div>
                <div className={style.val}><Input placeholder={t('CUST.translate210')}
                    value={agentAccount2}
                    maxLength={16}
                    clearable
                    onChange={val => setAgentAccount(val)}
                    type="text" /></div>
            </div>
            <div className={style.txt}>{t('CUST.translate430')}</div>
            <div className={style.createFormItem}>
                <div className={style.key}>{t('CUST.translate211')}</div>
                <div className={style.val}><Input placeholder={t('CUST.translate84')}
                    value={loginPwd}
                    maxLength={16}
                    clearable
                    onChange={val => setLoginPwd(val)}
                    type={visible ? 'text' : 'password'} />
                    <div className={style.eye}>
                        {!visible ? (
                            <EyeInvisibleOutline onClick={() => setVisible(true)} />
                        ) : (
                            <EyeOutline onClick={() => setVisible(false)} />
                        )}
                    </div>
                </div>
            </div>
            <div className={style.createFormItem}>
                <div className={style.key}>{t('CUST.translate87')}</div>
                <div className={style.val}><Input placeholder={t('CUST.translate88')}
                    value={reloginPwd}
                    maxLength={16}
                    clearable
                    onChange={val => setReloginPwd(val)}
                    type={visible2 ? 'text' : 'password'} />
                    <div className={style.eye}>
                        {!visible2 ? (
                            <EyeInvisibleOutline onClick={() => setVisible2(true)} />
                        ) : (
                            <EyeOutline onClick={() => setVisible2(false)} />
                        )}
                    </div>
                </div>
            </div>
        </div>
        <div className={style.bthGroup}>
            <div className={style.btn} onClick={addProxy}>{t('CUST.translate98')}</div>
        </div>
    </div>
}

export default CreatProxy