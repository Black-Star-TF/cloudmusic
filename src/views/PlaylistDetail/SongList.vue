<template>
	<div class="song-list-page-container">
			<SongListTable :songs="songList" v-if="songList" :head="true"></SongListTable>
	</div>
</template>

<script>
	import SongListTable from '@/components/common/SongListTable'
	import {getSongDetail} from '@/network/Discover/song'
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
			console.log(this.playlist)
			let songId = []
				for (let trackId of this.playlist.trackIds){
					songId.push(trackId.id)
				}
			let ids = songId.join(',')
			getSongDetail(ids).then(res=>{
				this.songList = res.songs
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

