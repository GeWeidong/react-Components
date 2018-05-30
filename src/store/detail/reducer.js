import * as detail from './actionType';

// detail信息
let initialState = {
	data: null,
	status: false
}

// detial reducer
export const detailReducer = (state = initialState, action = {}) => {
	switch(action.type) {
		case detail.DETAIL_INFO:
			return Object.assign({}, state, {
				data: action.data,
				status: action.status,
			});
		default :
			return state;
	}
}