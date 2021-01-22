<template>
	<div class="radio-detail-header">
		<DetailHeader type="radio" :inline="inline">
			<template slot="cover">
				<!-- 电台封面 -->
				<img :src="radio.picUrl" class="radio-detail-header-img">
			</template>
			<!-- 类型标签 -->
			<template slot="type">电台</template>
			<!-- 电台名称 -->
			<template slot="name">{{radio.name}}</template>
			<!-- 电台主播信息 -->
			<template slot="user-info">
				<img :src="radio.dj.backgroundUrl" class="user-avatar">
				<img :src="radio.dj.avatarDetail.identityIconUrl" class="user-identityIcon"  v-if="radio.dj.avatarDetail">
				<span class="user-nickname">{{radio.dj.nickname}}</span>
			</template>
			<!-- 对电台的操作 -->
			<template slot="action">
				<div class="play">播放全部</div>
				<div>订阅</div>
				<div>分享</div>
			</template>
			<!-- 电台简介 -->
			<template slot="desc">
				<span class="tag">{{radio.category}}</span><span>{{radio.desc}}</span>
			</template>
		</DetailHeader>
	</div>
</template>

<script>
	import DetailHeader from '@/components/common/DetailHeader'
	export default {
		name: 'DJDetailHeader',
		components:{
			DetailHeader
		},
		props:{
			radio:{
				type: Object,
				require: true
			}
		},
		computed:{
			inline(){
				return this.radio.desc.indexOf('\n') == -1;
			}
		}
	}
	
</script>

<style>
		
	
</style>
