<template>
	<div class="search-playlist-item" @click="toPlaylistDetail">
		<img :src="playlist.coverImgUrl" alt="" class="playlist-cover">
		<span class="playlist-name">{{playlist.name}}</span>
		<span class="playlist-song-count">{{playlist.trackCount}}首</span>
		<span class="playlist-creator"><span class="by">by</span><span class="playlist-creator-name">{{playlist.creator.nickname}}</span></span>
	</div>
</template>

<script>
	export default {
		name: 'PlaylistItem',
		props:{
			playlist: {
				type: Object,
				require: true
			}
		},
		methods:{
			toPlaylistDetail(playlist){
				this.$router.push({
					path: '/playlistdetail',
					query:{
						id: this.playlist.id
					}
				})
			},
		}
	}
	
</script>

<style>
	.search-playlist-item{
		height: 80px;
		padding-left: 30px;
		position: relative;
		cursor: pointer;
	}
	
	.search-playlist-item:nth-of-type(2n){
		background-color: rgba(255,255,255,.03);
	}
	
	.search-playlist-item:hover{
		background-color: rgba(255,255,255,.05);
	}
	
	.search-playlist-item>.playlist-cover{
		border-radius: 5px;
		width: 60px;
		height: 60px;
		margin: 10px 0;
		margin-right: 10px;
		float: left;
	}
	
	.search-playlist-item>.playlist-name{
		line-height: 80px;
		font-size: 14px;
		font-weight: normal;
		color: #ddd;
	}
	
	.search-playlist-item>.playlist-name:hover{
		color: #fff;
	}
	
	.search-playlist-item>.playlist-song-count{
		position: absolute;
		left: 50%;
		line-height: 80px;
		font-size: 12px;
		color: #777;
	}
	
	.search-playlist-item>.playlist-creator{
		position: absolute;
		left: 70%;
		line-height: 80px;
	}
	
	.search-playlist-item>.playlist-creator>.by{
		font-size: 12px;
		color: #666;
		margin-right: 10px;
	}
	
	.search-playlist-item>.playlist-creator>.playlist-creator-name{
		font-size: 12px;
		color: #999;
	}
	
	.search-playlist-item>.playlist-creator>.playlist-creator-name:hover{
		color: #ccc;
	}
</style>
