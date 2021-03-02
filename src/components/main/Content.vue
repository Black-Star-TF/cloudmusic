<template>
	<div class="app-content scroll" ref="main">
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
		min-width: 900px;
		width: calc(100vw - 200px);
		height: calc(100vh - 130px);
		margin-top: 60px;
		position: absolute;
		right: 0;
		background-color: rgb(34,34,34);
		overflow: hidden;
		overflow-y: auto;
	}
</style>
