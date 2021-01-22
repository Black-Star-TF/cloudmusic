<template>
	<div class="playlist-detail">
		<!-- 头部信息 -->
		<DetailStructure v-if="playlist">
			<template slot="header">
				<PlaylistDetailHeader :playlist="playlist" type="playlist" v-if="playlist"></PlaylistDetailHeader>
			</template>
			
			<!-- 导航栏 -->
			<template slot="router-nav">
				<router-link :to="{ path: '/playlistdetail/songlist', query: {id}}" tag="div">歌曲列表</router-link>
				<router-link :to="{ path: '/playlistdetail/comment', query: {id}}" tag="div">评论({{playlist.commentCount}})</router-link>
				<router-link :to="{ path: '/playlistdetail/subscriber', query: {id}}" tag="div">收藏者</router-link>
			</template>
			
			<!-- 内容区 -->
			<template slot="router-view-content">
					<router-view :playlist="playlist"></router-view>
			</template>
		</DetailStructure>
	</div>
</template>

<script>
	import {getPlaylistDetail} from '@/network/Discover/playlist';
	import DetailStructure from '@/components/common/DetailStructure'
	import PlaylistDetailHeader from '@/components/playlist/PlaylistDetailHeader'
	export default {
		name: 'PlaylistDetail',
		data(){
			return{
				id: null,
				playlist: null
			}
		},
		components:{
			DetailStructure,
			PlaylistDetailHeader
		},
		created(){
			this.id = this.$route.query.id;
			// 获取歌单详情数据
			getPlaylistDetail(this.id).then(res=>{
				this.playlist = res.playlist;
			})
		},
		beforeRouteEnter(to,from,next){
			// to.meta.keepAlive = true;
			// console.log('to',to);
			// console.log('from',from);
			// next(vw=>{
			// 	vw.routerFrom = from.fullPath
			// })
			next()
		},
		beforeRouteLeave(to,from,next){
			// from.meta.keepAlive = false
			next()
		}
	}
	
</script>

<style>
</style>
