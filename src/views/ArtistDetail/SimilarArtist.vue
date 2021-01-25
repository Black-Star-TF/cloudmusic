<template>
	<div class="similar-artist" v-if="singers">
		<SingerListItem v-for="(singer,index) in singers" :index="index" :singer="singer" :columns="5"></SingerListItem>
	</div>
</template>

<script>
	import {getSimilarSinger} from '@/network/Discover/singer';
	import SingerListItem from '@/components/singer/SingerListItem';
	export default {
		name: 'SimilarArtist',
		data(){
			return {
				if: null,
				singers: null
			}
		},
		components: {
			SingerListItem
		},
		created(){
			this.id = this.$route.query.id;
			getSimilarSinger(this.id).then(res=>{
				this.singers = res.artists
			})
		}
	}
	
</script>

<style>
	
	.similar-artist{
		display: flex;
		flex-wrap: wrap;
		padding: 20px 30px 30px;
	}
</style>
