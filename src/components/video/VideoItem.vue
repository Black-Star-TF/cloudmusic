<template>
	<div class="video-item" :style="itemStyle">
		
		<div class="video-cover-container" @click="toVideoDetail">
			<!-- 视频封面 -->
			<img :src="video.picUrl||video.cover||video.imgurl16v9" class="video-cover-img" @load="load" ref="img">
			
			<!-- 播放量 -->
			<div class="video-play-count"><span class="iconfont icon-bofang1"></span> {{playCount}}</div>
			
			<!-- 文案 -->
			<div class="video-copywriter" v-if="copywriter">{{video.copywriter}}</div>
		</div>
		
		
		<!-- 视频名称 -->
		<div class="video-name" @click="toVideoDetail">{{video.name}}</div>
		<!-- 视频作家 -->
		<div class="video-composer">
			<span v-for="(artist,index) in video.artists"><span class="video-composer-name">{{artist.name}}</span><span class="dilimiter" v-if="index < video.artists.length -1"> / </span></span>
		</div>
		
	</div>
</template>

<script>
	export default {
		name: 'VideoItem',
		props:{
			video:{
				type: Object,
				require: true
			},
			columns:{
				default: 3
			},
			copywriter:{
				type: Boolean,
				default: false
			},
			index:{
				type: Number,
				require: true
			}
		},
		methods:{
			load(){
				if(this.$refs.img){
					// this.$refs.img.height = 0.56 * this.$refs.img.width;
				}
			},
			toVideoDetail(){
				this.$router.push({
					path: '/videodetail',
					query:{
						id: this.video.id
					}
				})
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
				return this.video.playCount >= 100000 ? Math.floor(this.video.playCount/10000) + '万': this.video.playCount;
			}
		}
	}
	
</script>

<style>
	.video-item{
		margin-bottom: 20px;
	}
	
	.video-cover-container{
		width: 100%;
		position: relative;
		overflow: hidden;
	}
	
	.video-cover{
		width: 100%;
		height: 59%;
	}
	.video-cover-img{
		width: 100%;
		display: block;
		cursor: pointer;
		border-radius: 5px;
		margin-bottom: 5px;
	}
	
	.video-name{
		height: 20px;
		line-height: 20px;
		font-size: 14px;
		color: #D0D0D0;
		cursor: pointer;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.video-name:hover{
		color: #fff;
	}
	
	.video-composer{
		font-size: 12px;
	}
	
	.video-composer .dilimiter{
		color: #ccc;
	}
	
	.video-composer-name{
		color: #878787;
		cursor: pointer;
	}
	.video-composer-name:hover{
		color: #b5b5b5;
	}
	
	.video-play-count{
		position: absolute;
		font-size: 12px;
		color: #fff;
		top: 3px;
		right: 7px;
		cursor: pointer;
		transition: all .1s linear .3s; 
	}
	
	.video-play-count>.iconfont{
		font-size: 12px;
	}
	
	.video-copywriter{
		width: 100%;
		text-indent: 10px;
		height: 30px;
		position: absolute;
		top: -30px;
		background-color: rgba(0,0,0,.5);
		color: #fff;
		font-size: 14px;
		line-height: 30px;
		transition: top .18s linear .3s; 
		cursor: pointer;
	}
	
	.video-cover-container:hover > .video-copywriter{
		top: 0;
	}
	
	.video-cover-container:hover > .video-play-count{
		visibility: hidden;
	}

</style>
