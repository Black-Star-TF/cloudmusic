<template>
  <div id="app">
    <!-- 页面主要有四个部分组成：头部、侧面导航栏、底部播放控件、内容区域 -->
		
		<!-- 头部 -->
		<Header></Header>
		
		<!-- 侧边导航栏 -->
		<SideBar></SideBar>
		
		<!-- 内容区域 -->
		<Content>
			<router-view></router-view>
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
		data(){
			return {}
		},
		
	}
</script>

<style>
	
	@import url("//at.alicdn.com/t/font_2271023_ttddmxjs5l.css");
	*{
		padding: 0;
		margin: 0;
	}

</style>
