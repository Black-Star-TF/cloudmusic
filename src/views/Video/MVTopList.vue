<template>
	<div class="mv-top-list">
		<!-- 标题 -->
		<div class="mv-top-list-title">MV排行榜</div>
		<div class="mv-top-list-main">
			<CategoryModule>
				<template slot="title">
					<div class="update-time">最近更新：今天</div>
					</template>
				<template slot="shortcut">
					<div class="area-container">
						<span class="area-item-container" v-for="(item,index) in area"><span class="area-item" :class="{'active': item == currentTopListArea}" @click="changeTopListArea(item)">{{item}}</span><span class="dilimiter" v-if="index < area.length - 1">|</span></span>
					</div>
				</template>
				<template slot="content">
					<MVTopListItem v-for="(item,index) in MVTopList" :mvToplistItem="item" :index="index+1" v-if="MVTopList"></MVTopListItem>
				</template>
			</CategoryModule>
			<Loading v-if="!MVTopList"></Loading>
		</div>
	</div>
</template>

<script>
	import {getMVToplist} from '@/network/Video/mv'
	import CategoryModule from '@/components/common/CategoryModule';
	import MVTopListItem from '@/components/video/MVTopListItem';
	import Loading from '@/components/common/Loading';
	export default {
		name: 'MVTopList',
		data(){
			return{
				area: ['内地', '港台', '欧美', '日本', '韩国'],
				currentTopListArea: '内地',
				topListLimit: 50,
				MVTopList: null
			}
		},
		components:{
			CategoryModule,
			MVTopListItem,
			Loading
		},
		methods:{
			changeTopListArea(item){
				this.currentTopListArea = item;
				this.getMVToplistData()
			},
			getMVToplistData(){
				this.MVTopList = null
				getMVToplist(this.currentTopListArea,this.topListLimit).then(res=>{
					this.MVTopList = res.data;
				})
			}
		},
		created(){
			this.currentTopListArea = this.$route.query.area || this.currentTopListArea;
			this.getMVToplistData();
		}
	}
	
</script>

<style>
	
	.mv-top-list-title{
		padding-left: 20px;
		height: 60px;
		background-color: rgb(34,34,34);
		position: sticky; 
		top: 0;
		z-index: 1000;
		color: #afafaf;
		line-height: 60px;
		font-size: 20px;
		font-weight: 600;
		cursor: pointer;
	}
	
	.mv-top-list-title:hover{
		color: #fff;
	}
	
	.mv-top-list-main{
		width: 85%;
		margin: 0 auto;
	}
	
	.update-time{
		font-size: 12.5px;
		color: #666;
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
