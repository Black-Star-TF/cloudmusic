import request from '../request.js'

// 请求推荐页轮播图数据
export function getBanner(){
	 return request({
		url: '/banner'
	})
}

// 请求推荐歌单数据
export function getRecommendPlaylist(){
	return request({
		url: '/personalized',
		params:{
			limit: 10
		}
	})
}

// 请求独家放送入口数据
export function getExclusiveVideo(){
	 return request({
		url: '/personalized/privatecontent'
	})
}


// 请求推荐mv数据
export function getRecommendMV(){
	 return request({
		url: '/personalized/mv'
	})
}

// 请求推荐电台数据
export function getRecommendDJProgram(){
	 return request({
		url: '/dj/personalize/recommend'
	})
}