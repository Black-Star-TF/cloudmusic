<template>
	<div class="search-result-container">
		<!-- 搜索结果标题 -->
		<div class="search-result-title">{{title}}</div>
		
		<!-- 搜索结果分类导航 -->
		<nav class="search-result-nav">
			<router-link :to="{path: '/search/single', query:{keyword}}" tag="div" class="search-result-nav-item">单曲</router-link>
			<router-link :to="{path: '/search/singer', query:{keyword}}" tag="div" class="search-result-nav-item">歌手</router-link>
			<router-link :to="{path: '/search/album', query:{keyword}}" tag="div" class="search-result-nav-item">专辑</router-link>
			<router-link :to="{path: '/search/video', query:{keyword}}" tag="div" class="search-result-nav-item">视频</router-link>
			<router-link :to="{path: '/search/playlist', query:{keyword}}" tag="div" class="search-result-nav-item">歌单</router-link>
			<router-link :to="{path: '/search/lyric', query:{keyword}}" tag="div" class="search-result-nav-item">歌词</router-link>
			<router-link :to="{path: '/search/radio', query:{keyword}}" tag="div" class="search-result-nav-item">主播电台</router-link>
			<router-link :to="{path: '/search/user', query:{keyword}}" tag="div" class="search-result-nav-item">用户</router-link>
		</nav>
		
		
		<!-- 搜索结果内容 -->
		<div class="search-result-content">
			<router-view @getResult="showRes" :keyword="keyword"></router-view>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Search',
		data(){
			return{
				keyword: '',
				title: ''
			}
		},
		methods:{
			showRes(msg){
				this.title = msg
			}
		},
		created(){
			this.keyword = this.$route.query.keyword;
		},
		watch:{
			$route(from,to) {
				//将数据重新加载
				this.keyword = this.$route.query.keyword;
			}
		}
	}
	
</script>

<style>
	
	.search-result-container{
		color: #ccc;
	}
	
	.search-result-title{
		font-size: 16px;
		font-weight: 600;
		padding-left: 30px;
		height: 60px;
		line-height: 60px;
	}
	
	.search-result-nav{
		font-size: 14px;
		padding-left: 30px;
		display: flex;
		justify-content: left;
		height: 30px;
		line-height: 30px;
		border-bottom: 1px solid #444;
	}
	.search-result-nav-item{
		margin-right: 20px;
		height: 30px;
		line-height: 30px;
		cursor: pointer;
		color: #d0d0d0;
	}
	.search-result-nav-item.router-link-active{
		font-weight: 600;
	}
	
	.search-result-nav-item:hover{
		color: #fff;
	}
</style>
