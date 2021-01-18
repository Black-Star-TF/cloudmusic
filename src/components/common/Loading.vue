<template>
	<div class="loading-container">
		<div class="loading-icon"></div>
		<div class="loading-icon"></div>
		<div class="loading-icon"></div>
		<div class="loading-icon"></div>
		<div class="loading-icon"></div>
		<div class="loading-icon"></div>
		<div class="loading-icon"></div>
		<div class="loading-icon"></div>
	</div>
</template>

<script>
	export default {
		name: 'Loading'
	}
	
</script>

<style>
	.loading-container{
		width: 30px;
		height: 30px;
		margin: 0 auto;
		animation: rotate 1s linear infinite;
	}
	
	.loading-icon{
		width: 30px;
		height: 30px;
		border-radius: 50%;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}
	
	.loading-icon:nth-of-type(1){
		transform: rotate(45deg);
	}
	.loading-icon:nth-of-type(2){
		transform: rotate(90deg);
	}
	.loading-icon:nth-of-type(3){
		transform: rotate(135deg);
	}
	.loading-icon:nth-of-type(4){
		transform: rotate(180deg);
	}
	.loading-icon:nth-of-type(5){
		transform: rotate(225deg);
	}
	.loading-icon:nth-of-type(6){
		transform: rotate(270deg);
	}
	.loading-icon:nth-of-type(7){
		transform: rotate(315deg);
	}
	
	.loading-icon::after{
		content: "";
		display: block;
		width: 3px;
		height: 6px;
		background-color: rgba(0,0,0,.3);
	}
	
	.loading-icon:nth-of-type(1)::after{
		background-color: rgba(0,0,0,.5);
	}
	
	.loading-icon:nth-of-type(2)::after{
		background-color: rgba(0,0,0,.7);
	}
	
	.loading-icon:nth-of-type(3)::after{
		background-color: rgba(0,0,0,.9);
	}
	
	@keyframes rotate{
		0%{
			transform: rotate(0deg);
		}
		12.5%{
			transform: rotate(45deg);
		}
		25%{
			transform: rotate(90deg);
		}
		37.5%{
			transform: rotate(135deg);
		}
		50%{
			transform: rotate(180deg);
		}
		62.5%{
			transform: rotate(225deg);
		}
		75%{
			transform: rotate(270deg);
		}
		87.5%{
			transform: rotate(315deg);
		}
		100%{
			transform: rotate(360deg);
		}
	}
</style>
