<template>
	<div class="app-header">
		
		<router-link to="/" tag="div" class="header-title"> <img class="icon" src="@/assets/img/wangyiyun.svg" alt="">网易云音乐</router-link>
		
		<!-- 头部包含 logo 前进后退按钮 登录按钮 搜索框 -->
		<div class="skip">
			<span class="back iconfont icon-qianjinhoutui" @click="goBack"></span>
			<span class="forward iconfont icon-right" @click="goForward"></span>
		</div>
		
		<div class="serach-box">
			<input type="text" class="search" placeholder="搜索" @keydown.enter="search" v-model.trim="keyword">
			<span class="iconfont icon-shous" @click="search"></span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Header',
		data(){
			return {
				keyword: ''
			}
		},
		methods:{
			search(){
				if(this.keyword!=''){
					this.$router.push({
						path: '/search',
						query: {
							keyword: this.keyword
						}
					})
				}
			},
			goBack(){
				this.$router.go(-1);
			},
			goForward(){
				this.$router.go(1);
			}
		}
	}
</script>

<style>
	.app-header{
		height: 60px;
		width: 100%;
		position: absolute;
		top: 0;
		background-color: rgb(34,34,34);
		text-align: center;
		line-height: 60px;
		
	}
	
	.app-header::after{
		content: "";
		display: block;
		position: absolute;
		width: 100%;
		bottom: 0;
		height: 2px;
		background-color: rgb(170,30,30);
	}
	
	.header-title{
		cursor: pointer;
		margin-left: 20px;
		float: left;
		font-size: 20px;
		font-family: Arial, Helvetica, sans-serif;
		color: #d0d0d0;
	}
	
	.header-title>.icon{
		height: 25px;
		position: relative;
		top: 6px;
		margin-right: 5px;
	}
	
	
	.app-header>.skip{
		line-height: 60px;
		width: 50px;
		float: left;
		margin: 0 70px;
		margin-right: 20px;
		display: flex;
		justify-content: space-between;
	}
	.app-header>.skip>span.iconfont{
		line-height: 60px;
		font-size: 14px;
		color: #ccc;
		cursor: pointer;
	}
	
	.serach-box{
		width: 160px;
		height: 100%;
		float: left;
		position: relative;
	}
	
	.serach-box>input.search{
		width: 100%;
		line-height: 60px;
		height: 30px;
		border-radius: 15px;
		background-color: #303030;
		outline-style: none;
		outline: none;
		border: none;
		font-size: 13px;
		text-indent: 35px;
		color: #d0d0d0;
	}
	
	.serach-box>span.iconfont{
		position: absolute;
		line-height: 60px;
		top: 2px;
		left: 10px;
		font-size: 18px;
		color: #d0d0d0;
	}
	
	.serach-box>input.search::-webkit-input-placeholder {
		color: #555;
	}
</style>
