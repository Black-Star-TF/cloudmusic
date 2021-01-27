<template>
	<div class="song-item" :class="{'on-play': song.id == currentId && duration}" @dblclick="play">
		<!-- 播放中标识 -->
		<div class="song-item-play-icon"></div>
		<!-- 歌曲名称 -->
		<div class="song-item-name"><span>{{song.name}}</span></div>
		
		<!-- 歌手 -->
		<div class="song-item-singer">
			<span v-for="(singer,index) in song.ar">
				<span class="singer-name" @click="toArtistDetail(singer)">{{singer.name}}</span>
				<span class="dilimiter" v-if="index < song.ar.length -1"> / </span>
			</span>
		</div>
		
		<!-- 链接 -->
		<div class="song-item-link"></div>
		<!-- 时长 -->
		<div class="song-item-duration" v-if="duration">{{song.dt | formatDuration}}</div>
		
		<!-- 上一次播放时间 -->
		<div class="song-item-last-play-time" v-if="lastTime">{{lastPlayTime}}</div>
	</div>
</template>

<script>
	export default {
		name: 'SongItem',
		props:{
			song:{
				type: Object,
				require: true
			},
			icon:{
				type: Boolean,
				default: false
			},
			lastTime:{
				type: Boolean,
				default: false
			},
			duration:{
				type: Boolean,
				default: false
			},
			currentTime:{
				default: 0
			}
		},
		computed: {
			currentId() {
				return this.$store.state.currentSong.id
			},
			lastPlayTime(){
				let time = Math.floor((this.currentTime - this.song.playTime)/1000/60)
				
				if(time < 1){
					return '刚刚'
				}else if(time < 60){
					return time+'分钟前'
				}else if(time < 1400){
					return Math.floor(time/60) + '小时前'
				}else{
					return Math.floor(time/60/24) + '天前'
				}
			}
		},
		methods: {
			play() {
				this.$store.dispatch('play',this.song)
			}
		},
		filters: {
			formatDuration(dt){
				let sec = Math.ceil(dt/1000);
				let minutes = Math.floor(sec/60);
				let seconds = Math.ceil(sec%60);
				return `${ minutes > 10 ? minutes : "0"+minutes}:${seconds>=10 ? seconds : "0"+seconds}`;
			}
		}
	}
	
</script>

<style>
	.song-item{
		height: 35px;
		line-height: 35px;
		color: #888;
		font-size: 12px;
		
	}
	.song-item.on-play>.song-item-name,
	.song-item.on-play>.song-item-singer>span>span.singer-name{
		color: #EC4245;
	}
	
	.song-item:nth-of-type(2n-1){
		background-color: rgba(255,255,255,.02);
	}
	
	.song-item:hover{
		background-color: rgba(255,255,255,.03);
		color: #fff;
	}
	
	.song-item>.song-item-play-icon,
	.song-item>.song-item-name,
	.song-item>.song-item-singer,
	.song-item>.song-item-duration,
	.song-item>.song-item-last-play-time,
	.song-item>.song-item-link{
		height: 35px;
		float: left;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	
	.song-item>.song-item-play-icon{
		width: 10px;
		margin: 0 5px;
	}
	.song-item>.song-item-name{
		width: 180px;
		margin-right: 20px;
	}
	
	.song-item>.song-item-singer{
		width: 80px;
		margin-right: 20px;
	}
	
	.song-item>.song-item-link{
		width: 20px;
		margin-right: 10px;
	}
	
	.song-item>.song-item-duration,{
		width: 40px;
	}
	
	.song-item>.song-item-last-play-time{
		width: 60px;
	}
</style>
