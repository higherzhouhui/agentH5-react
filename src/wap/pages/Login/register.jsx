import React, { useEffect, useState } from "react";
import Logoimg from "../../assets/image/login/login-logo.png";
import ViImg from "../../assets/image/login/vi.png";
import ZhImg from "../../assets/image/login/zh.png";
import DownImg from "../../assets/image/login/downarrow.png";
import { useTranslation } from "react-i18next";
import style from "./index.module.scss";
import { Input } from "../../components";
import { ActionSheet, Button, Grid, Toast, DotLoading, Modal } from "antd-mobile";
import i18n from "../../language/config";
import { useNavigate } from "react-router-dom";
import { Local } from "../../../common";
import { sendEmailCode, agentRegister } from "../../api/user";
import useContextReducer from "../../state/useContextReducer";
import { useRef } from "react";

const Register = () => {
	const { t } = useTranslation();
	const history = useNavigate();
	const [agentAccount, setAgentAccount] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState();
	// 控制切换语言弹出
	const [visible, setVisible] = useState(false);
	const [code, setCode] = useState();
	const [langIcon, setLangIcon] = useState(ViImg);
	const [lang, setLang] = useState("vi");
	const [loading, setLoading] = useState(false);
	const [emailloading, setemailLoading] = useState(false);
	const { dispatch, state } = useContextReducer.useContextReducer();
	const [count, setCount] = useState(false);
	const countTime = useRef();
	const timer = useRef(null);
	const actions = [
		{ text: "Tiếng Việt", key: "vi", img: ViImg },
		{ text: "简体中文", key: "zh", img: ZhImg },
	];
	// 选择语言事件
	const handleSelectLang = (e) => {
		let lang = `${e.key}`;
		Local("lang", lang);
		i18n.changeLanguage(lang);
		setLang(e.text);
		setLangIcon(e.img);
		setVisible(false);
	};
	const sendEmail = async () => {
		setemailLoading(true);
		sendEmailCode({ email }).then((res) => {
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

	useEffect(() => {
		return () => {
            clearInterval(timer.current);
        }
	}, []);
	//登录事件
	const handleLogin = async () => {
		setLoading(true);
		const data = {
			agentAccount: agentAccount,
			password: password,
			verifyCode: code,
			email: email,
		};

		const res = await agentRegister(data);
		setLoading(false);
		if (res.code === 200) {
            Modal.alert({
                title: t('CUST.translate406'),
                content: t('CUST.translate407'),
                confirmText: t('CUST.translate279')
            })
		} else {
			Toast.show(res.msg);
		}
	};
	return (
		<div className={style.formBody}>
			<div className={style.bg}></div>
			<img src={Logoimg} className={style.logo} />
			<div className={style.appName}>👋 {t("CUST.registerWelcom")}</div>
			<div className={style.desc}>{t("CUST.translate2")}</div>
			<div className={style.formArea}>
				<form className={style.loginForm}>
					<div className={style.inputBox}>
						<span className={style.label}>
							{t("CUST.translate4")}
						</span>
						<Input
							color="color3"
							value={agentAccount}
							className={style.stepInput}
							placeholder={t("CUST.translate210")}
							onChange={setAgentAccount}
							maxLength={16}
						></Input>
						{
							(agentAccount && agentAccount.length < 6) ? <div className={style.error}>{t("CUST.translate210")}</div> : null
						}
					</div>
					<div className={style.inputBox}>
						<span className={style.label}>
							{t("CUST.translate5")}
						</span>
						<Input
							color="color3"
							type="password"
							value={password}
							className={style.stepInput}
							placeholder={t("CUST.translate84")}
							onChange={setPassword}
						></Input>
					</div>
					<div className={style.inputBox}>
						<span className={style.label}>
							{t("CUST.translate68")}
						</span>
						<Input
							color="color3"
							value={email}
							className={style.stepInput}
							placeholder={t("CUST.translate91")}
							maxLength={50}
							onChange={setEmail}
						></Input>
					</div>
					<div className={style.inputBox}>
						<span className={style.label}>
							{t("CUST.translate6")}
						</span>
						<Input
							color="color3"
							value={code}
							className={style.stepInput}
							placeholder={t("CUST.translate7")}
							maxLength={6}
							onChange={setCode}
						></Input>
						<div className={style.emailCode} onClick={sendEmail}>
							{emailloading ? (
								<DotLoading />
							) : (
								<span
									style={{
										color: email ? "#FC708B" : "#999",
									}}
								>
									{count ? count : t('CUST.translate110')}
								</span>
							)}
						</div>
					</div>
					<Grid columns={1} gap={15} className={style.btnGroup}>
						<Button
							loading={loading}
							className={style.btn}
							color="primary"
							block={true}
							style={{ "--border-radius": "23px" }}
							onClick={handleLogin}
							disabled={
								agentAccount.length < 6 || password.length < 6 || !code || !email
							}
						>
							{t("CUST.translate408")}
						</Button>
					</Grid>
				</form>
				<div className={style.hint}>
					<span className={style.noAccount}>{t("CUST.translate404")}</span>
					<span
						className={style.registerBtn}
						onClick={() => history("/login")}
					>
						{t("CUST.translate403")}
					</span>
				</div>
			</div>
			{/* 切换语言框 */}
			<div className={`${style.lang}`} onClick={() => setVisible(true)}>
				<img
					src={
						actions.find((e) => {
							return e.key === (Local("lang") || "zh");
						})?.img
					}
					alt="lang"
					className={style.langIcon}
				/>
				<img
					src={DownImg}
					alt="arrow"
					className={`${style.downArrow} ${
						visible ? style.rotate : ""
					}`}
				/>
			</div>
			<ActionSheet
				extra={t("CUST.chooseLanguage")}
				cancelText={t('CUST.translate97')}
				visible={visible}
				actions={actions}
				onClose={() => setVisible(false)}
				onAction={handleSelectLang}
			/>
		</div>
	);
};

export default Register;
