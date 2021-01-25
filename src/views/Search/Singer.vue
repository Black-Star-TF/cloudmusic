<template>
	<div class="search-rsult-singer">
		<!-- 歌手 -->
		<SingerItem v-for="singer in singers" :singer="singer"></SingerItem>
		<!-- 页码导航 -->
		<PageNumBtn :pageNum="pageNum" :totalPage="totalPage" @pagebtnclick="turnPage" v-if="singers"></PageNumBtn>
	</div>
</template>

<script>
	import {search} from '@/network/Search/search';
	import SingerItem from '@/components/search/SingerItem';
	import PageNumBtn from '@/components/common/PageNumBtn';
	export default {
		name: 'Singer',
		data(){
			return {
				limit: 20,
				type: 100,
				pageNum: 1,
				total: 0,
				singers: null
			}
		},
		components:{
			SingerItem,
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
				this.singers = null;
				search(this.keyword,this.type,this.limit,this.offset).then(res=>{
					this.total = res.result.artistCount
					this.singers = res.result.artists
					
					this.$emit('getResult',`找到 ${this.total} 位歌手`);
				})
			}
		},
		created(){
			this.$emit('getResult',`找到 ${this.total} 位歌手`);
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
