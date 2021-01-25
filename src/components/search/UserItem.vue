<template>
	<div class="search-user-item" @click="toUserDetail">
		<div class="user-cover-container">
			<!-- 头像 -->
			<img :src="user.avatarUrl" class="user-cover">
			<!-- 身份图标 -->
			<img :src="user.avatarDetail.identityIconUrl" class="user-identityIcon" v-if="user.avatarDetail">
		</div>
		
		<span class="user-name">{{user.nickname}}</span>
		<!-- 性别 -->
		<span class="iconfont nan icon-82" v-if="user.gender == 1"></span>
		<span class="iconfont nv icon-nv" v-if="user.gender == 2"></span>
		
		<!-- 个性签名 -->
		<span class="user-signature">{{user.description||user.signature}}</span>
	</div>
</template>

<script>
	export default{
		name: 'UserItem',
		props:{
			user: {
				type: Object,
				require: true
			}
		},
		methods: {
			toUserDetail() {
				this.$router.push({
					path: '/userdetail',
					query:{
						id: this.user.userId
					}
				})
			}
		},
	}
</script>

<style>
	
	.search-user-item{
		height: 80px;
		padding-left: 30px;
		position: relative;
		cursor: pointer;
	}
	
	.search-user-item:nth-of-type(2n){
		background-color: rgba(255,255,255,.03);
	}
	
	.search-user-item:hover{
		background-color: rgba(255,255,255,.05);
	}
	
	.user-cover-container{
		width: 60px;
		height: 60px;
		margin: 10px 0;
		float: left;
		position: relative;
	}
	
	.search-user-item>.user-cover-container>.user-cover{
		width: 100%;
		border-radius: 50%;
	}
	
	.search-user-item>.user-cover-container>.user-identityIcon{
		position: absolute;
		width: 18px;
		height: 18px;
		bottom: 0;
		right: 0;
	}
	
	.search-user-item>.user-name{
		line-height: 80px;
		font-size: 14px;
		color: #ddd;
		margin-left: 20px;
	}
	
	.search-user-item>.user-name:hover{
		color: #fff;
	}
	
	.search-user-item>span.iconfont{
		display: inline-block;
		width: 18px;
		height: 18px;
		line-height: 18px;
		font-size: 13px;
		border-radius: 50%;
		text-align: center;
		cursor: default;
		margin-left: 10px;
		position: relative;
		top: -1px;
	}
	
	.search-user-item>span.iconfont.nan{
		color: blue;
		background-color: rgba(0,0,255,.3);
	}
	
	.search-user-item>span.iconfont.nv{
		color: red;
		font-size: 12px;
		background-color: rgba(255,0,0,.3);
	}
	
	.search-user-item>.user-signature{
		line-height: 80px;
		position: absolute;
		right: 2%;
		font-size: 12px;
		color: #999;
	}
</style>
