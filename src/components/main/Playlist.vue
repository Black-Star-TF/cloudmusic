<template>
	<div class="playlist-panel-playlist">
		<div class="playlist-panel-song-item" v-for="song in songs" :key="song.id" :class="{'on-play': song.id == currentId}" @dblclick="play(song)">
			
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
			<div class="song-item-duration">{{song.dt | duration}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Playlist',
		props: {
			songs: {
				type: Array,
				require: true
			},
		},
		computed: {
			currentId() {
				return this.$store.state.currentSong.id
			}
		},
		methods: {
			play(song){
				console.log(111);
				// 播放歌曲
				this.$store.dispatch('play',song)
			}
		},
		filters:{
			duration(dt){
				let sec = Math.ceil(dt/1000);
				let minutes = Math.floor(sec/60);
				let seconds = Math.ceil(sec%60);
				return `${ minutes > 10 ? minutes : "0"+minutes}:${seconds>=10 ? seconds : "0"+seconds}`;
			}
		},
	}
	
</script>

<style>
	
	.playlist-panel-song-item{
		height: 35px;
		line-height: 35px;
		color: #888;
		font-size: 12px;
		
	}
	.playlist-panel-song-item.on-play>.song-item-name,.playlist-panel-song-item.on-play>.song-item-singer>span>span.singer-name{
		color: #EC4245;
	}
	
	.playlist-panel-song-item:nth-of-type(2n-1){
		background-color: rgba(255,255,255,.02);
	}
	
	.playlist-panel-song-item:hover{
		background-color: rgba(255,255,255,.03);
		color: #fff;
	}
	
	.playlist-panel-song-item>.song-item-play-icon,.playlist-panel-song-item>.song-item-name,.playlist-panel-song-item>.song-item-singer,.playlist-panel-song-item>.song-item-duration,.playlist-panel-song-item>.song-item-link{
		height: 35px;
		float: left;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	
	.playlist-panel-song-item>.song-item-play-icon{
		width: 10px;
		margin: 0 5px;
	}
	.playlist-panel-song-item>.song-item-name{
		width: 180px;
		margin-right: 20px;
	}
	
	.playlist-panel-song-item>.song-item-singer{
		width: 80px;
		margin-right: 20px;
	}
	
	.playlist-panel-song-item>.song-item-link{
		width: 20px;
		margin-right: 10px;
	}
	
	.playlist-panel-song-item>.song-item-duration{
		width: 40px;
	}
</style>
