import React from 'react'
import { TabBar } from '../../components'
import { useNavigate } from "react-router-dom"

import style from './common.module.scss'
import Header from './components/header'
import { useTranslation } from "react-i18next"
import IMG1 from '../../assets/image/form/form1.png'
import IMG2 from '../../assets/image/form/form2.png'
import IMG3 from '../../assets/image/form/form3.png'
import IMG4 from '../../assets/image/form/form4.png'
import IMG5 from '../../assets/image/form/form5.png'
import IMG6 from '../../assets/image/form/form6.png'
import IMG7 from '../../assets/image/form/form7.png'
import IMG8 from '../../assets/image/form/form8.png'
import IMG9 from '../../assets/image/form/form9.png'
import IMG10 from '../../assets/image/form/form10.png'
import IMG11 from '../../assets/image/form/form11.png'
import { Local } from '../../../common'
const FormIndex = () => {
    let { t } = useTranslation()
    const history = useNavigate()
    const { agentType } = Local('userInfo')
    // const agentTypeList = ['', t('CUST.translate198'), t('CUST.translate199'), t('CUST.translate200'), t('CUST.translate201')]
    const formList = [
        { path: '/win_lose_list', img: IMG1, name: 'translate227' },
        { path: '/game_list', img: IMG2, name: 'translate236' },
        { path: '/activity_list', img: IMG3, name: 'translate238' },
        { path: '/member_commission_list', img: IMG4, name: 'translate241' },
        { path: '/drawing_directreport', img: IMG5, name: 'translate252' },
        { path: '/subordinate_parter_report', img: IMG6, name: 'translate255' },
        { path: '/subordinate_report', img: IMG7, name: 'translate260' },
        { path: '/anchor_list', img: IMG8, name: 'translate261' },
        { path: '/commission_reportForm', img: IMG9, name: 'translate265' },
        { path: '/platform_form', img: IMG10, name: 'translate295' },
        { path: '/commission_settlement', img: IMG11, name: 'translate284' }
    ]
    const toLink = (path) => {
        if (!path) return
        history(path)
    }
    return <div className={style.formIndex}>
        <Header title={t('CUST.translate335')} noBack={true} />
        <TabBar active="/report" />
        {formList.map((item, index) => {
            return agentType == 1 && index == 5 ? '' :
                <div onClick={() => toLink(item.path)} className={style.item} key={index}>
                    <div className={style.innerBox}>
                        <img src={item.img} />
                        <span className={style.txt}>{t('CUST.' + item.name)}</span>
                    </div>
                </div>
        }
        )}
    </div>
}

export default FormIndex