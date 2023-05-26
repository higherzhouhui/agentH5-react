import i18n from "i18next";
import { initReactI18next } from 'react-i18next';
import { Local } from "../../common";
import vi from "./vi";
import zh from "./zh";
const resources = {
    zh: {
        translation: zh
    },
    vi: {
        translation: vi
    }
};
i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: Local('lang') || "vi",
        interpolation: {
            escapeValue: false,
        },
    })

export default i18n;