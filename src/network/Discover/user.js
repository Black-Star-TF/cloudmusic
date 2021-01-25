import request from '../request.js'

// 获取用户详情
export function getUserDetail(uid){
	return request({
		url: '/user/detail',
		params: {
			uid
		}
	})
}