<template>
	<!-- 独家放送视频项 -->
	<div class="exclusive-video-item" :style="itemStyle">
		<div class="exclusive-video-cover-container" @click="toVideoDetail">
			<!-- 封面 -->
			<img :src="exclusiveVideo.sPicUrl||exclusiveVideo.cover" class="exclusive-video-cover">
			<!-- 图标 -->
			<div class="icon-play" v-if="playIcon"><span class="iconfont icon-bofang2"></span></div>
			<!-- 播放量 -->
			<div class="exclusive-video-play-count" v-if="playCount"><span class="iconfont icon-bofang1"></span> {{playCount}}</div>
		</div>
		<!-- 名称 -->
		<div class="exclusive-video-name" @click="toVideoDetail">{{exclusiveVideo.name}}</div>
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
			},
			index:{
				type: Number,
				require: true
			}
		},
		computed:{
			itemStyle(){
				let mr = '20px'
				if( (this.index + 1) % this.columns == 0){
					mr = 0
				}
				return{
					width: `calc((100% - ${this.columns - 1} * 20px) / ${this.columns})`,
					marginRight: mr
				}
			},
			playCount(){
				return this.exclusiveVideo.playCount >= 100000 ? Math.floor(this.exclusiveVideo.playCount/10000) + '万': this.exclusiveVideo.playCount;
			}
		},
		methods:{
			toVideoDetail(){
				this.$router.push({
					path: '/videodetail',
					query:{
						id: this.exclusiveVideo.id
					}
				})
			}
		}
	}
	
</script>

<style>
	.exclusive-video-item{
		margin-bottom: 20px;
		
	}
	
	.exclusive-video-cover-container{
		position: relative;
		width: 100%;
		overflow: hidden;
		margin-bottom: 10px;
	}
	
	.exclusive-video-cover{
		width: 100%;
		display: block;
		border-radius: 5px;
		cursor: pointer;
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
