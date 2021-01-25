import request from '../request.js'

// 请求搜索结果
export function search(keywords,type,limit,offset){
	return request({
		url: '/cloudsearch',
		params:{
			keywords,
			limit,
			offset,
			type
		}
	})
}

// 搜索最佳匹配
export function bestMatch(keywords){
	return request({
		url: '/search/multimatch',
		params:{
			keywords
		}
	})
}