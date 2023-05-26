import React, { useState } from "react"
import { Switch, Modal, Toast } from "antd-mobile"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import style from './index.module.scss'


const CardItem = (props) => {
    const history = useNavigate()
    const { t } = useTranslation()
    const { bindStatus, handleDelete, handleChangeStatus, bankName, realName, bankNo, createTime, walletName, walletAddress, walletProtocol } = props
    const routerToDetail = () => {
        const myData = JSON.parse(JSON.stringify(props))
        delete myData.handleChangeStatus
        delete myData.handleDelete
        history('/baseInfo/addNew', {state: {type: bankName ? 'bank' : 'usdt', ...myData}})
    }

    const onChangeStatus = async() => {
        const result = await Modal.confirm({
            content: t('CUST.translate145'),
            cancelText: t('CUST.translate97'),
            confirmText: t('CUST.translate98')
        })
        if (result) {
            handleChangeStatus(props, bankName ? 'bank' : 'usdt')
        }
    }

    const deleteItem = async() => {
        if (!bindStatus) {
            return
        }
        const result = await Modal.confirm({
            content: t('CUST.translate145'),
            cancelText: t('CUST.translate97'),
            confirmText: t('CUST.translate98')
        })
        if (result) {
            handleDelete(props, bankName ? 'bank' : 'usdt', true)
        }
    }
    return <div className={`${style.cardItemWrapper} ${bindStatus ? '' : style.disableStyle}`}>
        <div className={style.top}>
            <div className={style.left}>{bankName || walletProtocol}</div>
            <Switch checked={bindStatus} onChange={(e) => onChangeStatus(e)} style={{
            '--checked-color': '#FC708B',
            '--height': '20px',
            '--width': '40px',
          }}/>
        </div>
        <div className={style.middle} onClick={() => routerToDetail()}>
            <div className={style.name}>{realName || walletName}</div>
            <div className={style.bankNo}>{(bankNo || '').replace(/(.{4})/g, "$1 ") || walletAddress}</div>
        </div>
        <div className={style.bot}>
            <div className={style.time}>{`${t('CUST.translate142')}:${createTime}`}</div>
            <div className={style.delete} onClick={() => deleteItem()}>
                <img src={require('../../assets/image/common/delete.png')} />
                <span>{t('CUST.delete')}</span>
            </div>
        </div>
    </div>
}
export default CardItem