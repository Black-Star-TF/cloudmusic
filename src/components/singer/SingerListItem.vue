<template>
	<div class="singer-list-item" :style="itemStyle">
		<!-- 歌手照片 -->
		<img v-lazy="singer.img1v1Url" class="sing-avatar" @load="load" ref="img">
		<!-- 歌手名称 -->
		<div class="singer-name-container">
			<!-- 账户标识 -->
			<span class="singer-name">{{singer.name}}</span>
			<div class="singer-count" v-if="singer.accountId"><span class="iconfont icon-yonghu"></span></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'SingerListItem',
		props:{
			singer:{
				type: Object,
				require: true
			},
			columns: {
				default: 6
			}
		},
		methods:{
			load(){
				// 控制图片大小为 1:1
				let img = this.$refs.img;
				if(img.width!=img.height){
					img.height = img.width;
				}
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
	.singer-list-item{
		margin-bottom: 10px;
		position: relative;
	}
	
	.sing-avatar{
		cursor: pointer;
		width: 100%;
		display: block;
		border-radius: 5px;
		margin-bottom: 5px;
	}
	
	.singer-name-container{
		font-size: 14px;
		height: 30px;
		line-height: 30px;
		position: relative;
	}
	.singer-name{
		color: #d0d0d0;
		cursor: pointer;
	}
	
	.singer-name:hover{
		color: #fff;
	}
	
	.singer-count{
		width: 15px;
		height: 15px;
		border-radius: 50%;
		background-color: red;
		position: absolute;
		right: 0;
		top: 7px;
		text-align: center;
		line-height: 15px;
		cursor: pointer;
	}
	
	.singer-count > .iconfont{
		display: inline-block;
		font-size: 12px;
		transform: scale(0.8);
		color: #fff;
	}
	
</style>
