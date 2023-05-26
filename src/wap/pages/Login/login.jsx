import React, { useEffect, useState } from 'react'
import Logoimg from '../../assets/image/login/login-logo.png'
import ViImg from '../../assets/image/login/vi.png'
import ZhImg from '../../assets/image/login/zh.png'
import DownImg from '../../assets/image/login/downarrow.png'
import { useTranslation } from 'react-i18next'
import style from './index.module.scss'
import { Input } from '../../components'
import { ActionSheet, Button, Grid, Toast } from 'antd-mobile'
import i18n from '../../language/config'
import { useNavigate } from 'react-router-dom'
import { Local, copyUrlToClip } from '../../../common'
import { getCaptcha, login, getInfo } from '../../api/user'
import useContextReducer from '../../state/useContextReducer'
import { RoleTypeDictory } from '../../util/tool'
const Login = () => {
    const { t } = useTranslation()
    const history = useNavigate()
    const [agentAccount, setAgentAccount] = useState()
    const [password, setPassword] = useState()
    // 控制切换语言弹出
    const [visible, setVisible] = useState(false)
    const [code, setCode] = useState()
    const [captcha, setCaptcha] = useState({})
    const [langIcon, setLangIcon] = useState(ViImg)
    const [lang, setLang] = useState('vi')
    const [loading, setLoading] = useState(false)
    const { dispatch, state } = useContextReducer.useContextReducer()

    const actions = [
        { text: "Tiếng Việt", key: "vi", img: ViImg },
        { text: "简体中文", key: "zh", img: ZhImg },
    ]
    // 选择语言事件
    const handleSelectLang = (e) => {
        let lang = `${e.key}`
        Local('lang', lang)
        i18n.changeLanguage(lang)
        setLang(e.text)
        setLangIcon(e.img)
        setVisible(false)
    }
    const updateImage = async () => {
        try {
            setCaptcha({...captcha, loading: true})
            const { code, img, uuid } = await getCaptcha()
            if (code == 200) {
              const obj = {
                img: 'data:image/gif;base64,' + img,
                uuid: uuid,
                loading: false
              }
              setCaptcha(obj)
            }
          } catch (e) {
            setCaptcha({loading: false})
          }
    }
    useEffect(() => {
        updateImage()
    }, [])
    //登录事件
    const handleLogin = async () => {
        setLoading(true)
        const data = {
            agentAccount: agentAccount,
            password: password,
            code: code * 1,
            uuid: captcha.uuid,
        }
        
        const res =  await login(data)
        setLoading(false)
        if (res.code === 200) {
            setLoading(true)
            Local('token', res.data.token)
            let { accountType, agentType, agentLevel } = res.data;
            let roles = RoleTypeDictory.Direct;
            if (accountType && accountType === 1) {
                roles = [RoleTypeDictory.Total, RoleTypeDictory.SuperAdmin];
            } else {
                if (agentType === 4) {
                if (agentLevel === 1) {
                    // 总代
                    roles = [RoleTypeDictory.Total];
                } else {
                    //直属代理
                    roles = [RoleTypeDictory.Direct];
                }
                } else {
                // 普通代理
                roles = [RoleTypeDictory.Normal];
                }
            }
            dispatch({
                type: 'ROLE',
                payload: roles
            });
            const infoRes =  await getInfo()
            setLoading(false)
            if (infoRes.code === 200) {
                dispatch({
                    type: 'UPDATE_USERINFO',
                    payload: infoRes.data
                });
            }
            history('/home')
        } else {
            Toast.show(res.msg)
            updateImage()
            setCode('')
        }
    }

    const handleCopySkype = (url) => {
        copyUrlToClip(url)
        Toast.show(t('CUST.translate144'))
    }

    return <div className={style.formBody}>
        <div className={style.bg}></div>
        <img src={Logoimg} className={style.logo} />
        <div className={style.appName}>👋 {t('CUST.translate3')}</div>
        <div className={style.desc}>{t('CUST.translate422')}</div>
        <div className={style.formArea}>
            <form className={style.loginForm}>
                <div className={style.inputBox}>
                    <span className={style.label}>{t('CUST.translate3')}</span>
                    <Input color="color3" value={agentAccount} className={style.stepInput} placeholder={t('CUST.translate9')} onChange={setAgentAccount} maxLength={16}></Input>
                </div>
                <div className={style.inputBox}>
                    <span className={style.label}>{t('CUST.translate5')}</span>
                    <Input color="color3" type="password" value={password} className={style.stepInput} placeholder={t('CUST.translate8')} onChange={setPassword}></Input>
                </div>
                <div className={style.inputBox}>
                    <span className={style.label}>{t('CUST.translate6')}</span>
                    <Input color="color3" value={code} className={style.stepInput} placeholder={t('CUST.translate7')} onChange={setCode}></Input>
                    <div className={style.codeWrapper} onClick={updateImage}>
                        <img src={captcha.img} alt='code' className='codeImg' />
                    </div>
                </div>
                <Grid columns={1} gap={15} className={style.btnGroup}>
                    <Button loading={loading} className={style.btn} color='primary' block={true} style={{ '--border-radius': '23px' }} onClick={handleLogin} disabled={!agentAccount || !password || !code}>{t('CUST.translate10')}</Button>
                </Grid>
            </form>
            <div className={style.hint}>
                <span className={style.noAccount}>{t('CUST.noAccount')}</span>
                <span className={style.registerBtn} onClick={() => history('/register')}>{t('CUST.registerNow')}</span>
            </div>
            <div className={style.contact}>{t('CUST.translate423')}</div>
            <div className={style.service} onClick={() => handleCopySkype('live:cid.6a601d5d2d4134d0')}>
                <span className={style.skype}>Skype{t('CUST.translate424')}:</span>
                <span className={style.skypeAccount}>live:cid.6a601d5d2d4134d0</span>
                <img
                    src={require('../../assets/image/common/fz.png')}
                    alt="skype"
                    style={{width: '15px', height: '15px', marginLeft: '5px', marginTop: '3px'}}
                />
            </div>
            <a href='https://t.me/FBSlive_ad' className={style.tele}>
                Telegram{t('CUST.translate424')}({t('CUST.translate425')})
            </a>
        </div>
        {/* 切换语言框 */}
        <div className={`${style.lang}`} onClick={() => setVisible(true)}>
            <img src={actions.find(e => { return e.key === (Local('lang') || 'vi') })?.img} alt="lang" className={style.langIcon} />
            <img src={DownImg} alt='arrow' className={`${style.downArrow} ${visible ? style.rotate : ''}`} />
        </div>
        <ActionSheet
            extra={t('CUST.chooseLanguage')}
            cancelText={t('CUST.translate97')}
            visible={visible}
            actions={actions}
            onClose={() => setVisible(false)}
            onAction={handleSelectLang}
        />
    </div>
}

export default Login
