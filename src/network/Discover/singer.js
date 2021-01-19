import request from '../request.js'

// 请求歌手分类列表
export function getSingerList(type,area,initial,limit,offset){
	return request({
		url: '/artist/list',
		params:{
			type,
			area,
			initial,
			limit,
			offset
		}
	})
}
