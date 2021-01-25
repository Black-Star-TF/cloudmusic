<template>
	<div class="top-list-item-container clear-fix">
		<div class="top-list-item-cover-container">
			<!-- 封面图片 -->
			<img :src="toplistItem.coverImgUrl||toplistItem.coverUrl" class="top-list-item-img" @click="toPlaylistDetail">
			<!-- 播放按钮 -->
			<div class="top-list-play-btn"><span class="iconfont icon-bofang2"></span></div>
		</div>
		
		<div class="top-list-item-top5">
			<div class="song-of-top-list-item" v-for="(song,index) in toplistItem.tracks">
				<span class="song-index">Top{{index+1}}</span>
				<span class="song-name">{{song.first}}</span>
				<span class="song-artist">{{song.second}}</span>
			</div>
			<div class="more-of-top-list-item" @click="toPlaylistDetail">查看全部></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'OfficialToplistItem',
		props:{
			toplistItem:{
				type: Object,
				require: true
			}
		},
		methods:{
			toPlaylistDetail(){
				this.$router.push({
					path: '/playlistdetail',
					query: {
						id: this.toplistItem.id
					}
				})
			},
			play(){
				
			}
		}
	}
	
</script>

<style>
	
	.top-list-item-container{
		width: 100%;
	}
	.top-list-item-cover-container{
		position: relative;
		margin: 20px;
		border-radius: 5px;
		float: left;
		width: 150px;
		height: 150px;
	}
	.top-list-play-btn{
		position: absolute;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background-color: rgba(255,255,255,.8);
		top: 50%;
		left: 50%;
		margin-top: -20px;
		margin-left: -20px;
		text-align: center;
		cursor: pointer;
		visibility: hidden;
		z-index: 2;
	}
	
	.top-list-item-cover-container:hover>.top-list-play-btn{
		visibility: visible;
	}
	
	.top-list-play-btn>.iconfont{
		color: red;
		font-size: 25px;
		line-height: 40px;
		position: relative;
		left: 2px;
		top: 1px;
	}
	
	.top-list-item-img{
		width: 100%;
		display: block;
		border-radius: 5px;
	}
	
	.top-list-item-top5{
		width: 100%;
		float: left;
		width: calc(100% - 190px);
		margin-top: 20px;
	}
	
	.song-of-top-list-item{
		height: 150px;
		height: calc(150px/5);
		line-height: calc(150px/5);
	}
	
	.song-of-top-list-item:nth-of-type(2n-1){
		background-color: rgba(255,255,255,.03);
	}
	
	.song-index{
		font-size: 16px;
		display: inline-block;
		float: left;
		color: red;
		margin: 0 10px;
	}
	
	.song-name{
		font-size: 14px;
		display: inline-block;
		float: left;
		color: #ddd;
	}
	
	.song-artist{
		display: inline-block;
		float: right;
		padding-right: 20px;
		font-size: 14px;
		color: #999;
	}
	
	.more-of-top-list-item{
		height: calc(150px/5);
		line-height: calc(150px/5);
		font-size: 14px;
		color: #999;
		margin-left: 10px;
		cursor: pointer;
	}
	
	.more-of-top-list-item:hover{
		color: #ddd;
	}
</style>
