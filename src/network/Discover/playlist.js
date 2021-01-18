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