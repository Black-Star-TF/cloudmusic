import request from '../request.js'

// 请求视频详情数据
export function getVideoDetail(id){
	return request({
		url: '/video/detail',
		params:{
			id
		}
	})
}

// 请求视频url
export function getVideoUrl(id){
	return request({
		url: '/video/url',
		params:{
			id
		}
	})
}

// 请求相关视频数据
export function getRelativeVideo(id){
	return request({
		url: '/related/allvideo',
		params:{
			id
		}
	})
}
// 获取视频点赞转发评论数数据
export function getVideoInfo(vid){
	return request({
		url: '/video/detail/info',
		params:{
			vid
		}
	})
}

// 请求视频评论
export function getVideoComment(id,limit=20,offset=0,before=null){
	return request({
		url: '/comment/video',
		params:{
			id,       //资源 id
			limit,   //取出评论数量 , 默认为 20
			offset,   // 偏移数量 , 用于分页 
			before    //分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
		}
	})
}