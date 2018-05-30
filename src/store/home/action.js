import * as home from './actionType';

// 初始化登录信息等
const initFunction = (userId, apkVer, initError) => {
	return {
		type: home.INITHOME,
		userId,
		apkVer,
		initError
	}
}

// 获取登录信息
export const initData = () => {
	return async dispatch => {
		try {
			// 这里请求各种登录信息
			// ...coding here 
			let userId = 9527;
			let apkVer = 2.2;

			dispatch(initFunction(userId, apkVer, false));

		}catch(err){

			dispatch(initFunction(null, null, true));
			console.log(err);
		}
	}
}
