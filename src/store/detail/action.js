import * as detail from './actionType';

// 获取detail信息
const getDetail = (data, status) => {
	return {
		type: detail.DETAIL_INFO,
		data,
		status
	}
}

// 获取detail信息
export const getDetailData = () => {
	return async dispatch => {
		try {
			
			dispatch(getDetail({
				id: 123,
				title: 'detail',
				imgurl: 'http://oa.58.com.cn/infocenter/view/48b0c7061219544838-7edf',
			}, true));

		}catch(err){

			dispatch(getDetail(null, false));
			console.log(err);
		}
	}
}
