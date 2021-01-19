<template>
	<div class="toplist">
		
		<!-- 官方榜 -->
		<CategoryModule>
			<template slot="title">官方榜</template>
			<template slot="content">
				<!-- 每日更新 -->
				<OfficialToplistItem :toplistItem="toplistItem" v-for="(toplistItem,index) in songToplists" v-if="songToplists && index < 4"></OfficialToplistItem>
				<!-- 歌手榜 -->
				<OfficialToplistItem :toplistItem="artistToplist" v-if="artistToplist"></OfficialToplistItem>
			</template>
		</CategoryModule>
		
		<!-- 全球榜 -->
		<CategoryModule>
			<template slot="title">全球榜</template>
			<template slot="content">
				<GlobalToplistItem v-for="(toplist,index) in songToplists" :toplistItem="toplist" v-if="songToplists && index >=4"></GlobalToplistItem>
			</template>
		</CategoryModule>
	</div>
</template>

<script>
	import {getAllToplistSummary} from '@/network/Discover/toplist';
	import CategoryModule from '@/components/common/CategoryModule';
	import OfficialToplistItem from '@/components/toplist/OfficialToplistItem';
	import GlobalToplistItem from '@/components/toplist/GlobalToplistItem';
	export default {
		name: 'TopList',
		data(){
			return{
				songToplists: null,
				artistToplist: null
			}
		},
		components:{
			CategoryModule,
			OfficialToplistItem,
			GlobalToplistItem
		},
		created(){
			// 获取所有榜单摘要数据
			getAllToplistSummary().then(res=>{
				this.songToplists = res.list;
				this.artistToplist = res.artistToplist;
			})
		}
	}
	
</script>

<style>
</style>
