<template>
	<div class="search-video-item" :style="itemStyle">
		
		<div class="video-cover-container" @click="toVideoDetail">
			<!-- 视频封面 -->
			<img :src="video.coverUrl" class="video-cover-img" @load="load" ref="img">
			
			<!-- 播放量 -->
			<div class="video-play-count"><span class="iconfont icon-bofang1"></span> {{playCount}}</div>
			
		</div>
		
		<!-- 视频名称 -->
		<div class="video-name" @click="toVideoDetail"><span class="mv-tag" v-if="video.type==0">MV</span> {{video.title}}</div>
		
		<!-- 视频作家  歌手-->
		<div class="video-composer" v-if="video.type==0">
			<span v-for="(artist,index) in video.creator"><span class="video-composer-name" @click="toArtistDetail(artist)">{{artist.userName}}</span><span class="dilimiter" v-if="index < video.creator.length -1"> / </span></span>
		</div>
		
		<!-- 视频作者   用户 -->
		<div class="video-composer" v-if="video.type==1">
			<span class="video-composer-name"><span class="by">by</span> <span>{{video.creator[0].userName}}</span></span>
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
				default: 4
			},
			copywriter:{
				type: Boolean,
				default: false
			}
		},
		methods:{
			toArtistDetail(singer){
				this.$router.push({
					path: '/artistdetail',
					query:{
						id: singer.userId
					}
				})
			},
			load(){
				if(this.$refs.img){
					this.$refs.img.height = 0.56 * this.$refs.img.width;
				}
			},
			toVideoDetail(){
				this.$router.push({
					path: '/videodetail',
					query:{
						id: this.video.vid
					}
				})
			}
		},
		computed:{
			itemStyle(){
				return{
					width: `calc(100%/${this.columns} - 20px)`
				}
			},
			playCount(){
				return this.video.playTime >= 100000 ? Math.floor(this.video.playTime/10000) + '万': this.video.playTime;
			}
		}
	}
	
</script>

<style>
	.search-video-item{
		margin-bottom: 25px;
		font-size: 12px;
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
		font-size: 12px;
		color: #D0D0D0;
		cursor: pointer;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.video-name:hover{
		color: #fff;
	}
	
	.video-name>.mv-tag{
		display: inline-block;
		height: 12px;
		line-height: 12px;
		border: 1px solid red;
		color: red;
		border-radius: 2px;
	}
	
	.video-composer{
		color: #555;
	}
	
	
	.video-composer-name{
		cursor: pointer;
	}
	.video-composer-name:hover{
		color: #b5b5b5;
	}
	
	.video-composer-name:hover>.by{
		color: #555;
	}
	
	.video-composer-name>.by{
		cursor: default;
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

</style>
