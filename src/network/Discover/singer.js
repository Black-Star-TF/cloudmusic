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

// 请求歌手详情
export function getSingerDetail(id){
	return request({
		url: '/artist/detail',
		params:{
			id
		}
	})
}

// 请求歌手专辑

export function getSingerAlbum(id,limit,offset){
	return request({
		url: '/artist/album',
		params:{
			id,
			limit,
			offset
		}
	})
}

// 请求歌手mv
export function getSingerMV(id,limit,offset){
	return request({
		url: '/artist/mv',
		params:{
			id,
			limit,
			offset
		}
	})
}

// 请求歌手介绍

export function getSingerDesc(id){
	return request({
		url: '/artist/desc',
		params:{
			id
		}
	})
}

// 请求相似歌手
export function getSimilarSinger(id){
	return request({
		url: '/simi/artist',
		params:{
			id
		}
	})
}