<template>
	<div class="playlist-category clearfix">
		<!-- 一级分类 -->
		<div class="category">{{category.name}}</div>
		<!-- 二级分类 -->
		<div class="sub-category-container" >
			<span class="sub-category" 
			v-for="item in subCate" 
			v-if="item.category == category.id"
			:class="{'active': currentTag==item.name}"
			@click="tagClick(item.name)">
			{{item.name}}
			<!-- hot标签 -->
			<span class="hot" v-if="item.hot">HOT</span>
			</span>
		</div>
		
		
	</div>
</template>

<script>
	export default {
		name: 'PlaylistCatagory',
		props:{
			category:{
				type: Object,
				require: true
			},
			subCate:{
				type: Array,
				require: true
			},
			currentTag: {
				type: String
			}
		},
		methods:{
			tagClick(tag){
				this.$emit('tagChange', tag)
			}
		}
	}
	
</script>

<style>
	
	.playlist-category{
		margin: 20px 0;
	}
	
	.category{
		width: 15%;
		box-sizing: border-box;
		float: left;
		text-align: center;
		line-height: 30px;
		color: #5b5b5b;
	}
	
	.sub-category-container{
		width: 85%;
		box-sizing: border-box;
		float: right;
	}
	
	.sub-category{
		width: calc(100%/6 - 30px);
		display: inline-block;
		margin: 0 15px;
		cursor: pointer;
		color: #d0d0d0;
		height: 30px;
		line-height: 30px;
		margin-bottom: 10px;
		position: relative;
	}
	
	.sub-category:hover{
		color: red;
	}
	
	.sub-category.active{
		color: red;
	}
	
	.sub-category>.hot{
		display: inline-block;
		color: red;
		font-size: 8px;
		position: relative;
		top: -2px;
		left: -7px;
		transform: scale(.6);
	}
</style>
