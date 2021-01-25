<template>
	<div class="video-detail-page-contaner">
		<div class="video-detail-page-content">
			
			<!-- 视频详情页主要内容区 -->
			<div class="video-detail-page-main" v-if="videoDetail&&videoInfo">
				
				<!-- 头部 -->
				<div class="video-detail-page-header">
					<span @click="toList">{{title}}</span>
				</div>
				
				<!-- 视频播放窗口 -->
				<video class="video-window" width="100%" :src="videoUrl" controls autoplay></video>
				
				<!-- 视频作者或者主人公 -->
				<div class="video-detail-artist">
					<!-- 头像 -->
					<img :src="creatorAvatar" class="video-detail-artist-avatar" v-if="!isMV">
					<!-- 姓名 -->
					<span v-for="(artist,index) in artistName">
						<span  class="video-detail-artist-name" >{{artist}}</span>
						<span class="delimiter" v-if="index < artistName.length - 1">/</span>
					</span>
				</div>
				
				
				<!-- 视频的一些信息 视频标题、发布时间、播放次数 -->
				<div class="video-detail-title">{{videoDetail.name||videoDetail.title}}</div>
				<div class="video-detail-info">
					<span>发布：{{videoDetail.publishTime}}</span>
					<span>播放：{{playCount}}</span>
				</div>
				
				<!-- 视频标签、分类 -->
				<div class="video-detail-group" v-if="videoDetail.videoGroup.length > 0">
					<span class="video-detail-group-item" v-for="item in videoDetail.videoGroup">{{item.name}}</span>
				</div>
				
				
				<!-- 对视频的操作: 点赞、收藏、分享 下载 举报 -->
				<div class="video-options">
					<div class="praise video-option-item">赞({{videoInfo.likedCount}})</div>
					<div class="subscribe video-option-item">收藏({{videoDetail.subscribeCount||videoDetail.subCount}})</div>
					<div class="share video-option-item">分享({{videoInfo.shareCount}})</div>
					<div class="download video-option-item">下载MV</div>
					<span class="report">举报</span>
				</div>
				<span class="video-comment"></span>
				
				<!-- 评论模块 -->
				<!-- 评论输入框 -->
				<div class="mine-comment">
					<div class="title">评论<span class="comment-count">（{{videoInfo.commentCount}}）</span></div>
					<!-- 评论输入框组件 -->
					<InputBox></InputBox>
				</div>
				
				<!-- 精彩评论 -->
				
				<div class="comment-container" v-if="hotCommentList&&hotCommentList.length>0">
					<div class="title">精彩评论</div>
					<div class="comment-content">
						<CommentItem v-for="item in hotCommentList" :commentItem="item"></CommentItem>
					</div>
				</div>
				
				<!-- 全部评论 -->
				
				<div class="comment-container">
					<div class="title">最新评论</div>
					<div class="comment-content" v-if="commentList">
						<CommentItem v-for="item in commentList" :commentItem="item"></CommentItem>
						<!-- 翻页按钮 -->
						<PageNumBtn v-if="commentList&&totalPage>=1" :pageNum="pageNum" :totalPage="totalPage" :range="5" @pagebtnclick="skip"></PageNumBtn>
					</div>
					<Loading v-else></Loading>
				</div>
			</div>
			
			<!-- 相关推荐模块 -->
			<div class="video-detail-page-about" v-if="relativeVideoList">
				<div class="video-detail-page-title">相关视频</div>
				<RelativeVideo v-for="(item,index) in relativeVideoList" :relativeVideoItem="item"></RelativeVideo>
			</div>
				
		</div>
	</div>
</template>

<script>
	import RelativeVideo from '@/components/video/RelativeVideo'
	import {getVideoUrl,getVideoDetail,getRelativeVideo,getVideoInfo,getVideoComment} from '@/network/Video/video'
	import {getMVInfo,getMVDetail,getMVUrl,getMVComment} from '@/network/Video/mv'
	import CommentItem from '@/components/common/CommentItem'
	import PageNumBtn from '@/components/common/PageNumBtn';
	import Loading from '@/components/common/Loading';
	import InputBox from '@/components/common/InputBox';
	export default {
		name: 'VideoDetail',
		data(){
			return{
				videoUrl: null,
				videoId: null,
				videoDetail: null,
				relativeVideoList: null,
				videoInfo: null,
				isMV: null,
				letterNum: 140,
				hotCommentList: null,
				commentList: null,
				pageNum: 1,
				limit:  20,
				commentCount: 0
			}
		},
		components:{
			RelativeVideo,
			CommentItem,
			PageNumBtn,
			Loading,
			InputBox
		},
		computed:{
			offset(){
				return this.limit*(this.pageNum-1)
			},
			totalPage(){
				return Math.ceil(this.commentCount/this.limit)
			},
			creatorAvatar(){
				return this.videoDetail.creator.avatarUrl
			},
			title(){
				return this.isMV ? 'MV详情 ' : '视频详情'
			},
			artistName(){
				let arr = []
				// 如果是mv，
				if(this.isMV){
					for(let item of this.videoDetail.artists){
						arr.push(item.name)
					}
				}else{
					// 如果是视频
					arr.push(this.videoDetail.creator.nickname)
				}
				return arr
			},
			playCount(){
				if(this.isMV){
					return this.videoDetail.playCount + '次'
				}else{
					return this.videoDetail.playTime + '次'
				}
			}
		},
		methods:{
			skip(pageNum){
				this.pageNum = pageNum
				this.commentList = null
				this.getTotalCommentData()
			},
			input(e){
				this.letterNum = 140 - e.target.value.length
			},
			toList(){
				if(this.isMV){
					this.$router.push('/video/mv')
				}else{
					this.$router.push('/video/video')
				}
			},
			getFocus(){
				this.$refs.comment.focus()
			},
			getData(){
				// 视频页面打开，检查音频是否播放，如果正在播放，则暂停
				// 获取路由参数
				if(this.$route.query.id){
					this.videoId = this.$route.query.id
				}
				
				// 判断id为视频id还是mvid
				getMVUrl(this.videoId).then(res=>{
					if(res.code == 200){
						this.isMV = true
					}else{
						this.isMV = false
					}
				}).then(()=>{
					
					// 如果是mvid，则请求mv相关信息
					if(this.isMV){
						// 请求mv详情数据
						getMVDetail(this.videoId).then(res=>{
							this.videoDetail = res.data
						})
						// 请求mv点赞转发评论数
						getMVInfo(this.videoId).then(res=>{
							this.videoInfo = res
						})
						
						// 请求mv url
						getMVUrl(this.videoId).then(res=>{
							this.videoUrl = res.data.url 
						})
						
						// 获取mv评论
						this.getTotalCommentData()
					}else{
						// 如果是视频id则请求视频相关信息
						
						// 获取视频详情数据
						getVideoDetail(this.videoId).then(res=>{
							this.videoDetail = res.data
						})
						
						// 获取视频点赞转发评论数数据
						getVideoInfo(this.videoId).then(res=>{
							this.videoInfo = res
						})
						
						//获取视频url
						getVideoUrl(this.videoId).then(res=>{
							this.videoUrl = res.urls[0].url
						})
						
						// 获取视频评论
						this.getTotalCommentData()
					}
				})
				
				// 请求相关视频
				getRelativeVideo(this.videoId).then(res=>{
					this.relativeVideoList = res.data
				}).catch(err=>{
					console.log('相关视频请求失败');
				})
			},
			// 请求所有视频评论
			getTotalCommentData(){
				if(this.isMV){
					// mv评论
					getMVComment(this.videoId,this.limit,this.offset).then(res=>{
						
						this.commentList = res.comments
						if(!this.commentCount){
							this.commentCount = res.total
						}
						if(!this.hotCommentList){
							this.hotCommentList = res.hotComments
						}
					})
				}else{
					// 视频评论
					getVideoComment(this.videoId,this.limit,this.offset).then(res=>{
						this.commentList = res.comments
						if(!this.commentCount){
							this.commentCount = res.total
						}
						if(!this.hotCommentList){
							this.hotCommentList = res.hotComments
						}
					})
				}
			}
		},
		created(){
			this.getData();
		},
		watch: {
			$route(to, from) {
				//将数据重新加载
				this.getData();
			}
		},
	}
	
</script>

<style>
	.video-detail-page-contaner{
		color: #d0d0d0;
		width: 100vw;
		height: calc(100vh - 60px);
		position: fixed;
		top: 60px;
		left: 0;
		background-color: #2b2b2b;
		z-index: 1000;
		overflow: auto;
	}
	
	/* 设置滚动条样式 */
	.video-detail-page-contaner::-webkit-scrollbar{
		width: 5px;
		height: 1px;
	}
	
	 /*滚动条里面小方块*/
	.video-detail-page-contaner::-webkit-scrollbar-thumb{
		border-radius: 10px;
		box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: #3c3c3c;
	}
		
	
	.video-detail-page-content{
		width: 995px;
		margin: 0 auto;
	}
	
	.video-detail-page-header{
		width: 100%;
		height: 60px;
		line-height: 60px;
		font-size: 16px;
		font-weight: 600;
		color: #ccc;
	}
	
	.video-window{
		outline: none;
		width: 100%;
		height: 350px;
		background-color: #000;
	}
	
	.video-detail-page-header>span{
		cursor: pointer;
		height: 100%;
	}
	
	.video-detail-page-main{
		width: 68%;
		float: left;
	}
	
	.video-detail-title{
		width: 100%;
		font-size: 22px;
		font-weight: 600;
		height: 40px;
		line-height: 40px;
		color: #ddd;
	}
	
	.video-detail-artist{
		height: 50px;
		line-height: 50px;
		margin: 10px 0;
		color: #aaa;
	}
	
	.video-detail-artist>span{
		display: inline-block;
	}
	
	.video-detail-artist-avatar{
		margin: 5px;
		height: 40px;
		width: 40px;
		border-radius: 50%;
		float: left;
	}
	
	.video-detail-group{
		width: 100%;
		height: 30px;
		font-size: 12px;
		line-height: 30px;
		color: #ddd;
	}
	
	.video-detail-group-item{
		display: inline-block;
		margin: 5px;
		cursor: pointer;
	}
	
	.video-options{
		width: 100%;
		margin: 20px 0;
	}
	
	.video-options>.report{
		display: inline-block;
		float: right;
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		color: #777;
		text-decoration: underline;
		cursor: default;
	}
	
	.video-options>.report:hover{
		color: #999;
	}
	
	.video-option-item{
		display: inline-block;
		height: 30px;
		border: 1px solid #555;
		border-radius: 15px;
		line-height: 30px;
		text-align: center;
		font-size: 16px;
		padding: 0 20px;
		margin-right: 2%;
		cursor: pointer;
	}
	
	.video-option-item:hover{
		background-color: rgba(255,255,255,.05);
	}
	.video-detail-info{
		height: 30px;
		line-height: 30px;
		font-size: 12px;
		color: #666;
	}
	
	.video-detail-info>span{
		display: inline-block;
		margin-right: 3%;
	}
	
	.video-detail-page-main>.video{
		width: 100%;
	}
	
	.video-detail-page-about{
		width: 30%;
		height: 300px;
		float: right;
	}
	
	.video-detail-page-title{
		width: 100%;
		height: 60px;
		line-height: 60px;
		font-size: 16px;
		font-weight: 600;
		color: #ccc;
	}
	
	.mine-comment{
		width: 100%;
		margin-top: 40px;
		position: relative;
	}
	.mine-comment>.title{
		font-size: 20px;
		font-weight: 600;
		height: 40px;
		line-height: 40px;
	}
	
	/* 精彩评论模块样式 */
	.comment-container{
		width: 100%;
		margin: 20px 0;
	}
	
	.comment-container>.title{
		width: 100%;
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		font-weight: 600;
	}
</style>
