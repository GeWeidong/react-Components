import * as global_config from '@/utils/globalConfig';
import request from './request';

const baseUrl = global_config.baseUrl;

// 获取用户信息接口
const getUserInfo = async (userID, clubID) => {
	try{
		request('GET', `${baseUrl}/member/${userID}?cid=${clubID}`)
			.then((data) => 
				// 将数据进行处理  返回业务需要的数据结构
				// ...coding
			data)
			.catch((error) => console.log(error));
	}catch(error){
		console.log(error)
	}
}	


export {
	getUserInfo,
}


