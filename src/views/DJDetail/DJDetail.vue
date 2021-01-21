<template>
	<div class="dj-detail">
		<!-- 头部信息 -->
		<DetailStructure>
			<template slot="header">
				<DJDetailHeader :radio="radio" v-if="radio"></DJDetailHeader>
			</template>
			
			<!-- 导航栏 -->
			<template slot="router-nav">
				<router-link :to="{ path: '/djdetail/program', query: {id}}" tag="div">节目</router-link>
				<!-- <router-link :to="{ path: '/playlistdetail/comment', query: {id}}" tag="div">订阅者({{playlist.commentCount}})</router-link> -->
			</template>
			
			<!-- 内容区 -->
			<template slot="router-view-content">
					<router-view :radio="radio"></router-view>
			</template>
		</DetailStructure>
	</div>
</template>

<script>
	import {getDJDetail} from '@/network/Discover/djProgram'
	import DetailStructure from '@/components/common/DetailStructure'
	import DJDetailHeader from '@/components/DJProgram/DJDetailHeader'
	export default {
		name: 'DJDetail',
		data(){
			return {
				id: null,
				radio: null
			}
		},
		components:{
			DetailStructure,
			DJDetailHeader
		},
		created(){
			this.id = this.$route.query.id
			getDJDetail(this.id).then(res=>{
				this.radio = res.data
			})
		}
	}
	
</script>

<style>
</style>
