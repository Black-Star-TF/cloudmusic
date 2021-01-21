<template>
	<div class="song-list-page-container">
			<SongListTable :songs="songList" v-if="songList" head></SongListTable>
	</div>
</template>

<script>
	import {getSongDetail} from '@/network/Discover/song'
	import SongListTable from '@/components/common/SongListTable'
	export default{
		name:　'SongListPage',
		data(){
			return{
				id: null,
				songList: null
			}
		},
		props:{
			playlist: {
				type: Object,
				require: true
			}
		},
		components:{
			SongListTable
		},
		created(){
			// 获取歌曲详情
			let songId = [];
			for (let trackId of this.playlist.trackIds){
				songId.push(trackId.id);
			}
			let ids = songId.join(',');
			getSongDetail(ids).then(res=>{
				this.songList = res.songs;
				for(let i = 0; i < this.songList.length; i++){
					this.songList[i].privilege = res.privileges[i]
				}
			})
		}
	}
</script>

<style>
	.song-list-page-container{
		width: 100%;
		overflow: hidden;
		padding-bottom: 30px;
	}
</style>

