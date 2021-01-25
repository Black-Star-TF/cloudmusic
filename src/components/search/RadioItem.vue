<template>
	<div class="search-radio-item">
		<img :src="radio.picUrl" class="radio-cover" @click="toRadioDetail">
		<span class="radio-name" @click="toRadioDetail">{{radio.name}}</span>
		<span class="radio-creator"><span class="by">by</span><span class="radio-creator-name">{{radio.dj.nickname}}</span></span>
	</div>
</template>

<script>
	export default {
		name: 'DJItem',
		props:{
			radio: {
				type: Object,
				require: true
			}
		},
		methods:{
			toRadioDetail(){
				this.$router.push({
					path: '/djdetail',
					query:{
						id: this.radio.id
					}
				})
			}
		}
	}
	
</script>

<style>
	.search-radio-item{
		padding-left: 30px;
		height: 80px;
		position: relative;
		cursor: pointer;
	}
	
	.search-radio-item:nth-of-type(2n){
		background-color: rgba(255,255,255,.03);
	}
	
	.search-radio-item:hover{
		background-color: rgba(255,255,255,.05);
	}
	
	.search-radio-item>.radio-cover{
		width: 60px;
		height: 60px;
		margin: 10px 0;
		float: left;
		border-radius: 5px;
	}
	
	.search-radio-item>.radio-name{
		color: #ddd;
		line-height: 80px;
		margin-left: 15px;
		font-size: 13px;
	}
	
	.search-radio-item>.radio-name:hover{
		color: #fff;
	}
	
	.search-radio-item>.radio-creator{
		line-height: 80px;
		font-size: 12px;
		position: absolute;
		left: 65%;
		color: #525252;
	}
	
	.search-radio-item>.radio-creator>.radio-creator-name{
		color: #686868;
	}
	
	.search-radio-item>.radio-creator>.by{
		margin-right: 10px;
	}
	
	.search-radio-item>.radio-creator>.radio-creator-name:hover{
		color: #aaa;
	}
</style>
