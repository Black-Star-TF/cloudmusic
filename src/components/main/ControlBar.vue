<template>
	<div class="app-controlbar" @click.stop>
		
		<!-- 当前播放歌曲信息 -->
		<div class="current-song-detail">
			<img :src="currentSongAvatar" class="current-song-cover">
			<div class="current-song-info">
				<div class="current-song-name">{{currentSongName}}</div>
				<div class="current-song-singer">
					<span class="current-song-singer-name" v-for="(singer,index) in currentSongSingers">{{singer.name}}<span class="dilimiter" v-if="index < currentSongSingers.length - 1"> / </span></span>
				</div>
			</div>
		</div>
		
		<!-- 音频播放控件 -->
		<AudioControls :url="currentSongUrl" @nextsong="nextSong" @lastsong="lastSong"></AudioControls>
		
		<!-- 播放列表按钮  声音控制 -->
		<div class="btn-control">
			<!-- 播放列表控制按钮 -->
			<span class="iconfont icon-juxing" @click="shangePlaylistStatus"></span>
		</div>
		<!-- 当前播放列表 -->
		<PlaylistPanel v-if="showPlaylist"></PlaylistPanel>
		
		<!-- 歌词面板 -->
		<!-- <div class="lyric-panel scroll">
			{{lyric}}
		</div> -->
	</div>
</template>

<script>
	import {getSongLyric} from '@/network/Discover/song';
	import PlaylistPanel from '@/components/main/PlaylistPanel';
	import AudioControls from '@/components/main/AudioControls'
	export default {
		name: 'ControlBar',
		data(){
			return {
				audio: null,
				showPlaylist: false,
				lyric: ''
			}
		},
		components: {
			PlaylistPanel,
			AudioControls
		},
		methods: {
			shangePlaylistStatus(){
				this.showPlaylist = !this.showPlaylist;
			},
			// 上一首
			lastSong(){
				this.$store.commit('playLastSong');
			},
			// 下一首
			nextSong(){
				this.$store.commit('playNextSong');
			},
		},
		computed: {
			currentSongAvatar(){
				return this.currentSong ? this.currentSong.al.picUrl : null;
			},
			currentSongUrl(){
				return this.currentSong ? this.currentSong.url : null;
			},
			currentSong() {
				return this.$store.state.currentSong
			},
			currentPlaylist(){
				return this.$store.state.songUrlList
			},
			currentSongName(){
				return this.currentSong ? this.currentSong.name :'';
			},
			currentSongSingers(){
				return this.currentSong ? this.currentSong.ar :'';
			}
		},
		created(){
			document.addEventListener('click', ()=>{
				if(this.showPlaylist){
					this.showPlaylist = false
				}
			})
		}
	}
	
</script>

<style>
	.app-controlbar{
		color: #d0d0d0;
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 70px;
		background-color: rgb(34,34,34);
		box-sizing: border-box;
		border-top: 1px solid #444;
		justify-content: space-between;
		display: flex;
	}
	
	.current-song-detail{
		height: 69px;
		width: 300px;
	}
	
	.current-song-cover{
		display: block;
		height: 49px;
		width: 49px;
		margin: 10px;
		border-radius: 5px;
		float: left;
		cursor: pointer;
	}
	
	.current-song-info{
		width: 220px;
		float: left;
		color: #d0d0d0;
		margin: 9px 0;
	}
	
	.current-song-name{
		width: 220px;
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		cursor: pointer;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.current-song-name:hover{
		color: #fff;
	}
	
	.current-song-singer{
		width: 220px;
		font-size: 12px;
		height: 20px;
		line-height: 20px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.current-song-singer-name{
		cursor: pointer;
	}
	
	.current-song-singer-name>.dilimiter{
		cursor: default;
	}
	
	.btn-control{
		width: 300px;
		height: 69px;
		line-height: 69px;
	}
	
	.btn-control>span{
		line-height: 69px;
		color: #d0d0d0;
		font-size: 20px;
		cursor: pointer;
	}
	
	.btn-control>span:hover{
		color: #fff;
	}
	
	.lyric-panel{
		position: absolute;
		width: 500px;
		height: 300px;
		overflow: auto;
		background-color: #000000;
		color: #fff;
		bottom: 70px;
	}

</style>
