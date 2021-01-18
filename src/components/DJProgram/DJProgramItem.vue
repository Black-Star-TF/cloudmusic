<template>
	<div class="DJ-program-item" :style="itemStyle">
		<!-- 电台封面 -->
		<img :src="DJProgram.picUrl" class="DJ-program-cover">
		<!-- 电台名称 -->
		<div class="DJ-program-name">{{DJProgram.name}}</div>
		<!-- 电台描述 -->
		<div class="DJ-program-desc">{{DJProgram.rcmdtext}}</div>
	</div>
</template>

<script>
	export default {
		name: 'DJProgramItem',
		props:{
			DJProgram:{
				type: Object,
				require: true
			},
			columns:{
				default: 6
			}
		},
		computed:{
			itemStyle(){
				return{
					width: `calc(100%/${this.columns} - 10px)`
				}
			}
		}
	}
	
</script>

<style>
	.DJ-program-item{
		margin-bottom: 20px;
		position: relative;
	}
	
	.DJ-program-cover{
		width: 100%;
		display: block;
		border-radius: 5px;
		margin-bottom: 10px;
		cursor: pointer;
	}
	.DJ-program-name{
		width: 100%;
		height: 40px;
		line-height: 40px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		color: #fff;
		position: absolute;
		bottom: 50px;
		font-size: 13px;
		text-indent: .5em;
		background-image: linear-gradient(rgba(0,0,0,.05), rgba(0,0,0,.5));
		cursor: pointer;
	}
	
	.DJ-program-desc{
		color: #d0d0d0;
		font-size: 14px;
		height: 40px;
		line-height: 20px;
		cursor: pointer;
	}
	.DJ-program-desc:hover{
		color: #fff;
	}
</style>
