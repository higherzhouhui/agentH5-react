import { Local } from '../../common';

const fetchContainer = (dispatch) => {
    /** 接口1 */
    const freshUser = async (
        /** 请求参数 */
        type
    ) => {
        try {
            const res = {}
            // 修改状态
            dispatch((s) => {
                return {
                    type: 'UPDATE_USERINFO',
                    payload: res,
                };
            });
        } catch (error) {
            dispatch({
                type: 'UPDATE_USERINFO',
                payload: {},
            });
        }
    };

    const loutOut = () => {
        Local('h5-userInfo', null)
        Local('h5-token', null)
        dispatch({
            type: 'UPDATE_USERINFO',
            payload: {},
        });
        dispatch({
            type: 'LOGIN',
            payload: false,
        });
    }
    return {
        freshUser,
        loutOut
    };
};

export default fetchContainer;