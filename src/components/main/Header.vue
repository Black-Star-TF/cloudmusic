<template>
	<div class="app-header">
		网易云音乐
		<!-- 头部包含 logo 前进后退按钮 登录按钮 搜索框 -->
	</div>
</template>

<script>
	export default {
		name: 'Header'
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
		font-size: 30px;
		color: #999;
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
</style>
