<template>
	<!-- 歌单项组件 -->
	<div class="playlist-item" :style="itemStyle">
		<!-- 歌单封面 -->
		<div class="playlist-cover-container">
			<img :src="playlist.picUrl||playlist.coverImgUrl" class="playlist-cover" @click="toPlaylistDetail">
			
			<!-- 播放按钮 -->
			<div class="playlist-play-btn"><span class="iconfont icon-bofang2"></span></div>
			
			<!-- 歌单作者 -->
			<div class="playlist-creator" v-if="showCreator">
				<span class="iconfont icon-yonghu"></span>{{playlist.creator.nickname}}
				<img class="playlist-creator-identity" :src="playlist.creator.avatarDetail.identityIconUrl" v-if="playlist.creator.avatarDetail">
			</div>
		</div>
		
		<!-- 歌单名称 -->
		<div class="playlist-name" @click="toPlaylistDetail">{{playlist.name}}</div>
		<!-- 播放量 -->
		<div class="playlist-play-count"><span class="iconfont icon-bofang1"></span> {{playCount}}</div>
		
		
	</div>
</template>

<script>
	export default {
		name: 'PlaylistItem',
		props:{
			playlist:{
				type: Object,
				require: true
			},
			columns:{
				default: 5
			},
			showCreator:{
				type: Boolean,
				default: true
			},
			index:{
				type: Number,
				require: true
			}
		},
		methods:{
			toPlaylistDetail(){
				this.$router.push({
					path: '/playlistdetail',
					query: {
						id: this.playlist.id
					}
				})
			}
		},
		computed:{
			itemStyle(){
				let mr = '20px'
				if( (this.index + 1) % this.columns == 0){
					mr = 0
				}
				return{
					width: `calc((100% - ${this.columns - 1} * 20px) / ${this.columns})`,
					marginRight: mr
				}
			},
			playCount(){
				return this.playlist.playCount >= 100000 ? Math.floor(this.playlist.playCount/10000) + '万': this.playlist.playCount;
			}
		}
	}
	
</script>

<style>
	.playlist-item{
		margin-bottom: 20px;
		position: relative;
	}
	
	.playlist-cover-container{
		overflow: hidden;
		position: relative;
		margin-bottom: 10px;
		
	}
	
	.playlist-cover{
		width: 100%;
		display: block;
		border-radius: 5px;
		cursor: pointer;
	}
	
	.playlist-play-btn{
		position: absolute;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background-color: rgba(255,255,255,.8);
		bottom: 10px;
		right: 10px;
		text-align: center;
		cursor: pointer;
		/* visibility: hidden; */
		display: none;
		z-index: 2;
	}
	
	.playlist-cover-container:hover>.playlist-play-btn{
		/* visibility: visible; */
		display: block;
	}
	
	.playlist-play-btn>.iconfont{
		color: red;
		font-size: 25px;
		line-height: 40px;
		position: relative;
		left: 2px;
		top: 1px;
	}
	
	.playlist-creator{
		width: 100%;
		height: 40px;
		line-height: 40px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		color: #fff;
		position: absolute;
		bottom: 0;
		font-size: 12px;
		text-indent: .5em;
		background-image: linear-gradient(rgba(0,0,0,.05), rgba(0,0,0,.5));
		cursor: pointer;
		z-index: 1;
	}
	
	.playlist-creator>.iconfont{
		display: inline-block;
		-webkit-transform: scale(.6);
		position: relative;
		top: 2px;
		color: #ccc;
	}
	
	.playlist-creator-identity{
		height: 14px;
		position: relative;
		top: 2px;
	}
	
	.playlist-item>.playlist-name{
		line-height: 20px;
		font-size: 14px;
		color: #D0D0D0;
		cursor: pointer;
	}
	
	.playlist-item>.playlist-name:hover{
		color: #fff;
	}
	
	.playlist-play-count{
		position: absolute;
		font-size: 12px;
		color: #fff;
		top: 3px;
		right: 7px;
		cursor: pointer;
	}
	
	.playlist-play-count>.iconfont{
		font-size: 12px;
	}
	
	
</style>
