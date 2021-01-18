import axios from 'axios'

const instance = axios.create({
	baseURL: 'http://localhost:3000',
	timeout: 5000
})

// 添加拦截器
instance.interceptors.request.use(config=>{
	return config
},err=>{
	return Promise.reject(err)
})

instance.interceptors.response.use(res=>{
	return res.data
},err=>{
	return Promise.reject(err)
})


// 导出
export default instance