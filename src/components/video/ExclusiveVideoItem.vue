<template>
	<!-- 独家放送视频项 -->
	<div class="exclusive-video-item" :style="itemStyle">
		
		<!-- 封面 -->
		<img :src="exclusiveVideo.sPicUrl||exclusiveVideo.cover" class="exclusive-video-cover">
		<!-- 图标 -->
		<div class="icon-play" v-if="playIcon"><span class="iconfont icon-bofang2"></span></div>
		<!-- 播放量 -->
		<div class="exclusive-video-play-count" v-if="playCount"><span class="iconfont icon-bofang1"></span> {{playCount}}</div>

		
		<!-- 名称 -->
		<div class="exclusive-video-name">{{exclusiveVideo.name}}</div>
		
		
	</div>
</template>

<script>
	export default {
		name: 'ExclusiveVideo',
		props:{
			exclusiveVideo:{
				type: Object,
				require: true
			},
			columns:{
				default: 3
			},
			playIcon:{
				type: Boolean,
				default: false
			},
			showPlayCount:{
				type: Boolean,
				default: false
			}
		},
		computed:{
			itemStyle(){
				return{
					width: `calc(100%/${this.columns} - 10px)`
				}
			},
			playCount(){
				return this.exclusiveVideo.playCount >= 100000 ? Math.floor(this.exclusiveVideo.playCount/10000) + '万': this.exclusiveVideo.playCount;
			}
		}
	}
	
</script>

<style>
	.exclusive-video-item{
		margin-bottom: 20px;
		position: relative;
	}
	
	.exclusive-video-cover{
		width: 100%;
		display: block;
		border-radius: 5px;
		cursor: pointer;
		margin-bottom: 10px;
	}
	
	.exclusive-video-name{
		font-size: 14px;
		color: #D0D0D0;
		cursor: pointer;
	}
	
	.exclusive-video-name:hover{
		color: #fff;
	}
	
	.icon-play{
		position: absolute;
		width: 20px;
		height: 20px;
		line-height: 19px;
		text-align: center;
		border-radius: 50%;
		top: 10px;
		left: 10px;
		cursor: pointer;
		background-color: rgba(0,0,0,.3);
		box-shadow: 0 0 1px 1px #ccc;
	}
	
	.icon-play>.iconfont{
		font-size: 14px;
		color: #fff;
		position: relative;
		left: 1px;
		line-height: 19px;
	}
	
	.exclusive-video-play-count{
		position: absolute;
		font-size: 12px;
		color: #fff;
		top: 3px;
		right: 7px;
		cursor: pointer;
		transition: all .1s linear .3s; 
	}
	
	.exclusive-video-play-count>.iconfont{
		font-size: 12px;
	}
</style>
