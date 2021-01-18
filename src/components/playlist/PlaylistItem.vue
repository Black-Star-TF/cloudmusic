<template>
	<!-- 歌单项组件 -->
	<div class="playlist-item" :style="itemStyle">
		<!-- 歌单封面 -->
		<img :src="playlist.picUrl" class="playlist-cover">
		<!-- 歌单名称 -->
		<div class="playlist-name">{{playlist.name}}</div>
		<!-- 播放量 -->
		<div class="playlist-play-count"><span class="iconfont icon-bofang1"></span> {{playCount}}</div>
	</div>
</template>

<script>
	export default {
		name: 'PlaylistItem',
		props:{
			playlist:{
				type: Object,
				require: true
			},
			columns:{
				default: 5
			}
		},
		computed:{
			itemStyle(){
				return{
					width: `calc(100%/${this.columns} - 10px)`
				}
			},
			playCount(){
				return this.playlist.playCount >= 100000 ? Math.floor(this.playlist.playCount/10000) + '万': this.playlist.playCount;
			}
		}
	}
	
</script>

<style>
	.playlist-item{
		margin-bottom: 20px;
		position: relative;
	}
	
	.playlist-cover{
		width: 100%;
		display: block;
		border-radius: 5px;
		margin-bottom: 5px;
		cursor: pointer;
	}
	
	.playlist-name{
		font-size: 14px;
		color: #D0D0D0;
		cursor: pointer;
	}
	
	.playlist-name:hover{
		color: #fff;
	}
	
	.playlist-play-count{
		position: absolute;
		font-size: 12px;
		color: #fff;
		top: 3px;
		right: 7px;
		cursor: pointer;
	}
	
	.playlist-play-count>.iconfont{
		font-size: 12px;
	}
</style>
