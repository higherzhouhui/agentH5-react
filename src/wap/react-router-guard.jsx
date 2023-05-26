import { useRoutes, Navigate, useLocation } from 'react-router-dom';
import React, { Suspense, useCallback, useEffect } from "react";
import useContextReducer from './state/useContextReducer';
import { getInfo } from './api/user'
import { Local } from '../common/index'
let onRouterBefore;
let RouterLoading;

//路由导航，设置redirect重定向 和 auth权限
function Guard({ element, meta }) {
    const { pathname } = useLocation();
    const nextPath = onRouterBefore ? onRouterBefore(meta, pathname) : pathname;
    if (nextPath && nextPath !== pathname) {
        element = <Navigate to={nextPath} replace={true} />;
    }
    return element;
}


// 路由懒加载
function lazyLoadRouters(page, meta) {
    meta = meta || {};
    const LazyElement = React.lazy(page);
    const GetElement = () => {
        const { dispatch, state: {
            isLogin
        } } = useContextReducer.useContextReducer()
        const init = useCallback(async () => {
            if (!isLogin && Local('token')) {
                const userInfo = await getInfo()
                if (userInfo.code === 200) {
                    dispatch(() => {
                        return {
                            type: "LOGIN",
                            payload: true
                        }
                    })
                    dispatch(() => {
                        return {
                            type: "UPDATE_USERINFO",
                            payload: userInfo.data
                        }
                    })
                }
            }
        }, [])
        useEffect(() => {
            init()
        }, [init])
        return (
            <Suspense fallback={<RouterLoading />}>
                <LazyElement />
            </Suspense>
        );
    };
    return <Guard element={<GetElement />} meta={meta} />;
}

function transRoutes(routes) {
    const list = [];
    routes.forEach((route) => {
        const obj = { ...route };
        if (obj.redirect) {
            obj.element = <Navigate to={obj.redirect} replace={true} />
        }
        if (obj.page) {
            obj.element = lazyLoadRouters(obj.page, obj.meta)
        }
        if (obj.children) {
            obj.children = transRoutes(obj.children)
        }
        ['redirect', 'page', 'meta'].forEach(name => delete obj[name]);
        list.push(obj)
    });
    return list
}
function RouterGuard(params) {
    // console.log(params,"params")
    onRouterBefore = params.onRouterBefore;
    RouterLoading = () => params.loading || <></>;
    return useRoutes(transRoutes(params.routers));
}
export default RouterGuard;