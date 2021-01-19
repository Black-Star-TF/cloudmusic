<template>
	<div class="newest-music">
		<!-- 新歌/新碟切换模块 -->
		<div class="music-type-nav-container">
			<router-link to="/discover/newest/newestsong"  tag="div" class="newest-music-type-nav-item">新歌速递</router-link>
			<router-link to="/discover/newest/newestalbum" tag="div" class="newest-music-type-nav-item">新碟上架</router-link>
		</div>
		
		<!-- 内容 -->
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'Newest'
	}
</script>

<style>
	
	.music-type-nav-container{
		width: 259px;
		margin: 30px auto;
		height: 30px;
		border-radius: 15px;
		display: flex;
		justify-content: center;
		border: 1px solid #777;
		align-items: center;
		box-sizing: border-box;
	}
	
	.newest-music-type-nav-item{
		text-align: center;
		width: 50%;
		height: 30px;
		border-radius: 15px;
		box-sizing: border-box;
		line-height: 30px;
		cursor: default;
		color: #aaa;
	}
	
	.newest-music-type-nav-item:hover{
		background-color: rgba(255,255,255,0.05);
	}
	
	.newest-music-type-nav-item.router-link-active{
		background-color: #777;
		color: #fff;
	}
</style>
