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
		width: calc(100vw - 200px);
		height: calc(100vh - 130px);
		margin-top: 60px;
		margin-left: 200px;
		background-color: rgb(34,34,34);
		overflow-y: auto;
	}
</style>
