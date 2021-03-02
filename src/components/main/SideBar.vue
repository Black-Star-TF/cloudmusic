<template>
	<div class="app-sidebar scroll">
		<!-- 侧边导航栏包括  -->
		
		<!-- <slot></slot> -->
		<router-link to="/discover" tag="div" class="menu-item">发现音乐</router-link>
		<router-link to="/video" tag="div" class="menu-item">视频</router-link>
		<router-link to="/1" tag="div" class="menu-item">朋友</router-link>
		<router-link to="/2" tag="div" class="menu-item">直播</router-link>
		<router-link to="/3" tag="div" class="menu-item">私人FM</router-link>
		<!-- 登录后显示我的歌单 -->
		<div class="title-my-playlist" @click="showPlaylist">创建的歌单</div>
		<div class="playlist-item" v-for="item in playlists" v-if="show" @click="toPlaylistDetail(item.id)">{{item.name}}</div>
		<div class="title-my-playlist">收藏的歌单</div>
	</div>
</template>

<script>
	import {getUserPlaylist} from '@/network/Login/login'
	export default {
		name: 'SideBar',
		data(){
			return {
				playlists: [],
				show: false
			}
		},
		computed: {
			uid() {
				return this.$store.state.uid
			}
		},
		methods: {
			toPlaylistDetail(id){
				this.$router.push({
					path: '/playlistdetail',
					query: {
						id
					}
				})
			},
			getPlaylist() {
				getUserPlaylist(this.uid).then(res=>{
					this.playlists = res.playlist;
					console.log(this.playlists);
				})
			},
			showPlaylist(){
				this.show = !this.show;
			}
		},
		created(){
			if(this.uid){
				this.getPlaylist();
			}
		},
		watch: {
			uid(val) {
				if(val){
					this.getPlaylist();
				}
			}
		},
	}
	
</script>

<style>
	.app-sidebar{
		position: absolute;
		height: calc(100vh - 130px);
		width: 200px;
		top: 60px;
		left: 0;
		background-color: rgb(34,34,34);
		box-sizing: border-box;
		border-right: 1px solid #444;
		cursor: pointer;
		color: #ccc;
		overflow: hidden;
	}
	
	/* 鼠标移入导航栏时,设置滚动条自适应 */
	.app-sidebar:hover{
		overflow-y: auto;
	}
	
	.app-sidebar>div{
		width: 90%;
		height: 40px;
		line-height: 40px;
		margin: 1% auto;
		padding-left: 10px;
		box-sizing: border-box;
	}
	
	.menu-item{
		font-size: 16px;
	}
	
	.app-sidebar>.menu-item:hover,.app-sidebar>.playlist-item:hover{
		background-color: #333;
		color: #fff;
	}
	
	.menu-item.router-link-active{
		color: #FFF;
		font-weight: 600;
		background-color: rgba(255,255,255,.05);
	}
	
	.title-my-playlist{
		font-size: 13px;
		color: #666;
	}
	
	.playlist-item{
		font-size: 14px;
	}

</style>
