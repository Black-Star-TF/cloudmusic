<template>
	<div class="app-content" ref="main">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: 'Content'
	}
	
</script>

<style>
	.app-content{
		width: calc(100vw - 200px);
		height: calc(100vh - 130px);
		margin-top: 60px;
		margin-left: 200px;
		background-color: rgb(34,34,34);
		overflow-y: auto;
	}
	
	
	/* 设置滚动条样式 */
	.app-content::-webkit-scrollbar{
		width: 5px;
		height: 1px;
	}
	
	 /*滚动条里面小方块*/
	.app-content::-webkit-scrollbar-thumb{
	border-radius: 10px;
	box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	background: #3c3c3c;
	}
</style>
