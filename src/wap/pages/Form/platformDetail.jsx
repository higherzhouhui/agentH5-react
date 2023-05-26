// 平台费报表详情
import React, { useEffect, useState } from 'react'
import Header from './components/header'
import style from './common.module.scss'
import { useTranslation } from "react-i18next"
import './common.scss'
import { useLocation } from "react-router-dom"
import ICON from '../../assets/image/form/plat_icon.png'
import Decimal from "decimal.js";

const AnchorList = () => {
    const { t } = useTranslation()
    let location = useLocation()
    const { state } = location
    const getTotal = (type) => {
        let keyList = ['ty', 'qp', 'zr', 'cp', 'by', 'dz']
        let total = 0
        keyList.forEach(key => {
            total = Decimal(total).add(Decimal(state.info[key][type] * 1)).toNumber()
        })
        return total
    }
    return <div className={`${style.formBg} ${style.formBg2}`}>
        <Header title={t('CUST.translate0')} backLink='/platform_form' />
        <div className={style.formBody}>
            <div className={style.formItem}>
                <div className={style.topInfo}>
                    <div className={style.leftInfo}>{state.month}</div>
                    <div className={style.rightInfo}>{t('CUST.dlID')}:{state.agentId}</div>
                </div>
            </div>
            <div className={style.otherStyle}>
                <img src={ICON} alt="" /> <span>{t('CUST.translate297')}</span>
            </div>
            <div className={style.formItem}>
                <div className={style.bottomInfo}>
                    <div className={style.bottomInfoItem}>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.' + state.info.ty.name)}</div>
                            <div className={style.val}>{state.info.ty.totalProfit}</div>
                        </div>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.' + state.info.qp.name)}</div>
                            <div className={style.val}>{state.info.qp.totalProfit}</div>
                        </div>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.' + state.info.zr.name)}</div>
                            <div className={style.val}>{state.info.zr.totalProfit}</div>
                        </div>
                    </div>
                </div>
                <div className={style.bottomInfo}>
                    <div className={style.bottomInfoItem}>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.' + state.info.cp.name)}</div>
                            <div className={style.val}>{state.info.cp.totalProfit}</div>
                        </div>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.' + state.info.by.name)}</div>
                            <div className={style.val}>{state.info.by.totalProfit}</div>
                        </div>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.' + state.info.dz.name)}</div>
                            <div className={style.val}>{state.info.dz.totalProfit}</div>
                        </div>
                    </div>
                </div>
                <div className={style.bottomInfo}>
                    <div className={style.bottomInfoItem}>
                        <div className={`${style.key} ${style.key2}`}>{t('CUST.translate304')}</div>
                        <div className={`${style.val} ${style.val2}`}>{getTotal('totalProfit')}</div>
                    </div>

                </div>
            </div>

            <div className={style.otherStyle}>
                <img src={ICON} alt="" /> <span>{t('CUST.translate38')}</span>
            </div>
            <div className={style.formItem}>
                <div className={style.bottomInfo}>
                    <div className={style.bottomInfoItem}>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.' + state.info.ty.name)}</div>
                            <div className={style.val}>{state.info.ty.platformAmt}</div>
                        </div>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.' + state.info.qp.name)}</div>
                            <div className={style.val}>{state.info.qp.platformAmt}</div>
                        </div>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.' + state.info.zr.name)}</div>
                            <div className={style.val}>{state.info.zr.platformAmt}</div>
                        </div>
                    </div>
                </div>
                <div className={style.bottomInfo}>
                    <div className={style.bottomInfoItem}>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.' + state.info.cp.name)}</div>
                            <div className={style.val}>{state.info.cp.platformAmt}</div>
                        </div>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.' + state.info.by.name)}</div>
                            <div className={style.val}>{state.info.by.platformAmt}</div>
                        </div>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.' + state.info.dz.name)}</div>
                            <div className={style.val}>{state.info.dz.platformAmt}</div>
                        </div>
                    </div>
                </div>
                <div className={style.bottomInfo}>
                    <div className={style.bottomInfoItem}>
                        <div className={`${style.key} ${style.key2}`}>{t('CUST.translate304')}</div>
                        <div className={`${style.val} ${style.val2}`}>{getTotal('platformAmt')}</div>
                    </div>

                </div>
            </div>

            <div className={style.otherStyle}>
                <img src={ICON} alt="" /> <span>{t('CUST.translate307')}</span>
            </div>
            <div className={style.formItem}>
                <div className={style.bottomInfo}>
                    <div className={style.bottomInfoItem}>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.' + state.info.ty.name)}</div>
                            <div className={style.val}>{state.info.ty.platformRatio}%</div>
                        </div>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.' + state.info.qp.name)}</div>
                            <div className={style.val}>{state.info.qp.platformRatio}%</div>
                        </div>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.' + state.info.zr.name)}</div>
                            <div className={style.val}>{state.info.zr.platformRatio}%</div>
                        </div>
                    </div>
                </div>
                <div className={style.bottomInfo}>
                    <div className={style.bottomInfoItem}>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.' + state.info.cp.name)}</div>
                            <div className={style.val}>{state.info.cp.platformRatio}%</div>
                        </div>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.' + state.info.by.name)}</div>
                            <div className={style.val}>{state.info.by.platformRatio}%</div>
                        </div>
                        <div className={style.item}>
                            <div className={style.key}>{t('CUST.' + state.info.dz.name)}</div>
                            <div className={style.val}>{state.info.dz.platformRatio}%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

}

export default AnchorList