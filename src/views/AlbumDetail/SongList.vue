<template>
	<div class="song-list-container">
		<SongListTable :songs="songs" v-if="songs" head hot></SongListTable>
	</div>
</template>

<script>
	import SongListTable from '@/components/common/SongListTable'
	export default {
		name: 'SongList',
		components:{
			SongListTable
		},
		props:{
			songs: {
				type: Array,
				require: true
			}
		},
		created(){
			
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
