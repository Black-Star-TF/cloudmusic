<template>
	<div class="search-result-playlist">
		<PlaylistItem v-for="playlist in playlists" :playlist="playlist"></PlaylistItem>
		<PageNumBtn :pageNum="pageNum" :totalPage="totalPage" @pagebtnclick="turnPage" v-if="playlists"></PageNumBtn>
	</div>
</template>

<script>
	import {search} from '@/network/Search/search';
	import PlaylistItem from '@/components/search/PlaylistItem';
	import PageNumBtn from '@/components/common/PageNumBtn';
	export default {
		name: 'Playlist',
		data(){
			return{
				limit: 20,
				total: 0,
				pageNum: 1,
				type: 1000,
				playlists: null,
			}
		},
		components:{
			PlaylistItem,
			PageNumBtn
		},
		props:{
			keyword: String
		},
		computed:{
			offset(){
				return this.limit * (this.pageNum - 1)
			},
			totalPage(){
				if(this.total != 0){
					return Math.ceil(this.total/this.limit);
				}else{
					return 0
				}
			}
		},
		methods:{
			turnPage(pageNum){
				this.pageNum = pageNum;
				this.getSearchData();
			},
			getSearchData(){
				this.playlists  = null;
				search(this.keyword,this.type,this.limit,this.offset).then(res=>{
					console.log(res);
					this.total = res.result.playlistCount;
					this.playlists = res.result.playlists;
					this.$emit('getResult',`找到 ${this.total} 个歌单`);
				})
			}
		},
		created(){
			this.$emit('getResult',`找到 ${this.total} 个歌单`);
			this.getSearchData();
		}
	}
	
</script>

<style>
</style>
