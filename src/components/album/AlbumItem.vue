<template>
	<div class="album-item">
		<!-- 专辑封面 -->
		<img :src="album.picUrl"  class="album-cover" @click="toAlbumDetail">
		
		<!-- 专辑名称 -->
		<div class="album-name" @click="toAlbumDetail">{{album.name}}<span class="album-alias" v-if="album.alias.length>0">（{{album.alias[0]}})</span></div>
		
		<!-- 专辑发布时间 -->
		<div class="album-publish-time">{{publishTime}}</div>
	</div>
</template>

<script>
	import {formatDate1} from '@/assets/js/tools.js';
	export default {
		name: 'AlbumItem',
		props: {
			album: {
				type: Object,
				require: true
			}
		},
		computed: {
			publishTime(){
				return formatDate1(this.album.publishTime)
			}
		},
		methods: {
			toAlbumDetail(){
				this.$router.push({
					path: '/albumdetail',
					query:{
						id: this.album.id
					}
				})
			},
		},
	}
	
</script>

<style>
	.album-item{
		margin-right: 40px;
		margin-top: 10px;
		margin-bottom: 10px;
		width: calc((100% - 210px)/6);
		cursor: default
	}
	
	.album-item:nth-of-type(6n+6){
		margin-right: 0;
	}
	.album-cover{
		width: 100%;
		border-radius: 5px;
		display: block;
		cursor: pointer;
	}
	
	.album-name{
		color: #d0d0d0;
		font-size: 14px;
		line-height: 20px;
		max-height: 40px;
		margin: 7px 0;
		cursor: pointer;
		overflow:hidden;/*须给一个高，以便不支持时不显示超出内容*/
		display:-webkit-box;
		-webkit-line-clamp:2;/*显示3行，超出的用省略号代替*/
		-webkit-box-orient:vertical
	}
	
	.album-name:hover{
		color: #fff;
	}
	
	.album-name>.album-alias{
		color: #666;
	}
	
	.album-publish-time{
		color: #666;
		font-size: 12px;
		line-height: 20px;
	}
</style>
