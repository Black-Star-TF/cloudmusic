<template>
	<DetailHeader type="album">
		<!-- 专辑封面 -->
		<template slot="cover">
			<img :src="album.blurPicUrl" class="album-detail-header-img">
		</template>
		
		<!-- 歌单类型 -->
		<template slot="type">专辑</template>
		<!-- 歌单名称 -->
		<template slot="name">{{album.name}}</template>
		
		<!-- 歌单操作 -->
		<template slot="action">
			<div class="play">播放全部</div>
			<div>收藏</div>
			<div>VIP下载</div>
			<div>分享</div>
		</template>
		
		<template slot="singer">
			歌手：<span>{{album.artist.name}}</span>
		</template>
		
		<template slot="play-info">
			时间：<span class="playlist-song-count">{{publishTime}}</span>
		</template>
	</DetailHeader>
</template>

<script>
	import {formatDate1} from '@/assets/js/tools.js';
	import DetailHeader from '@/components/common/DetailHeader'
	export default {
		name: 'AlbumDetailHeader',
		components:{
			DetailHeader
		},
		props:{
			album:{
				type: Object,
				require: true
			}
		},
		computed:{
			publishTime(){
				return formatDate1(this.album.publishTime)
			}
		}
	}
	
</script>

<style>
</style>
