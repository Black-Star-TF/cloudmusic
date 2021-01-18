<template>
	<!-- 内容分类展示模块组件 -->
	<div class="category-module">
		<!-- 头部 -->
		<div class="category-module-head">
			
			<div class="title">
				<!-- 分类标题插槽 -->
				<slot name="title"></slot>
			</div>
			
			<div class="catalogue">
				<!-- 分类目录面板插槽 -->
				<slot name="catalogue"></slot>
			</div>
			
			<div class="shortcut">
				<!-- 快捷分类列表插槽 -->
				<slot name="shortcut"></slot>
			</div>
			
		</div>
		
		<!-- 内容插槽 -->
		<div class="category-module-content">
			<slot name="content"></slot>
		</div>
		
	</div>
</template>

<script>
	export default {
		name: 'CategoryModule'
	}
	
</script>

<style>
	.category-module{
		width: 100%;
		margin: 20px 0;
		cursor: default;
	}
	
	/* 模块头部样式 */
	
	.category-module-head{
		box-sizing: border-box;
		width: 100%;
		height: 20px;
		line-height: 20px;
		font-size: 20px;
		color: #fff;
		position: relative;
		z-index: 50px;
		display: flex;
		justify-content: space-between;
	}
	
	/* 头部标题样式 */
	.category-module-head>.title{
		height: 100%;
		color: #d0d0d0;
		position: relative;
		font-weight: 600;
	}

	
	/* 分类目录面板样式 */
	.category-module-head>.catalogue{
		width: 70%;
		position: absolute;
		top: 30px;
		left: 0;
		z-index: 20px;
		overflow: visible;
		box-sizing: border-box;
	}

	
	/* 快捷分类列表样式 */
	.category-module-head>.shortcut{
		height: 100%;
		display: flex;
		justify-content: space-evenly;
	}
	
	/* 模块内容样式 */
	.category-module-content{
		box-sizing: border-box;
		position: relative;
		margin-top: 15px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
</style>
