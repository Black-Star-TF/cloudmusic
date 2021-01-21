import request from '../request.js'

// 请求电台轮播图数据
export function getDJBanner(){
	return request({
		url: '/dj/banner'
	})
}

// 请求付费精品电台
export function getDJPay(limit=4,offset=0){
	return request({
		url: '/dj/paygift',
		params:{
			limit,
			offset
		}
	})
}

// 请求电台分类
export function getDJCategory(){
	return request({
		url: '/dj/catelist'
	})
}

// 请求电台分类推荐数据
export function getDJCategoryRecommend(type){
	return request({
		url: '/dj/recommend/type',
		params:{
			type
		}
	})
}

// 请求电台详情
export function getDJDetail(rid){
	return request({
		url: '/dj/detail',
		params:{
			rid
		}
	})
}
