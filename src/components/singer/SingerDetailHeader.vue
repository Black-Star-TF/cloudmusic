<template>
	<div class="singer-detail-header">
		<DetailHeader type="singer">
			<!-- 歌手照片 -->
			<template slot="cover">
				<img v-lazy="singer.cover" class="playlist-detail-header-img">
			</template>
			
			<!-- 歌手名称	 -->
			<template slot="name">{{singer.name}}</template>
			
			<!-- 操作 -->
			<template slot="action">
				<div>收藏</div>
				<div>个人主页</div>
			</template>
			
			<!-- 歌手作品信息 -->
			<template slot="play-info">
				单曲数：{{singer.musicSize}}
				专辑数：{{singer.albumSize}}
				MV数：{{singer.mvSize}}
			</template>
		</DetailHeader>
	</div>
</template>

<script>
	import DetailHeader from '@/components/common/DetailHeader'
	export default {
		name: 'SingerDetailHeader',
		props: {
			singer: {
				type: Object,
				require: true
			},
		},
		components: {
			DetailHeader
		},
	}
	
</script>

<style>
</style>
