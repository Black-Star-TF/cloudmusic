import request from '../request.js'

// 请求所有榜单摘要数据
export function getAllToplistSummary(){
	return request({
		url: '/toplist/detail'
	})
}