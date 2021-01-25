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
			<router-view ></router-view>
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
		watch:{
			$route(to, from) {
				//将数据重新加载
				// console.log(this.$router)
			}
		}
	}
</script>

<style>
	/* 引入字体图标样式 */
	@import url("//at.alicdn.com/t/font_2271023_c3gmbejttsu.css");
	
	*{
		padding: 0;
		margin: 0;
	}
	
	.clearfix::after{
		content: "";
		display: block;
		clear: both;
	}

</style>
