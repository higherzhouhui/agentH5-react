import { Toast, Form, Button, Radio, Space, ActionSheet } from "antd-mobile";
import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import {
	addmyBank,
	addmyWallet,
	bankmyUpdate,
	walletmyUpdate,
} from "../../../api/user";
import { getConfigDataInfo } from "../../../api/common";
import useContextReducer from '../../../state/useContextReducer'
import Input from "../../../components/input";
import style from "./index.module.scss";

const AddNewCard = () => {
	const { t } = useTranslation();
	const history = useNavigate();
	const [bankList, setBankList] = useState([
    {text: "USDT-TRC20", key: "USDT-TRC20"},
    {text: "USDT-ERC20", key: "USDT-ERC20"},
    {text: "BTC-TRC20", key: "BTC-TRC20"},
    {text: "BTC-ERC20", key: "BTC-ERC20"},
  ]);
	const { state } = useLocation();
	const [bankName, setBankName] = useState(state?.bankName || state?.walletProtocol);
	const [visiable, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const form = useRef();
	// 选择银行
	const handleSelectBank = (e) => {
		setBankName(e.text);
		setVisible(false);
	};
	const {
		state: { baseConfig  }, dispatch
	  } = useContextReducer.useContextReducer()

	const [handleClickOnce, sethandleClickOnce] = useState(false);
	useEffect(() => {
		if (state.type === "bank") {
			if (baseConfig && Object.keys(baseConfig).length) {
				setBankList(baseConfig.configUserBankListVOS)
			} else {
				getConfigDataInfo().then((res) => {
					if (res.code === 200) {
						const list =
						res?.data.currencyRateVO?.configUserBankListVOS || [];
						list.forEach((item) => {
							item.text = item.bankName;
							item.key = item.bankName;
						});
						setBankList(list);
						dispatch({
							type: 'BASECONFIG',
							payload: res?.data.currencyRateVO
						});
					} else {
						Toast.show(res.msg)
					}
				});

			}
		}
		// 切换选项重置表单
		if (form && form.current) {
			form.current.resetFields();
		}
	}, []);

	const onFinish = (data) => {
    let bindStatus = data.bindStatus
    if (data.bindStatus === undefined) {
      bindStatus = 1
    }
		sethandleClickOnce(true);
		if (state?.type === "bank") {
			if (!bankName) {
				return;
			}
			setLoading(true);
			if (state.bankName) {
				bankmyUpdate({
					...data,
					bankName,
					id: state?.id,
					bindStatus,
				}).then((res) => {
					setLoading(false);
					if (res.code === 200) {
						Toast.show(t("CUST.translate108"));
						history('/baseInfo/bindCard', {state: {type: state.type}});
					} else {
						Toast.show(res.msg);
					}
				});
			} else {
				addmyBank({
					...data,
					bankName,
					bindStatus,
				}).then((res) => {
					setLoading(false);
					if (res.code === 200) {
						Toast.show(t("CUST.translate108"));
						history('/baseInfo/bindCard', {state: {type: state.type}});
					} else {
						Toast.show(res.msg);
					}
				});
			}
		}
    if (state?.type === "usdt") {
			if (!bankName) {
				return;
			}
			setLoading(true);
			if (state.walletName) {
				walletmyUpdate({
					...data,
					walletProtocol: bankName,
					id: state?.id,
					bindStatus,
				}).then((res) => {
					setLoading(false);
					if (res.code === 200) {
						Toast.show(t("CUST.translate108"));
						history('/baseInfo/bindCard', {state: {type: state.type}});
					} else {
						Toast.show(res.msg);
					}
				});
			} else {
				addmyWallet({
					...data,
					walletProtocol: bankName,
					bindStatus,
				}).then((res) => {
					setLoading(false);
					if (res.code === 200) {
						Toast.show(t("CUST.translate108"));
						history('/baseInfo/bindCard', {state: {type: state.type}});
					} else {
						Toast.show(res.msg);
					}
				});
			}
		}
	};

	const checkName = (_, value) => {
		if (value) {
			return Promise.resolve();
		}
		return Promise.reject(new Error(t("CUST.translate119")));
	};
	const checkBankNo = (_, value) => {
		if (value) {
			return Promise.resolve();
		}
		return Promise.reject(new Error(t("CUST.translate119")));
	};
	const checkWalletName = (_, value) => {
		if (value) {
			return Promise.resolve();
		}
		return Promise.reject(new Error(t("CUST.translate134")));
	};
	const checkWalletAddress = (_, value) => {
		if (value) {
			return Promise.resolve();
		}
		return Promise.reject(new Error(t("CUST.translate140")));
	};

	const handleBack = () => {
		if (state?.path) {
			history('/baseInfo/withdraw', {state: {type: state.type}})
		} else {
			history('/baseInfo/bindCard', {state: {type: state.type}})
		}
	}

	return (
		<div className={`${style.container} ${loading && "loading"}`}>
			<div className={style.header}>
				{`${state.walletName || state.bankName ? t("CUST.translate76") : t("CUST.translate112")}${
					state.type === "bank"
						? t("CUST.translate111")
						: t("CUST.translate113")
				}`}
				<img
					src={require("../../../assets/image/info/back.png")}
					className={style.backBtn}
					onClick={() => handleBack()}
				/>
			</div>

			<div className={style.main}>
				<Form
					layout="vertical"
					ref={form}
					onFinish={onFinish}
					className={style.form}
					initialValues={{
						bankName: bankName,
						realName: state?.realName,
						bankNo: state?.bankNo,
						bindStatus: state?.bindStatus,
						walletProtocol: state?.walletProtocol,
						walletName: state?.walletName,
						walletAddress: state?.walletAddress
					}}
				>
					{state.type === "bank" ? (
						<>
							<Form.Item
								label={t("CUST.translate118")}
								name="realName"
								rules={[{ validator: checkName }]}
							>
								<Input
									className={style.inputStyle}
									placeholder={t("CUST.translate119")}
								/>
							</Form.Item>
							<Form.Item label={t("bankName")} name="bankName" className={style.selectArrow}>
								<Input
									className={style.inputStyle}
									placeholder={t("bankName_placeHolder")}
									value={bankName}
									hideClearable={true}
									onClick={() => {
										setVisible(true);
									}}
								/>
								{!bankName && handleClickOnce ? (
									<div className="adm-list-item-description">
										<div className="adm-form-item-feedback-error">
											{t("bankName_placeHolder")}
										</div>
									</div>
								) : null}
								<div style={{ display: "none" }}>
									{bankName}
								</div>
							</Form.Item>
							<Form.Item
								label={t("CUST.translate124")}
								name="bankNo"
								rules={[{ validator: checkBankNo }]}
							>
								<Input
									className={style.inputStyle}
									placeholder={t("CUST.translate125")}
								/>
							</Form.Item>
						</>
					) : (
						<>
							<Form.Item
								label={t("CUST.translate133")}
								name="walletName"
								rules={[{ validator: checkWalletName }]}
							>
								<Input
									className={style.inputStyle}
									placeholder={t("CUST.translate134")}
								/>
							</Form.Item>
							<Form.Item 
							label={t("CUST.translate136")} 
							name="walletProtocol" >
								<Input
									className={style.inputStyle}
									placeholder={t("CUST.translate137")}
									value={bankName}
									onClick={() => {
										setVisible(true);
									}}
								/>
								{!bankName && handleClickOnce ? (
									<div className="adm-list-item-description">
										<div className="adm-form-item-feedback-error">
											{t("CUST.translate137")}
										</div>
									</div>
								) : null}
								<div style={{ display: "none" }}>
									{bankName}
								</div>
							</Form.Item>
							<Form.Item
								label={t("CUST.translate139")}
								name="walletAddress"
								rules={[{ validator: checkWalletAddress }]}
							>
								<Input
									className={style.inputStyle}
									placeholder={t("CUST.translate140")}
								/>
							</Form.Item>
						</>
					)}
					<Form.Item label={t("CUST.translate130")} name="bindStatus">
						<Radio.Group defaultValue={1}>
							<Space style={{ marginTop: "8px" }}>
								<Radio value={1}>
									{t("CUST.translate131")}
								</Radio>
								<Radio value={0}>
									{t("CUST.translate132")}
								</Radio>
							</Space>
						</Radio.Group>
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
			<ActionSheet
				extra={t("CUST.xuanzefafangriqi")}
				cancelText={t("CUST.translate97")}
				visible={visiable}
				actions={bankList}
				onClose={() => setVisible(false)}
				style={{ maxHeight: "50vh", overflow: "auto" }}
				onAction={handleSelectBank}
			/>
		</div>
	);
};
export default AddNewCard;
