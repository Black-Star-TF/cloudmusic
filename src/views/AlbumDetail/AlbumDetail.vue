<template>
	<DetailStructure v-if="album">
		<template slot="header">
			<AlbumDetailHeader :album="album"></AlbumDetailHeader>
		</template>
		
		<!-- 导航栏 -->
		<template slot="router-nav">
			<router-link :to="{ path: '/albumdetail/songlist', query: {id}}" tag="div">歌曲列表</router-link>
			<router-link :to="{ path: '/albumdetail/comment', query: {id}}" tag="div">评论({{album.info.commentThread.commentCount}})</router-link>
			<router-link :to="{ path: '/albumdetail/detail', query: {id}}" tag="div">专辑详情</router-link>
		</template>
		
		<!-- 内容区 -->
		<template slot="router-view-content">
				<router-view :album="album" :songs="songs"></router-view>
		</template>
	</DetailStructure>
</template>

<script>
	import {getAlbumDetail} from '@/network/Discover/album';
	import DetailStructure from '@/components/common/DetailStructure';
	import AlbumDetailHeader from '@/components/album/AlbumDetailHeader';
	export default {
		name: 'AlbumDetail',
		data(){
			return {
				id: null,
				album: null,
				songs: null
			}
		},
		components:{
			DetailStructure,
			AlbumDetailHeader
		},
		created(){
			this.id = this.$route.query.id;
			getAlbumDetail(this.id).then(res=>{
				this.album = res.album;
				this.songs = res.songs;
			})
		}
	}
	
</script>

<style>
</style>
