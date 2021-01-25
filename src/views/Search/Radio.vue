<template>
	<div class="search-result-radio">
		<RadioItem v-for="radio in radios" :radio="radio"></RadioItem>
		<!-- 页码导航 -->
		<PageNumBtn :pageNum="pageNum" :totalPage="totalPage" @pagebtnclick="turnPage" v-if="radios"></PageNumBtn>
	</div>
</template>

<script>
	import {search} from '@/network/Search/search';
	import RadioItem from '@/components/search/RadioItem';
	import PageNumBtn from '@/components/common/PageNumBtn';
	export default {
		name: 'Radio',
		data(){
			return{
				limit: 20,
				total: 0,
				pageNum: 1,
				type: 1009,
				radios: null,
			}
		},
		components:{
			RadioItem,
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
				this.radios  = null;
				search(this.keyword,this.type,this.limit,this.offset).then(res=>{
					console.log(res);
					this.total = res.result.djRadiosCount;
					this.radios = res.result.djRadios;
					this.$emit('getResult',`找到 ${this.total} 个电台`);
				})
			}
		},
		created(){
			this.$emit('getResult',`找到 ${this.total} 个电台`);
			this.getSearchData();
		}
	}
	
</script>

<style>
</style>
