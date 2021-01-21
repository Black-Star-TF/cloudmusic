<template>
	<div class="comment-item-container clearfix">
		<img :src="commentItem.user.avatarUrl" class="comment-user-avater">
		<div class="right">
			<div class="comment-content">
				<!-- 评论用户 -->
				<span class="user-name">{{commentItem.user.nickname}}：</span>
				<!-- 评论内容 -->
				<span class="content" @mousedown.stop>{{commentItem.content}}</span>
			</div>
			<!-- 追加评论 -->
			<div class="comment-reply" v-for="item in commentItem.beReplied">
				<!-- 评论用户 -->
				<span class="reply-user-name" v-if="item.status==0">{{item.user.nickname}}：</span>
				<!-- 评论内容 -->
				<span class="reply-content" v-if="item.status==0" @mousedown.stop>{{item.content}}</span>
				<div class="shield-commend" v-else>该评论已删除</div>
			</div>
			
			<div class="comment-time">
				<!-- 评论时间 -->
				{{time}}
				<!-- 评论操作 、点赞 分享 评论 举报 -->
				<div class="comment-operation">
					<span class="report"><span class="comment-operation-item">举报</span><span class="delimiter">|</span></span><span class="comment-operation-item iconfont icon-zanpress"> {{commentItem.likedCount}}</span>|<span class="comment-operation-item iconfont icon-fenxiang"></span>|<span class="comment-operation-item iconfont icon-pinglun"></span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {formatDate2} from '@/assets/js/tools.js'
	
	export default {
		name: 'CommentItem',
		props:{
			commentItem:{
				type: Object,
				require: true
			}
		},
		computed:{
			time(){
				// 评论发表事件
				return formatDate2(this.commentItem.time)
			}
		}
	}
	
</script>

<style>
	
	.comment-item-container{
		width: 100%;
		border-bottom: 1px solid #333;
		cursor: default;
	}
	
	.comment-user-avater{
		cursor: pointer;
		width: 35px;
		height: 35px;
		border-radius: 50%;
		margin: 25px 0;
		float: left;
	}
	
	.comment-item-container>.right{
		float: left;
		width: calc(100% - 50px);
		margin-top: 25px;
		margin-left: 10px;
		overflow: visible;
	}
	
	.comment-item-container>.right>.comment-content{
		margin-top: -5px;
		width: 100%;
		line-height: 20px;
		font-size: 12px;
	}
		
	.comment-item-container>.right>.comment-reply{
		width: 100%;
		min-height: 30px;
		line-height: 30px;
		font-size: 12px;
		box-sizing: border-box;
		background-color: rgba(255,255,255,.04);
		margin: 10px 0;
		padding-left: 8px;
	}
	
	.comment-item-container>.right>.comment-reply>.shield-commend{
		width: 100%;
		text-align: center;
		height: 30px;
		line-height: 30px;
		color: #999;
	}
	
	.comment-item-container>.right>.comment-reply>.reply-user-name{
		color: #85B9E6;
		cursor: pointer;
	}
		
	.comment-item-container>.right>.comment-reply>.reply-content{
		color: #aaa;
	}
		
	.comment-item-container>.right>.comment-content>.user-name{
		color: #85B9E6;
		cursor: pointer;
	}
	
	.comment-item-container>.right>.comment-content>.content{
		color: #999;
	}
	
		
	.comment-item-container>.right>.comment-time{
		width: 100%;
		height: 20px;
		line-height: 20px;
		font-size: 12px;
		color: #666;
		margin-top: 5px;
		margin-bottom: 15px;
	}
	
	.comment-item-container>.right>.comment-time>.comment-operation{
		float: right;
		height: 100%;
	}
	
	.comment-item-container>.right>.comment-time>.comment-operation .comment-operation-item{
		padding: 0 10px;
		font-weight: 700;
		cursor: pointer;
		font-size: 12px;
	}
	.comment-item-container>.right>.comment-time>.comment-operation .comment-operation-item:hover{
		color: #999;
	}
	
	.comment-item-container>.right>.comment-time>.comment-operation .report{
		display: none;
	}
	
	.comment-item-container:hover >.right>.comment-time>.comment-operation .report{
		display: inline;
	}
</style>
