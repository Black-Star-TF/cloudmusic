<template>
	<div class="search-result-lyric">
		<SongListTable :songs="songs" v-if="songs" head hot lyric></SongListTable>
		<!-- 页码导航 -->
		<PageNumBtn :pageNum="pageNum" :totalPage="totalPage" @pagebtnclick="turnPage" v-if="songs"></PageNumBtn>
	</div>
</template>

<script>
	import {search} from '@/network/Search/search';
	import SongListTable from '@/components/common/SongListTable';
	import PageNumBtn from '@/components/common/PageNumBtn';
	export default {
		name: 'Lyric',
		data(){
			return{
				limit: 20,
				total: 0,
				pageNum: 1,
				type: 1006,
				songs: null,
			}
		},
		components:{
			SongListTable,
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
				this.songs  = null;
				search(this.keyword,this.type,this.limit,this.offset).then(res=>{
					this.total = res.result.songCount;
					this.songs = res.result.songs;
					this.$emit('getResult',`找到 ${this.total} 个歌词`);
				})
			}
		},
		created(){
			this.$emit('getResult',`找到 ${this.total} 个歌词`);
			this.getSearchData();
		}
	}
	
</script>

<style>
</style>
