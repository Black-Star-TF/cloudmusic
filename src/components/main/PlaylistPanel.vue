<template>
	<div class="playlist-panel scroll">
		<Playlist :songs="songList" v-if="songList"></Playlist>
	</div>
</template>

<script>
	import {getSongDetail} from '@/network/Discover/song'
	import SongListTable from '@/components/common/SongListTable'
	import Playlist from '@/components/main/Playlist'
	export default {
		name: 'PlaylistPanel',
		components: {
			SongListTable,
			Playlist
		},
		computed: {
			songList(){
				return this.$store.state.currentPlaylist
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
</style>
