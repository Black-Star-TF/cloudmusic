<template>
  <div id="app">
    <!-- 页面主要有四个部分组成：头部、侧面导航栏、底部播放控件、内容区域 -->
		
		<!-- 头部 -->
		<Header></Header>
		
		<!-- 侧边导航栏 -->
		<SideBar></SideBar>
		
		<!-- 内容区域 -->
		<Content ref="content">
			<keep-alive>
				<router-view  v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</Content>
		
		<!-- 底部播放控件 -->
		<ControlBar></ControlBar>
  </div>
</template>

<script>
	import Header from'@/components/main/Header'
	import SideBar from'@/components/main/SideBar'
	import Content from '@/components/main/Content'
	import ControlBar from '@/components/main/ControlBar'
	export default{
		components:{
			Header,
			SideBar,
			Content,
			ControlBar
		},
		methods: {
			saveData() {
				localStorage.setItem("currentSong",JSON.stringify(this.$store.state.currentSong))
				localStorage.setItem("playlist",JSON.stringify(this.$store.state.currentPlaylist))
				localStorage.setItem("history",JSON.stringify(this.$store.state.history))
			}
		},
		created(){
			// 页面打开读取播放列表和播放历史数据
			if(localStorage.playlist && localStorage.currentSong&&localStorage.history){
				let playlist = JSON.parse(localStorage.getItem("playlist"));
				let currentSong = JSON.parse(localStorage.getItem("currentSong"));
				let history = JSON.parse(localStorage.getItem("history"));
				this.$store.commit('getLocalData',{playlist,currentSong,history})
			}
			
			// 页面关闭前保存播放列表和播放历史
			window.addEventListener('beforeunload', this.saveData)
		},
		destroyed(){
			// 移除事件
			window.addEventListener('beforeunload', this.saveData)
		}
	}
</script>

<style>
	/* 引入字体图标样式 */
	@import url("//at.alicdn.com/t/font_2271023_s95ayzlc4y.css");
	
	*{
		padding: 0;
		margin: 0;
	}
	
	.clearfix::after{
		content: "";
		display: block;
		clear: both;
	}

	/* 设置滚动条样式 */
	.scroll::-webkit-scrollbar{
		width: 5px;
		height: 1px;
	}
	
	 /*滚动条里面小方块*/
	.scroll::-webkit-scrollbar-thumb{
	border-radius: 10px;
	box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	background: #3c3c3c;
	}
</style>
