import request from '../request.js'


// 请求歌单分类数据
export function getPlaylistCategory(){
	return request({
		url: '/playlist/catlist'
	})
}


// 请求热门歌单分类数据
export function getHotCategory(){
	return request({
		url: '/playlist/hot'
	})
}

// 获取歌单（网友精选碟）数据
export function getPlaylist(cat,limit,offset=0,order=null){
	return request({
		url: '/top/playlist',
		params: {
			order,
			cat,
			limit,
			offset
		}
	})
}

// 请求歌单详情数据
export function getPlaylistDetail(id){
	return request({
		url: '/playlist/detail',
		params: {
			id
		}
	})
}

// 请求歌单评论数据
export function getPlaylistComment(id,limit,offset,before=null){
	return request({
		url: '/comment/playlist',
		params: {
			id,
			limit,
			offset,
			before
		}
	})
}

// 获取歌单收藏者
export function getPlaylistSubscriber(id,limit,offset=0){
	return request({
		url: '/playlist/subscribers',
		params:{
			id,
			limit,
			offset
		}
	})
}