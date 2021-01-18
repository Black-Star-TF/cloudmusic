<template>
	<div class="content-discover">
		<!-- 发现音乐页面的顶部导航栏 -->
		<nav class="discover-nav">
			<router-link to="/discover/recommand" class="discover-nav-item" tag="div">个性推荐</router-link>
			<router-link to="/discover/songlist" class="discover-nav-item" tag="div">歌单</router-link>
			<router-link to="/discover/radio" class="discover-nav-item" tag="div">主播电台</router-link>
			<router-link to="/discover/toplist" class="discover-nav-item" tag="div">排行榜</router-link>
			<router-link to="/discover/singer" class="discover-nav-item" tag="div">歌手</router-link>
			<router-link to="/discover/newest" class="discover-nav-item" tag="div">最新音乐</router-link>
		</nav>
		
		<!-- 内容区 -->
		<div class="discover-content">
			<router-view></router-view>
		</div>
		
	</div>
</template>

<script>
	export default {
		name: 'Discover'
	}
	
</script>

<style>
	
	.content-discover{
		width: 100%;
		padding-bottom: 30px;
		color: #fff;
	}
	
	/* 发现音乐页面导航栏样式 */
	.discover-nav{
		padding-left: 20px;
		height: 60px;
		background-color: rgb(34,34,34);
		position: sticky; 
		top: 0;
		z-index: 1000;
	}
	
	.discover-nav-item{
		float: left;
		line-height: 60px;
		margin-right: 25px;
		font-size: 17px;
		position: relative;
		cursor: pointer;
		color: #afafaf;
	}
	
	.discover-nav-item:hover{
		color: #fff;
	}
	
	.discover-nav-item.router-link-active::after{
		content: "";
		display: block;
		position: relative;
		width: 80%;
		height: 3px;
		background-color: red;
		margin: 0 auto;
		top: -15px;
	}
	
	.discover-nav-item.router-link-active{
		font-size: 20px;
		font-weight: 600;
		color: #d0d0d0;
	}
	
	.discover-nav-item:hover{
		color: #fff;
	}
	
	/* 内容区样式 */
	.discover-content{
		width: 85%;
		margin: 0 auto;
	}
</style>
