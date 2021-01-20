<template>
	<div class="playlist-detail-header-container clearfix">
		
		<!-- 歌单头图 -->
		<img :src="playlist.coverImgUrl" class="playlist-detail-header-img">
		
		<!-- 详情区域 -->
		<div class="playlist-detail-header-info">
			<!-- 歌单名称 -->
			<div class="playlist-name"><span class="playlist-type">{{playlistType}}</span>{{playlist.name}}</div>
			
			<!-- 歌单作者 -->
			<div class="playlist-create-info">
				<img :src="creator.avatarUrl" class="playlist-creator-avatar">
				<img :src="creator.avatarDetail.identityIconUrl" class="playlist-creator-identityIconUrl"  v-if="creator.avatarDetail">
				<span class="playlist-creator-nickname">{{creator.nickname}}</span>
				<span class="playlist-create-date">{{createDate}}</span>
			</div>
			
			<!-- TODO 对歌单的操作 -->
			<div class="playlist-action">
				<div class="playlist-action-item play">播放全部</div>
				<div class="playlist-action-item">收藏</div>
				<div class="playlist-action-item">分享</div>
				<div class="playlist-action-item">下载全部</div>
			</div>
			
			
			<!-- 歌单标签 -->
			<div class="playlist-tags">
				标签：<span class="playlist-tag" v-for="(tag,index) in playlist.tags"><span class="tagname" @click="tagClick(tag)">{{tag}}</span>{{(index < playlist.tags.length-1) ? ' / ' : ''}}</span>
			</div>
			
			<!-- 歌单播放相关信息 -->
			<div class="playlist-play-info">
				歌曲：<span class="playlist-song-count">{{playlist.trackCount}}</span>
				播放：<span class="playlist-playcount">{{Math.floor(playlist.playCount/10000)+"万"}}</span>
			</div>
			
			<!-- 歌单简介 -->
			<div class="playlist-description" :class="{'show': showDescription}">
				<div class="playlist-description-content"><span>简介：</span><span class="text">{{playlist.description}}</span></div>
				<!-- 收起/展开简介按钮 -->
				<div class="btn" @click="changeDescState" :class="{'show': showDescription}"></div>
			</div>
		</div>
		
		
		
	</div>
</template>

<script>
	import {formatDate1} from '@/assets/js/tools.js'
	export default{
		name: 'PlaylistDetailHeader',
		data(){
			return{
				showDescription: false
			}
		},
		props:{
			playlist:{
				require:true
			},
			type:{
				type: String,
				require: true
			}
		},
		computed:{
			playlistCategory(){
				return this.playlist.category||''
			},
			createDate(){
				return formatDate1(this.playlist.createTime)+'创建'
			},
			playlistType(){
					return "歌单";
			},
			creator(){
				return this.playlist.creator
			}
		},
		methods:{
			tagClick(tag){
				console.log(tag);
				this.$router.push({
					path: '/discover/playlist',
					query:{
						tag
					}
				})
			},
			changeDescState(){
				this.showDescription = !this.showDescription
			}
		}
	}
</script>

<style>
	.playlist-detail-header-container{
		font-size: 13px;
		vertical-align:text-bottom;
		color: #fff;
		cursor: default;
		width: 95%;
		margin: 40px auto;
		position: relative;
		color: #d0d0d0;
	}
	
	.playlist-detail-header-img{
		display: block;
		width: 180px;
		height: 180px;
		float: left;
		border-radius: 3%;
	}
	
	.playlist-detail-header-info{
		width: calc(100% - 200px);
		margin-left: 20px;
		float: left;
	}
	
	.playlist-detail-header-info>.playlist-name{
		font-size: 25px;
		font-weight: 600;
		color: #d0d0d0;
		line-height: 30px;
		height: 30px;
		cursor: default;
	}
	.playlist-detail-header-info>.playlist-name>.playlist-type{
		position: relative;
		top: -4px;
		display: inline-block;
		height: 20px;
		box-sizing: border-box;
		padding: 0 3px;
		margin-right: 5px;
		line-height: 18px;
		font-size: 13px;
		color: red;
		border: 1px solid red;
		font-weight: 400;
		border-radius: 3px;
	}
	
	
	.playlist-create-info{
		height: 30px;
		line-height: 30px;
		position: relative;
	}
	
	.playlist-creator-avatar{
		position: relative;
		top: 8px;
		height: 80%;
		border-radius: 50%;
		margin-right: 10px;
	}
	
	.playlist-creator-identityIconUrl{
		bottom: -1px;
		left: 14px;
		height: 40%;
		position: absolute;
	}
	
	.playlist-creator-nickname{
		margin-right: 10px;
		color: #0a98b8;
		cursor: pointer;
	}
	
	.playlist-creator-nickname:hover{
		color: #0bc0e8;
	}
	
	.playlist-create-date{
		color: #777;
	}
	
	.playlist-description{
		width: 100%;
		overflow-y: visible;
		position: relative;
	}
	
	.playlist-description .playlist-description-content{
		width: calc(100% - 50px);
		height: 30px;
		line-height: 30px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: pre;
		position: relative;
	}
	.playlist-description-content .playlist-category{
		display: inline-block;
		height: 17px;
		box-sizing: border-box;
		padding: 0 3px;
		margin-right: 5px;
		line-height: 13px;
		color: red;
		border: 1px solid red;
		font-weight: 400;
		border-radius: 3px;
		cursor: pointer;
	}
	
	.playlist-description .btn{
		position: absolute;
		right: 0;
		top: 5px;
		border: 7px solid transparent;
		border-top-color: #ccc;
		cursor: pointer;
	}
	
	.playlist-description .btn.show{
		border-color: transparent;
		border-bottom-color: #ccc;
	}
	
	.playlist-description.show .playlist-description-content{
		height: auto;
		overflow-y: visible;
		white-space: pre-wrap;
	}
	.playlist-tags,.playlist-play-info,.playlist-description .playlist-description-content{
		height: 20px;
		line-height: 20px;
	}
	
	.playlist-action{
		margin: 15px 0;
		height: 30px;
	}
	
	.playlist-action .playlist-action-item{
		float: left;
		box-sizing: border-box;
		margin-right: 10px;
		height: 30px;
		line-height: 28px;
		padding: 0 15px;
		text-align: center;
		border-radius: 15px;
		font-size: 15px;
		border: 1px solid #666;
		color: #ccc;
	}
	.playlist-action .playlist-action-item:hover{
		background-color: rgba(255,255,255,.05);
		
	}
	
	.playlist-action .playlist-action-item.play{
		background-color: red;
		color: #fff;
	}
	
	.playlist-song-count,.playlist-playcount{
		color: #aaa;
	}
	
	.playlist-description .text{
		color: #777;
	}
	
	.playlist-tag .tagname{
		color: #0a98b8;
		cursor: pointer;
	}
	
	.playlist-tag .tagname:hover{
		color: #0bc0e8;
	}
</style>

