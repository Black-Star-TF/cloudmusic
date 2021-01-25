<template>
	<div class="user-detail" v-if="user">
		<!-- 头部信息 -->
		<UserDetailHeader :user="user"></UserDetailHeader>
		<!-- 用户创建的电台 -->
		<div class="user-radio">
			<div class="title">Ta创建的电台</div>
		</div>
		<!-- 用户歌单 -->
		<div class="user-playlist">
			<div class="title">歌单</div>
		</div>
	</div>
</template>

<script>
	import {getUserDetail} from '@/network/Discover/user';
	import UserDetailHeader from "@/components/user/UserDetailHeader"
	export default {
		name: 'UserDetail',
		data(){
			return {
				id: null,
				user: null
			}
		},
		components: {
			UserDetailHeader
		},
		created(){
			this.id = this.$route.query.id
			console.log(this.id);
			getUserDetail(this.id).then(res=>{
				this.user = res
			})
		}
	}
	
</script>

<style>
	.user-detail{
		padding: 20px 30px 30px;
		cursor: default;
	}
	
	.user-radio,.user-playlist{
		margin: 30px 0;
	}
	
	.user-radio>.title,.user-playlist>.title{
		font-size: 16px;
		font-weight: 600;
		color: #d0d0d0;
	}
	
</style>
