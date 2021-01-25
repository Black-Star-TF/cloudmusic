<template>
	<div class="search-singer-item" @click="toArtistDetail">
		<img v-lazy="singer.img1v1Url" class="singer-avatar">
		<span class="singer-name">{{singer.name}} <span class="singer-name-alias" v-if="singer.alias.length>0">({{singer.alias[0]}})</span></span>
	</div>
</template>

<script>
	export default {
		name: 'SingerItem',
		props:{
			singer:{
				type: Object,
				require: true
			}
		},
		methods:{
			toArtistDetail(){
				this.$router.push({
					path: '/artistdetail',
					query:{
						id: this.singer.id
					}
				})
			}
		}
	}
	
</script>

<style>
	
	.search-singer-item{
		height: 80px;
		width: 100%;
		padding-left: 30px;
		cursor: pointer;
	}
	
	.search-singer-item:nth-of-type(2n){
		background-color: rgba(255,255,255,.03);
	}
	
	.search-singer-item:hover{
		background-color: rgba(255,255,255,.05);
	}
	
	.search-singer-item>.singer-avatar{
		border-radius: 5px;
		float: left;
		display: inline-block;
		width: 60px;
		height: 60px;
		margin: 10px 0;
		margin-right: 10px;
	}
	
	.search-singer-item>.singer-name{
		height: 80px;
		line-height: 80px;
		color: #ddd;
	}
	.search-singer-item>.singer-name:hover{
		color: #fff;
	}
	
	.search-singer-item>.singer-name>.singer-name-alias{
		color: #666;
	}
</style>
