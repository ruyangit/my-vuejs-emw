/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * productPath: 如果有项目名称245
 */

let baseUrl = '';
let routerMode = 'hash';
let productPath = '';

if (process.env.NODE_ENV == 'development') {
	// baseUrl = 'http://10.166.8.33:8080/credit-monitor'
	baseUrl = 'http://10.166.10.55:18080/credit-monitor'
	// baseUrl = 'http://10.166.2.245:18080/credit-monitor'
} else if (process.env.NODE_ENV == 'production') {
	baseUrl = '/credit-monitor'
	productPath = '/credit-monitor'
}

export {
	baseUrl,
	routerMode,
	productPath,
}