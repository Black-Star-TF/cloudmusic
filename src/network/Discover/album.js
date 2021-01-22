import request from '../request.js'

// 请求专辑详情
export function getAlbumDetail(id){
	return request({
		url: '/album',
		params:{
			id
		}
	})
}

// 请求专辑评论

export function getAlbumComment(id,limit,offset,before=null){
	return request({
		url: '/comment/album',
		params:{
			id,
			limit,
			offset,
			before
		}
	})
}