<template>
	<div class="artist-detail">
		<!-- 头部详情 -->
		<DetailStructure>
			<template slot="header" v-if="singer">
				<SingerDetailHeader :singer="singer"></SingerDetailHeader>
			</template>
			
			<!-- 导航栏 -->
			<template slot="router-nav">
				<router-link :to="{ path: '/artistdetail/album', query: {id}}" tag="div">专辑</router-link>
				<router-link :to="{ path: '/artistdetail/mv', query: {id}}" tag="div">MV</router-link>
				<router-link :to="{ path: '/artistdetail/desc', query: {id}}" tag="div">歌手详情</router-link>
				<router-link :to="{ path: '/artistdetail/similar', query: {id}}" tag="div">相似歌手</router-link>
			</template>
			
			<!-- 内容区 -->
			<template slot="router-view-content">
					<router-view></router-view>
			</template>
		</DetailStructure>
		
	</div>
</template>

<script>
	import {getSingerDetail} from '@/network/Discover/singer';
	import DetailStructure from '@/components/common/DetailStructure';
	import SingerDetailHeader from '@/components/singer/SingerDetailHeader'
	export default {
		name: 'ArtistDetail',
		data(){
			return {
				id: null,
				singer: null
			}
		},
		components: {
			DetailStructure,
			SingerDetailHeader
		},
		methods:{
			getData(){
				this.id = this.$route.query.id;
					
				getSingerDetail(this.id).then(res=>{
					this.singer = res.data.artist;
				})
			}
		},
		created(){
			this.getData()
		},
		watch: {
			$route(to,from){
				this.getData()
			}
		},
	}
	
</script>

<style>
</style>
