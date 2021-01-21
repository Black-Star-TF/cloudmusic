<template>
	<!-- 全球榜单项 -->
	<div class="global-top-list-item" :style="itemStyle">
		<div class="top-list-cover-container">
			<!-- 封面 -->
			<img :src="toplistItem.coverImgUrl" class="top-list-cover" @click="toDetail">
		
			<!-- 播放量 -->
			<div class="top-list-play-count"><span class="iconfont icon-bofang1"></span> {{playCount}}</div>
			<!-- 播放按钮 -->
			<div class="top-list-play-btn"><span class="iconfont icon-bofang2"></span></div>
		</div>
		
		<!-- 榜单名称 -->
		<div class="top-list-name" @click="toDetail">{{toplistItem.name}}</div>
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
		},
		methods:{
			toDetail(){
				this.$router.push({
					path: '/playlistdetail',
					query: {
						id: this.toplistItem.id
					}
				})
			}
		}
	}
</script>

<style>
	.global-top-list-item{
		margin-bottom: 20px;
		position: relative;
	}
	
	.top-list-cover-container{
		overflow: hidden;
		position: relative;
		margin-bottom: 10px;
	}
	
	.top-list-cover{
		width: 100%;
		display: block;
		border-radius: 5px;
		cursor: pointer;
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
	
	.top-list-cover-container:hover>.top-list-play-btn{
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
	
	.top-list-name{
		line-height: 20px;
		font-size: 14px;
		color: #D0D0D0;
		cursor: pointer;
	}
	
	.top-list-name:hover{
		color: #fff;
	}
	
	.top-list-play-count{
		position: absolute;
		font-size: 12px;
		color: #fff;
		top: 3px;
		right: 7px;
		cursor: pointer;
	}
	
	.top-list-play-count>.iconfont{
		font-size: 12px;
	}
</style>
