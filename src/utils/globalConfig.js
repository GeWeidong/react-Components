// 存放全局变量
const dev = process.env.NODE_ENV !== 'production';
// 平台属性
// const plat_form = isAndroid ? 'Android' : 'IOS';
// 其他的东东....

// 基础网络路径
const baseUrl = dev ? 'https://appsclub.jj.cn/club_api/v1' : 'https://appsclub.jj.cn/club_api1/v*';

export {
	baseUrl,
}
