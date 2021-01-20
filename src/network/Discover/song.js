import request from '../request.js'

// 请求歌曲信息
export function getSongDetail(ids){
	return request({
		url: '/song/detail',
		params:{
			ids
		}
	})
}