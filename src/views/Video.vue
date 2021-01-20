<template>
	<div class="content-video">
		<!-- 视频页面导航栏 -->
		<nav class="video-nav">
			<router-link to="/video/video" class="video-nav-item" tag="div">视频</router-link>
			<router-link to="/video/mv" class="video-nav-item" tag="div">MV</router-link>
		</nav>
		
		<!-- 内容区 -->
		<div class="video-content">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Video'
	}
	
</script>

<style>
	.content-video{
		width: 100%;
		font-size: 50px;
		color: #fff;
	}
	
	/* 发现音乐页面导航栏样式 */
	.video-nav{
		padding-left: 20px;
		height: 60px;
		background-color: rgb(34,34,34);
		position: sticky; 
		top: 0;
		z-index: 1000;
	}
	
	.video-nav-item{
		float: left;
		line-height: 60px;
		margin-right: 25px;
		font-size: 17px;
		position: relative;
		cursor: pointer;
		color: #afafaf;
	}
	
	.video-nav-item:hover{
		color: #fff;
	}
	
	.video-nav-item.router-link-active::after{
		content: "";
		display: block;
		position: relative;
		width: 80%;
		height: 3px;
		background-color: red;
		margin: 0 auto;
		top: -15px;
	}
	
	.video-nav-item.router-link-active{
		font-size: 20px;
		font-weight: 600;
		color: #d0d0d0;
	}
	
	.video-nav-item:hover{
		color: #fff;
	}
	
	.video-content{
		width: 85%;
		margin: 0 auto;
	}
</style>
