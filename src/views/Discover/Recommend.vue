<template>
	<div class="recommend-content">
		<!-- 轮播图 -->
		<Slider :bannersData="banners" height="180" v-if="banners"></Slider>
		
		<!-- 推荐歌单 -->
		<CategoryModule  v-if="show">
			<template slot="title"><div class="link">推荐歌单</div></template>
			<template slot="content">
				<PlaylistItem v-for="playlist in recommendPlaylists" :playlist="playlist" :showCreator="false"></PlaylistItem>
			</template>
		</CategoryModule>
		
		<!-- 独家放送 -->
		<CategoryModule  v-if="show">
			<template slot="title"><div class="link">独家放送</div></template>
			<template slot="content">
				<ExclusiveVideoItem v-for="exclusiveVideo in exclusiveVideos" :exclusiveVideo="exclusiveVideo"></ExclusiveVideoItem>
			</template>
		</CategoryModule>
		
		<!-- 最新音乐 -->
		
		<!-- 推荐MV -->
		<CategoryModule  v-if="show">
			<template slot="title"><div class="link">推荐MV</div></template>
			<template slot="content">
				<VideoItem v-for="(video,index) in recommendMVList"  v-if="index < 3" :video="video"></VideoItem>
			</template>
		</CategoryModule>
		
		
		<!-- 主播电台 -->
		<CategoryModule  v-if="show">
			<template slot="title"><div class="link">主播电台</div></template>
			<template slot="content">
				<DJProgramItem v-for="DJProgram in recommendDJPrograms" :DJProgram="DJProgram"></DJProgramItem>
			</template>
		</CategoryModule>
		
		<div class="loading"  v-if="!show">
			<Loading></Loading>
		</div>
		
	</div>
</template>

<script>
	import {getBanner,getRecommendPlaylist,getExclusiveVideo,getRecommendMV,getRecommendDJProgram} from '@/network/Discover/recommend';
	import Slider from '@/components/common/Slider';
	import PlaylistItem from '@/components/playlist/PlaylistItem';
	import VideoItem from '@/components/video/VideoItem';
	import DJProgramItem from '@/components/DJProgram/DJProgramItem.vue';
	import CategoryModule from '@/components/common/CategoryModule';
	import ExclusiveVideoItem from '@/components/video/ExclusiveVideoItem';
	import Loading from '@/components/common/Loading';
	export default {
		name: 'Recommend',
		data(){
			return {
				banners: null,
				recommendPlaylists: null,
				exclusiveVideos: null,
				recommendMVList: null,
				recommendDJPrograms: null
			}
		},
		computed:{
			show(){
				// 当所有数据请求成功后显示内容
				return this.banners && this.recommendPlaylists && this.exclusiveVideos && this.recommendMVList && this.recommendDJPrograms;
			}
		},
		components:{
			Slider,
			PlaylistItem,
			VideoItem,
			DJProgramItem,
			CategoryModule,
			ExclusiveVideoItem,
			Loading
		},
		created(){
			// 获取轮播图数据
			getBanner().then(res=>{
				this.banners = res.banners;
			})
			
			// 获取推荐歌单数据
			getRecommendPlaylist().then(res=>{
				this.recommendPlaylists = res.result;
			});
			
			// 获取独家放送数据
			getExclusiveVideo().then(res=>{
				this.exclusiveVideos = res.result;
			});
			// 获取最新音乐数据
			
			// 获取推荐MV数据
			getRecommendMV().then(res=>{
				this.recommendMVList = res.result;
			})
			// 获取主播电台数据
			getRecommendDJProgram().then(res=>{
				this.recommendDJPrograms = res.data;
			})
		}
	}
	
</script>

<style>
	.link{
		cursor: pointer;
	}
	.link:hover{
		color: #fff;
	}
</style>
