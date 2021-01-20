<template>
	<div class="video-mv">
		<!-- 最新MV -->
		<CategoryModule>
			<template slot="title">
				<router-link :to="{path: '/totalmv', query: {order: '最新', area: currentArea}}" tag="div" class="title">最新MV</router-link>
			</template>
			<template slot="shortcut">
				<div class="area-container">
					<span class="area-item-container" v-for="(item,index) in area"><span class="area-item" :class="{'active': item == currentArea}" @click="changeArea(item)">{{item}}</span><span class="dilimiter" v-if="index < area.length - 1">|</span></span>
				</div>
			</template>
			<template slot="content">
				<VideoItem v-for="video in newestMV" :video="video" :columns="4" v-if="newestMV"></VideoItem>
				<Loading v-else></Loading>
			</template>
		</CategoryModule>
		
		<!-- 热播MV -->
		<CategoryModule>
			<template slot="title">
				<router-link :to="{path: '/totalmv', query: {order: '最热'}}" tag="div" class="title">热播MV</router-link>
			</template>
			<template slot="content">
				<VideoItem v-for="video in hotMV" :video="video" :columns="4" v-if="hotMV"></VideoItem>
				<Loading v-else></Loading>
			</template>
		</CategoryModule>
		
		<!-- 网易出品 -->
		<CategoryModule>
			<template slot="title">
				<router-link :to="{path: '/totalmv', query: {order: '最新', type: '网易出品'}}" tag="div" class="title">网易出品</router-link>
			</template>
			<template slot="content">
				<ExclusiveVideoItem v-for="exclusiveVideo in exclusiveMV" :exclusiveVideo="exclusiveVideo" :columns="4" showPlayCount v-if="exclusiveMV"></ExclusiveVideoItem>
				<Loading v-else></Loading>
			</template>
		</CategoryModule>
		
		<!-- MV排行榜 -->
		<CategoryModule>
			<template slot="title">
				<router-link :to="{ path: '/mvtoplist', query: { area: currentTopListArea}}" tag="div" class="title">MV排行榜</router-link>
			</template>
			<template slot="shortcut">
				<div class="area-container">
					<span class="area-item-container" v-for="(item,index) in area"><span class="area-item" :class="{'active': item == currentTopListArea}" @click="changeTopListArea(item)">{{item}}</span><span class="dilimiter" v-if="index < area.length - 1">|</span></span>
				</div>
			</template>
			<template slot="content">
				<MVTopListItem v-for="(item,index) in MVTopList" :mvToplistItem="item" :index="index+1" v-if="MVTopList"></MVTopListItem>
				<Loading v-else></Loading>
			</template>
		</CategoryModule>
	</div>
</template>

<script>
	import {getNewestMV,getTotalMV,getExclusiveMV,getMVToplist} from '@/network/Video/mv'
	import CategoryModule from '@/components/common/CategoryModule';
	import VideoItem from '@/components/video/VideoItem';
	import ExclusiveVideoItem from '@/components/video/ExclusiveVideoItem';
	import MVTopListItem from '@/components/video/MVTopListItem';
	import Loading from '@/components/common/Loading';
	export default {
		name: 'MV',
		data(){
			return{
				newestMV: null,
				hotMV: null,
				exclusiveMV: null,
				area: ['内地', '港台', '欧美', '日本', '韩国'],
				currentArea: '内地',
				currentTopListArea: '内地',
				limit: 8,
				MVTopList: null,
				topListLimit: 10
			}
		},
		components:{
			CategoryModule,
			VideoItem,
			ExclusiveVideoItem,
			MVTopListItem,
			Loading
		},
		methods:{
			changeTopListArea(item){
				this.currentTopListArea = item;
				this.getMVToplistData();
			},
			changeArea(item){
				this.currentArea = item;
				this.getNewestMVData();
			},
			getNewestMVData(){
				getNewestMV(this.currentArea,this.limit).then(res=>{
					this.newestMV = res.data;
				})
			},
			getMVToplistData(){
				getMVToplist(this.currentTopListArea,this.topListLimit).then(res=>{
					this.MVTopList = res.data;
				})
			}
		},
		created(){
			// 请求最新mv数据
			this.getNewestMVData();
			
			// 请求热播MV
			getTotalMV(this.limit).then(res=>{
				this.hotMV = res.data;
			});
			
			// 请求网易出品
			getExclusiveMV(this.limit).then(res=>{
				this.exclusiveMV = res.data;
			});
			
			// 请求mv排行榜
			this.getMVToplistData();
		}
	}
	
</script>

<style>
	
	.title{
		font-size: 16px;
		cursor: pointer;
	}
	
	.area-container{
		font-size: 12px;
		height: 24px;
		line-height: 24px;
		color: #878787;
	}
	
	.area-item{
		display: inline-block;
		width: 45px;
		height: 24x;
		line-height: 24px;
		margin: 0 5px;
		text-align: center;
		border-radius: 12px;
		cursor: pointer;
	}
	
	.area-item:hover{
		color: #d0d0d0;
	}
	
	.area-item + .dilimiter{
		color: #333;
	}
	
	.area-item.active{
		background-color: rgba(255,0,0,0.06);
		color: red;
	}
</style>
