<template>
	<div class="album-detail-container">
		<div class="album-detail-title">专辑介绍</div>
		<div class="album-detail-content">
			<div v-for="line in descArr" v-if="line!=''">{{line}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Detail',
		props:{
			album: {
				type: Object,
				require: true
			}
		},
		computed:{
			descArr(){
				return this.album.description.split('\n')
			}
		}
	}
	
</script>

<style>
	.album-detail-container{
		width: 95%;
		margin: 0 auto;
		padding-bottom: 50px;
	}
	
	.album-detail-title{
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		font-weight: 600;
		color: #d0d0d0;
	}
	
	.album-detail-content{
		color: #878787;
		font-size: 14px;
	}
	
	.album-detail-content>div{
		line-height: 30px;
		text-indent: 2em;
	}
</style>
