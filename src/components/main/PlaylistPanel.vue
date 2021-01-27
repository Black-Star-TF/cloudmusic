<template>
	<div class="playlist-panel scroll">
		
		<div class="playlist-panel-header">
			<div class="nav-container">
				<!-- 播放列表 -->
				<div class="playlist-nav-item nav-item" :class="{'active': playlist}" @click="changeToPlaylist">播放列表</div>
				<!-- 历史记录 -->
				<div class="history-list-nav-item nav-item" :class="{'active': !playlist}" @click="changeToHistory">历史记录</div>
			</div>
		</div>
		
		<!-- 播放列表 -->
		<Playlist :songs="songList" v-if="playlist"></Playlist>
		
		<!-- 历史记录 -->
		<History :songs="historyList" v-else></History>
		
	</div>
</template>

<script>
	import {getSongDetail} from '@/network/Discover/song'
	import SongListTable from '@/components/common/SongListTable'
	import Playlist from '@/components/main/Playlist'
	import History from '@/components/main/History'
	export default {
		name: 'PlaylistPanel',
		data(){
			return {
				playlist: true
			}
		},
		components: {
			SongListTable,
			Playlist,
			History
		},
		computed: {
			songList(){
				return this.$store.state.currentPlaylist
			},
			historyList(){
				return this.$store.state.history
			}
		},
		methods:{
			changeToPlaylist(){
				if(!this.playlist){
					this.playlist = true
				}
			},
			changeToHistory(){
				if(this.playlist){
					this.playlist = false
				}
			}
		}
	}
	
</script>

<style>
	.playlist-panel{
		width: 420px;
		height: calc(100vh - 130px);
		background-color: #363636;
		position: absolute;
		bottom: 70px;
		right: 0;
		overflow: auto;
		cursor: default;
		z-index: 1001;
	}
	
	.playlist-panel-header{
		height: 60px;
		overflow: hidden;
		width: 420px;
	}
	
	.playlist-panel-header>.nav-container{
		width: 199px;
		height: 30px;
		margin: 15px auto;
		box-sizing: border-box;
		border: 1px solid #777;
		border-radius: 15px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.playlist-panel-header>.nav-container>.nav-item{
		float: left;
		width: 50%;
		height: 30px;
		box-sizing: border-box;
		border-radius: 15px;
		line-height: 30px;
		font-size: 12px;
		cursor: pointer;
		color: #d0d0d0;
		text-align: center;
		border: 1px solid transparent;
	}
	
	.playlist-panel-header>.nav-container>.nav-item:hover{
		background-color: rgba(255,255,255,.05);
		color: #fff;
	}
	
	.playlist-panel-header>.nav-container>.nav-item.active{
		background-color: #777;
		color: #fff;
	}
</style>
