import createContextReducer from 'context-reducer';
import { Local } from '../../common';
import fetchContainer from './useAction'


/** 初始state值 */
const stateDefault = {
    isLogin: false,
    user: Local('userInfo') || {},
    baseConfig: {},
    role: Local('role') || []
};

export const reducer = (
    state,
    action
) => {
    const { type, payload, meta } = action;
    switch (type) {
        case 'UPDATE_USERINFO': {
            Local('userInfo', payload)
            return {
                ...state,
                user: payload,
            };
        }
        case 'LOGIN': {
            return {
                ...state,
                isLogin: payload,
            };
        }
        case 'REGISTER': {
            return {
                ...state,
                isLogin: payload,
            };
        }
        case 'BASECONFIG': {
            return {
                ...state,
                baseConfig: payload
            };
        }
        case 'ROLE': {
            Local('role', payload)
            return {
                ...state,
                role: payload
            };
        }
        case 'LOGOUT': {
            Local('token', '')
            Local('userInfo', '')
            return {
                isLogin: false,
                user: {},
                baseConfig: {}
            };
        }

        default:
            return state;
    }
};

export default createContextReducer({ reducer, stateDefault, fetchContainer });