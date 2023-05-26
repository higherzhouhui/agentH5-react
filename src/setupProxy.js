const proxy = require('http-proxy-middleware')//引入http-proxy-middleware，react脚手架已经安装
module.exports = function (app) {
	app.use(
		// 代理系统的代理地址
		proxy.createProxyMiddleware('/agentApi', {
			// target: 'http://agent.kaijibet.com/api',//正式环境
			target: 'http://kagent.testlive.vip/api',//测试环境
			changeOrigin: true,
			pathRewrite: { '^/agentApi': '/' }
		}),
		// PCH5的代理地址
		proxy.createProxyMiddleware('/api', {
			// target: 'http://agent.fbslive.com/api',//正式环境 
			target: 'http://fbs-agent.testlive.vip/api/',//测试环境
			// target: 'http://192.168.11.108:8103',//ds
			changeOrigin: true,
			pathRewrite: { '^/api': '/' }
		}),
	)
}
