<template>
	<!-- 全球榜单项 -->
	<div class="global-toplist-item" :style="itemStyle">
		<div class="toplist-cover-container">
			<!-- 封面 -->
			<img :src="toplistItem.coverImgUrl" class="toplist-cover">
		
			<!-- 播放量 -->
			<div class="toplist-play-count"><span class="iconfont icon-bofang1"></span> {{playCount}}</div>
			<!-- 播放按钮 -->
			<div class="toplist-play-btn"><span class="iconfont icon-bofang2"></span></div>
		</div>
		
		<!-- 榜单名称 -->
		<div class="toplist-name">{{toplistItem.name}}</div>
	</div>
</template>

<script>
	export default{
		name: 'GlobalToplistItem',
		props:{
			toplistItem:{
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
				return this.toplistItem.playCount >= 100000 ? Math.floor(this.toplistItem.playCount/10000) + '万': this.toplistItem.playCount;
			}
		}
	}
</script>

<style>
	.global-toplist-item{
		margin-bottom: 20px;
		position: relative;
	}
	
	.toplist-cover-container{
		overflow: hidden;
		position: relative;
		margin-bottom: 10px;
	}
	
	.toplist-cover{
		width: 100%;
		display: block;
		border-radius: 5px;
		cursor: pointer;
	}
	
	.toplist-play-btn{
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
	
	.toplist-cover-container:hover>.toplist-play-btn{
		visibility: visible;
	}
	
	.toplist-play-btn>.iconfont{
		color: red;
		font-size: 25px;
		line-height: 40px;
		position: relative;
		left: 2px;
		top: 1px;
	}
	
	.toplist-name{
		line-height: 20px;
		font-size: 14px;
		color: #D0D0D0;
		cursor: pointer;
	}
	
	.toplist-name:hover{
		color: #fff;
	}
	
	.toplist-play-count{
		position: absolute;
		font-size: 12px;
		color: #fff;
		top: 3px;
		right: 7px;
		cursor: pointer;
	}
	
	.toplist-play-count>.iconfont{
		font-size: 12px;
	}
</style>
