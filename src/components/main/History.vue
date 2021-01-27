<template>
	<div class="play-history">
		<div class="history-option">
			<div class="song-num">总{{songs.length}}首</div>
			<div class="clear-all" @click="clearHistory">清空</div>
		</div>
		<SongItem v-for="song in songs" :song="song" :key="song.id" :currentTime="currentTime" lastTime></SongItem>
	</div>
</template>

<script>
	import SongItem from '@/components/main/SongItem'
	export default {
		name: 'Playlist',
		data() {
			return {
				currentTime: 0
			}
		},
		props: {
			songs: {
				type: Array,
				require: true
			},
		},
		components: {
			SongItem
		},
		methods: {
			clearHistory() {
				this.$store.commit('clearHistory')
			}
		},
		created(){
			this.currentTime = Date.parse(new Date())
		}
	}
	
</script>

<style>
	
	.history-option{
		width: 380px;
		margin: 0 auto;
		height: 40px;
		border-bottom: 1px solid #444;
	}
	
	.song-num{
		float: left;
		font-size: 12px;
		line-height: 40px;
		color: #666;
	}
	
	.clear-all{
		float: right;
		font-size: 13px;
		line-height: 40px;
		color: #d0d0d0;
		cursor: pointer;
	}

</style>
