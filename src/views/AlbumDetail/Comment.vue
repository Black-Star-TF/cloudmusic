<template>
	<div class="album-comment">
		<!-- 评论输入框 -->
		<InputBox></InputBox>
		<!-- 精彩评论 -->
		
		<div class="comment-container" v-if="hotCommentList&&hotCommentList.length>0" >
			<div class="title">精彩评论</div>
			<div class="comment-content">
				<CommentItem v-for="item in hotCommentList" :commentItem="item"></CommentItem>
			</div>
		</div>
		
		<!-- 全部评论 -->
		
		<div class="comment-container" v-if="commentList&&commentList.length>0">
			<div class="title">最新评论</div>
			<div class="comment-content">
				<CommentItem v-for="item in commentList" :commentItem="item"></CommentItem>
				<!-- 翻页按钮 -->
				<PageNumBtn v-if="commentList&&totalPage>=1" :pageNum="pageNum" :totalPage="totalPage" :range="5" @pagebtnclick="skip"></PageNumBtn>
			</div>
		</div>
		<!-- <Loading v-else></Loading> -->
	</div>
</template>

<script>
	import {getAlbumComment} from '@/network/Discover/album'
	import InputBox from '@/components/common/InputBox'
	import CommentItem from '@/components/common/CommentItem';
	import PageNumBtn from '@/components/common/PageNumBtn';
	import Loading from '@/components/common/Loading';
	export default {
		name: 'Comment',
		data(){
			return {
				id: null,
				pageNum: 1,
				limit: 40,
				hotCommentList: null,
				commentList: null,
				commentCount: null
			}
		},
		components:{
			CommentItem,
			PageNumBtn,
			Loading,
			InputBox
		},
		computed:{
			offset(){
				return this.limit * (this.pageNum - 1);
			},
			totalPage(){
				return Math.ceil(this.commentCount/this.limit)
			}
		},
		props:{
			album: {
				type: Object,
				require: true
			}
		},
		methods:{
			skip(pageNum){
				this.pageNum = pageNum
				this.commentList = null
				this.getPlaylistCommentData()
			},
			getAlbumCommentData(){
				getAlbumComment(this.id,this.limit,this.offset).then(res=>{
					if(!this.hotCommentList){
						this.hotCommentList = res.hotCommentList
					}
					
					if(!this.commentCount){
						this.commentCount = res.total
					}
					this.commentList = res.comments
					
				})
			}
		},
		created(){
			this.id = this.album.id;
			this.getAlbumCommentData()
		}
	}
	
</script>

<style>
	
	.album-comment{
		width: 95%;
		margin: 0 auto;
	}
	
	.comment-container{
		width: 100%;
		margin: 20px 0;
	}
	
	.comment-container>.title{
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		font-weight: 600;
		color: #d0d0d0;
	}
</style>
