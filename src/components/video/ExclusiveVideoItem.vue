<template>
	<!-- 独家放送视频项 -->
	<div class="exclusive-video-item" :style="itemStyle">
		
		<!-- 封面 -->
		<img :src="exclusiveVideo.sPicUrl" class="exclusive-video-cover">
		<!-- 名称 -->
		<div class="exclusive-video-name">{{exclusiveVideo.name}}</div>
		
		<!-- 图标 -->
		<div class="icon-play"><span class="iconfont icon-bofang2"></span></div>
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
			}
		},
		computed:{
			itemStyle(){
				return{
					width: `calc(100%/${this.columns} - 10px)`
				}
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
	}
</style>
