import axios from 'axios';

// 封装ajax请求
const request = (method, url, params) => {
	return new Promise((resolve, reject) => {
		if(typeof params !== 'object') params = {};
		let options = {
			method,
			url,
			timeout: 30000,
	        params: null,
	        data: null,
	        headers: null,
	        withCredentials: true,
	        ...params,
		}
		axios.request(options)
			.then((res) => {resolve(res.data)})
			.catch((error) => {reject(error);console.log(error)})
	})
}

export default request;
