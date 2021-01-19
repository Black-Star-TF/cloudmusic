<template>
	<div class="top-list-item-container clear-fix">
		<img :src="toplistItem.coverImgUrl||toplistItem.coverUrl" class="top-list-item-img" @click="toDetail">
		<div class="top-list-item-top5">
			<div class="song-of-top-list-item" v-for="(song,index) in toplistItem.tracks">
				<span class="song-index">Top{{index+1}}</span>
				<span class="song-name">{{song.first}}</span>
				<span class="song-artist">{{song.second}}</span>
			</div>
			<div class="more-of-top-list-item" @click="toDetail">查看全部></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'OfficialToplistItem',
		props:{
			toplistItem:{
				type: Object,
				require: true
			}
		},
		methods:{
			toDetail(){
				// if(this.toplistItem.position != 5){
				// 	this.$router.push({
				// 		path: '/playlistdetail',
				// 		query:{
				// 			id: this.toplistItem.id
				// 		}
				// 	})
				// }else{
				// 	console.log(111);
				// }
			},
			play(){
				
			}
		}
	}
	
</script>

<style>
	
	.top-list-item-container{
		width: 100%;
	}
	
	.top-list-item-img{
		float: left;
		width: 150px;
		display: block;
		margin: 20px;
		border-radius: 5px;
	}
	
	.top-list-item-top5{
		width: 100%;
		float: left;
		width: calc(100% - 190px);
		margin-top: 20px;
	}
	
	.song-of-top-list-item{
		height: 150px;
		height: calc(150px/5);
		line-height: calc(150px/5);
	}
	
	.song-of-top-list-item:nth-of-type(2n-1){
		background-color: rgba(255,255,255,.03);
	}
	
	.song-index{
		font-size: 16px;
		display: inline-block;
		float: left;
		color: red;
		margin: 0 10px;
	}
	
	.song-name{
		font-size: 14px;
		display: inline-block;
		float: left;
		color: #ddd;
	}
	
	.song-artist{
		display: inline-block;
		float: right;
		padding-right: 20px;
		font-size: 14px;
		color: #999;
	}
	
	.more-of-top-list-item{
		height: calc(150px/5);
		line-height: calc(150px/5);
		font-size: 14px;
		color: #999;
		margin-left: 10px;
		cursor: pointer;
	}
	
	.more-of-top-list-item:hover{
		color: #ddd;
	}
</style>
