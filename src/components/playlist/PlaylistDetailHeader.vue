<template>
	<div class="playlist-detail-header">
		<DetailHeader>
			<template slot="cover">
				<!-- 歌单封面 -->
				<img :src="playlist.coverImgUrl" class="playlist-detail-header-img">
			</template>
			
			<template slot="type">歌单</template>
			<template slot="name">{{playlist.name}}</template>
			<template slot="user-info">
				<img :src="creator.avatarUrl" class="user-avatar">
				<img :src="creator.avatarDetail.identityIconUrl" class="user-identityIcon"  v-if="creator.avatarDetail">
				<span class="user-nickname">{{creator.nickname}}</span>
				<span class="create-time" v-if="playlist.specialType==0">{{createDate}}</span>
				<span class="update-time" v-if="playlist.specialType==10">最近更新: {{updateDate}}</span>
			</template>
			<!-- 歌单操作 -->
			<template slot="action">
				<div class="play">播放全部</div>
				<div>收藏</div>
				<div>分享</div>
				<div>下载全部</div>
			</template>
			
			<!-- 歌单标签 -->
			<template slot="tags" v-if="playlist.specialType==0">
				标签：<span class="tag" v-for="(tag,index) in playlist.tags"><span class="tagname" @click="tagClick(tag)">{{tag}}</span>{{(index < playlist.tags.length-1) ? ' / ' : ''}}</span>
			</template>
			
			<!-- 歌单相关信息 -->
			<template slot="play-info">
				歌曲：<span class="playlist-song-count">{{playlist.trackCount}}</span>
				播放：<span class="playlist-playcount">{{Math.floor(playlist.playCount/10000)+"万"}}</span>
			</template>
			
			<template slot="desc">
				<span class="text">简介：{{playlist.description}}</span>
			</template>
			
		</DetailHeader>
	</div>
</template>

<script>
	import {formatDate1} from '@/assets/js/tools.js';
	import DetailHeader from '@/components/common/DetailHeader'
	export default{
		name: 'PlaylistDetailHeader',
		components:{
			DetailHeader
		},
		props:{
			playlist:{
				require:true
			},
			type:{
				type: String,
				require: true
			}
		},
		computed:{
			createDate(){
				return formatDate1(this.playlist.createTime)+'创建'
			},
			updateDate(){
				let time = formatDate1(this.playlist.updateTime).split('-');
				return parseInt(time[1])+'月'+parseInt(time[2])+'日';
			},
			creator(){
				return this.playlist.creator
			}
		},
		methods:{
			tagClick(tag){
				this.$router.push({
					path: '/discover/playlist',
					query:{
						tag
					}
				})
			}
		}
	}
</script>

<style>
</style>

