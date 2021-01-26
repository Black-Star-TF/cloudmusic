<template>
	<div class="playlist-detail-header">
		<DetailHeader type="playlist" :inline="inline" :tags="playlist.specialType==0">
			
			<!-- 歌单封面 -->
			<template slot="cover">
				<img :src="playlist.coverImgUrl" class="playlist-detail-header-img">
			</template>
			
			<!-- 歌单类型 -->
			<template slot="type">歌单</template>
			<!-- 歌单名称 -->
			<template slot="name">{{playlist.name}}</template>
			<!-- 歌单创建者信息 -->
			<template slot="user-info">
				<img :src="creator.avatarUrl" class="user-avatar">
				<img :src="creator.avatarDetail.identityIconUrl" class="user-identityIcon"  v-if="creator.avatarDetail">
				<span class="user-nickname">{{creator.nickname}}</span>
				<!-- 歌单创建时间 -->
				<span class="create-time" v-if="playlist.specialType==0">{{createDate}}</span>
				<!-- 歌单更新时间 -->
				<span class="update-time" v-if="playlist.specialType==10">最近更新: {{updateDate}}</span>
			</template>
			<!-- 歌单操作 -->
			<template slot="action">
				<div class="play" @click="playAll">播放全部</div>
				<div>收藏</div>
				<div>分享</div>
				<div>下载全部</div>
			</template>
			
			<!-- 歌单分类标签 -->
			<template slot="tags" v-if="playlist.tags.length>0">
				标签：<span class="tag" v-for="(tag,index) in playlist.tags"><span class="tagname" @click="tagClick(tag)">{{tag}}</span>{{(index < playlist.tags.length-1) ? ' / ' : ''}}</span>
			</template>
			
			<!-- 歌单相关信息 -->
			<template slot="play-info">
				歌曲：<span class="playlist-song-count">{{playlist.trackCount}}</span>
				播放：<span class="playlist-playcount">{{Math.floor(playlist.playCount/10000)+"万"}}</span>
			</template>
			
			
			<!-- 歌单简介 -->
			<template slot="desc">简介：<span class="text">{{playlist.description}}</span></template>
			
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
				return formatDate1(this.playlist.createTime)+'创建';
			},
			updateDate(){
				let time = formatDate1(this.playlist.updateTime).split('-');
				return parseInt(time[1])+'月'+parseInt(time[2])+'日';
			},
			creator(){
				return this.playlist.creator;
			},
			inline(){
				return this.playlist.description.indexOf('\n') == -1;
			}
		},
		methods:{
			playAll(){
				this.$emit('playallclick')
			},
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

