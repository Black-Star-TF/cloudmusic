<template>
	<div class="search-result-user">
		<UserItem v-for="user in users" :user="user"></UserItem>
		<!-- 页码导航 -->
		<PageNumBtn :pageNum="pageNum" :totalPage="totalPage" @pagebtnclick="turnPage" v-if="users"></PageNumBtn>
	</div>
</template>

<script>
	import {search} from '@/network/Search/search';
	import UserItem from '@/components/search/UserItem';
	import PageNumBtn from '@/components/common/PageNumBtn';
	export default {
		name: 'User',
		data(){
			return{
				limit: 20,
				total: 0,
				pageNum: 1,
				type: 1002,
				users: null,
			}
		},
		components:{
			UserItem,
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
				this.users  = null;
				search(this.keyword,this.type,this.limit,this.offset).then(res=>{
					this.total = res.result.userprofileCount;
					this.users = res.result.userprofiles;
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
