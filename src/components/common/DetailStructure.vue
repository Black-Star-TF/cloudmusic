<template>
	<div class="detail-structure-container">
		
		<slot name="header"></slot>
		
		<div class="detail-structure-nav-container">
			<slot name="router-nav"></slot>
		</div>
		
		<div class="detail-structure-content">
			<slot name="router-view-content"></slot>
		</div>
		
	</div>
</template>

<script>
	export default {
		name: 'DetailStructure'
	}
	
</script>

<style>
		
	.detail-structure-container{
		width: 100%;
	}
	.detail-structure-container .detail-structure-nav-container{
		width: 100%;
		padding-left: 12px;
		overflow: auto;
	}
	
	.detail-structure-container>.detail-structure-nav-container>div{
		font-size: 14px;
		float: left;
		margin: 0 20px;
		color: #d0d0d0;
		position: relative;
		cursor: pointer;
	}
	
	.detail-structure-container>.detail-structure-nav-container>div::after{
		content: '';
		display: block;
		margin: 0 auto;
		margin-top: 3px;
		height: 3px;
		width: 80%;
	}
	
	.play-list-structure-container{
		width: 100%;
	}
	
	.detail-structure-container>.detail-structure-nav-container>div.router-link-active{
		font-weight: 600;
		background-color: transparent;
	}
	
	.detail-structure-container>.detail-structure-nav-container>div.router-link-active::after{
		background-color: #ec4141;
	}
	
	
	.detail-structure-content{
		padding-top: 10px;
	}
</style>

