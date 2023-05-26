import { Local } from '../common/index'
const routes = [
    {
        path: '*',
        redirect: '/home',
    },
    {
        path: '/login',
        page: () => import("./pages/Login/login"),
    },
    {
        path: '/register',
        page: () => import("./pages/Login/register"),
    },
    {
        path: '/report',
        page: () => import("./pages/Form/index"),
    },
    {
        path: '/home',
        page: () => import("./pages/Home/index"),
        meta: {
            auth: true
        }
    },
    {
        path: '/baseInfo',
        page: () => import("./pages/MyInfo/index"),
        meta: {
            auth: true
        }
    },
    {
        path: '/baseInfo/bindCard',
        page: () => import("./pages/MyInfo/bindCard/index"),
        meta: {
            auth: true
        }
    },
    {
        path: '/baseInfo/bindCname',
        page: () => import("./pages/MyInfo/bindCname/index"),
        meta: {
            auth: true
        }
    },
    {
        path: '/baseInfo/addNew',
        page: () => import("./pages/MyInfo/addNewCard/index"),
        meta: {
            auth: true
        }
    },
    {
        path: '/baseInfo/faceBook',
        page: () => import("./pages/MyInfo/faceBook/index"),
        meta: {
            auth: true
        }
    },
    {
        path: '/baseInfo/loginPwd',
        page: () => import("./pages/MyInfo/loginPwd/index"),
        meta: {
            auth: true
        }
    },
    {
        path: '/baseInfo/withdraw',
        page: () => import("./pages/MyInfo/withdraw/index"),
        meta: {
            auth: true
        }
    },
    {
        path: '/baseInfo/promote',
        page: () => import("./pages/MyInfo/promote/index"),
        meta: {
            auth: true
        }
    },
    {
        path: '/baseInfo/operationSuccess',
        page: () => import("./pages/MyInfo/operationSuccess/index"),
        meta: {
            auth: true
        }
    },
    {
        path: '/baseInfo/moneyPwd',
        page: () => import("./pages/MyInfo/moneyPwd/index"),
        meta: {
            auth: true
        }
    },
    {
        path: '/baseInfo/emailChange',
        page: () => import("./pages/MyInfo/emailChange/index"),
        meta: {
            auth: true
        }
    },
    {
        path: '/anchor_list',
        page: () => import("./pages/Form/anchorList")
    },
    {
        path: '/member_commission_list',
        page: () => import("./pages/Form/memberCommission")
    },
    {
        path: '/member_commission_detail',
        page: () => import("./pages/Form/memberCommissionDetail")
    },
    {
        path: '/win_lose_list',
        page: () => import("./pages/Form/winOrLoseList")
    },
    {
        path: '/game_list',
        page: () => import("./pages/Form/gameList")
    },
    {
        path: '/activity_list',
        page: () => import("./pages/Form/activityList")
    },
    {
        path: '/commission_settlement',
        page: () => import("./pages/Form/commissionSettlement")
    },
    {
        path: '/commission_settlement_detail',
        page: () => import("./pages/Form/commissionSettlementDetail")
    },
    {
        path: '/platform_form',
        page: () => import("./pages/Form/platformForm")
    },
    {
        path: '/platform_detail',
        page: () => import("./pages/Form/platformDetail")
    },
    {
        path: '/drawing_directreport',
        page: () => import("./pages/Form/drawingDirectreportForm")
    },
    {
        path: '/drawing_directreport_detail',
        page: () => import("./pages/Form/drawingDirectreportDetail")
    },
    {
        path: '/subordinate_report',
        page: () => import("./pages/Form/subordinateReportForm")
    },
    {
        path: '/subordinate_report_detail',
        page: () => import("./pages/Form/subordinateReportDetail")
    },
    {
        path: '/subordinate_parter_report',
        page: () => import("./pages/Form/subordinateParterReportForm")
    },
    {
        path: '/subordinate_parter_report_detail',
        page: () => import("./pages/Form/subordinateParterReportFormDetail")
    },
    {
        path: '/commission_reportForm',
        page: () => import("./pages/Form/commissionReportForm")
    },
    {
        path: '/agent',
        page: () => import("./pages/Proxy/index")
    },
    {
        path: '/proxy_detail',
        page: () => import("./pages/Proxy/proxyDetail")
    },
    {
        path: '/create_proxy',
        page: () => import("./pages/Proxy/creatProxy")
    },
    {
        path: '/member_detail',
        page: () => import("./pages/Proxy/memberDetail")
    }

];

//全局路由守卫
const onRouteBefore = (meta, to) => {
    const { auth } = meta;
    // token权限验证
    return (auth && !Local('token')) ? '/login' : to;
};

export default routes;

export {
    onRouteBefore,
}
