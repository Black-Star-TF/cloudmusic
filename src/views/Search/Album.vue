<template>
	<div class="search-result-album">
		<AlbumItem  v-for="album in albums" :album="album" v-if="albums"></AlbumItem>
		<!-- 页码导航 -->
		<PageNumBtn :pageNum="pageNum" :totalPage="totalPage" @pagebtnclick="turnPage" v-if="albums"></PageNumBtn>
	</div>
</template>

<script>
	import {search} from '@/network/Search/search';
	import AlbumItem from '@/components/search/AlbumItem';
	import PageNumBtn from '@/components/common/PageNumBtn';
	export default {
		name: 'Album',
		data(){
			return {
				limit: 20,
				type: 10,
				pageNum: 1,
				total: 0,
				albums: null
			}
		},
		components:{
			AlbumItem,
			PageNumBtn
		},
		props:{
			keyword: String
		},
		computed:{
			offset(){
				return this.limit * (this.pageNum -1)
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
				this.albums = null;
				search(this.keyword,this.type,this.limit,this.offset).then(res=>{
					this.total = res.result.albumCount;
					this.albums = res.result.albums;
					this.$emit('getResult',`找到 ${this.total} 张专辑`);
				})
			}
		},
		created(){
			this.$emit('getResult',`找到 ${this.total} 张专辑`);
			this.getSearchData();
		},
		watch:{
			keyword(){
				this.getSearchData();
			}
		}
	}
	
</script>

<style>
	
	
</style>
