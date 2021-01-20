import request from '../request.js'

// 请求最新MV数据
export function getNewestMV(area,limit){
	return request({
		url: '/mv/first',
		params:{
			limit,
			area
		}
	})
}

// 请求全部MV
export function getTotalMV(limit,offset=0,order='最热',type=null,area=null){
	return request({
		url: '/mv/all',
		params:{
			limit,
			area,
			order,
			offset,
			type
		}
	})
}

// 请求网易出品MV
export function getExclusiveMV(limit){
	return request({
		url: '/mv/exclusive/rcmd',
		params:{
			limit
		}
	})
}

// 请求mv排行榜
export function getMVToplist(area,limit){
	return request({
		url: '/top/mv',
		params:{
			limit,
			area
		}
	})
}
// 请MVurl
export function getMVUrl(id){
	return request({
		url: '/mv/url',
		params:{
			id
		}
	})
}

// 请求MV详情数据
export function getMVDetail(mvid){
	return request({
		url: '/mv/detail',
		params:{
			mvid
		}
	})
}

// 请求mv点赞转发评论数数据
export function getMVInfo(mvid){
	return request({
		url: '/mv/detail/info',
		params:{
			mvid
		}
	})
}

// 请求mv评论数据
export function getMVComment(id,limit=20,offset=0,before=null){
	return request({
		url: '/comment/mv',
		params:{
			id,       //资源 id
			limit,   //取出评论数量 , 默认为 20
			offset,   // 偏移数量 , 用于分页 
			before    //分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
		}
	})
}