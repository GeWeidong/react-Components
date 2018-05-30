import * as home from './actionType';
// 初始化默认登录信息
let initialState = {
	userId: null,
	apkVer: null,
	initError: false
}
// home reducer
export const initReducer = (state = initialState, action = {}) => {
	switch(action.type) {
		case home.INITHOME:
			return Object.assign({}, state, {
				userId: action.userId,
				apkVer: action.apkVer,
				initError: action.initError,
			});
		default :
			return state;
	}
}