<template>
	<div class="relative-video-item-container clearfix">
		<img :src="relativeVideoItem.coverUrl" class="relative-video-item-img" @click="toDetail">
		<div class="relative-video-item-info">
			<div class="relative-video-item-title" @click="toDetail">{{relativeVideoItem.title||relativeVideoItem.title}}</div>
			<div class="relative-video-item-creators">
				<span v-for="(item,index) in relativeVideoItem.creator">
					<span class="relative-video-item-creator">{{item.userName}}</span>
					<span v-if="index < relativeVideoItem.creator.length -1 " class="delimiter">/</span></span>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		name: 'RelativeVideoItemCpn',
		props:{
			relativeVideoItem:{
				type: Object,
				require: true
			}
		},
		methods:{
			toDetail(){
				this.$router.push({
					path: '/videodetail',
					query:{
						id: this.relativeVideoItem.vid
					}
				})
			}
		}
	}
	
</script>

<style>
	.relative-video-item-container{
		width: 100%;
		margin-bottom: 10px;
		height: 80px;
	}
	
	.relative-video-item-img{
		width: 50%;
		height: 100%;
		float: left;
		border-radius: 5px;
		cursor: pointer;
	}
	
	.relative-video-item-info{
		width: 50%;
		float: left;
		height: 84px;
		box-sizing: border-box;
		position: relative;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
	
	.relative-video-item-title{
		height: 40px;
		line-height: 20px;
		position: absolute;
		top: 10px;
		left: 10px;
		cursor: pointer;
		width: 100%;
		font-size: 14px;
		color: #ccc;
		margin-bottom: 15px;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.relative-video-item-creators{
		position: absolute;
		bottom: 10px;
		left: 10px;
		width: 100%;
		font-size: 12px;
		color: #777;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
		
	.relative-video-item-creator{
		cursor: pointer;
	}
	
	.relative-video-item-creator:hover{
		color: #bbb;
	}
</style>

