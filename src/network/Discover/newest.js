import request from '../request.js'

// 请求新歌速递数据
export function getNewestSong(type){
	return request({
		url: '/top/song',
		params:{
			type
		}
	})
}

// 请求新碟上架数据