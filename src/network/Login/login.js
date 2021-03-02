import request from "../request.js"

// 登录
export function login(phone,md5_password){
	return request({
		url: '/login/cellphone',
		params:{
			phone,
			md5_password
		}
	})
}

// 检查登录状态
export function loginStatus(){
	return request({
		url: '/login/status'
	})
}

// 退出登录
export function logout(){
	return request({
		url: '/logout'
	})
}

// 获取用户歌单
export function getUserPlaylist(id){
	return request({
		url: '/user/playlist',
		params:{
			uid: id
		}
	})
}