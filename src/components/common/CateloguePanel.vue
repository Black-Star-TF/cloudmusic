<template>
	<div class="catelogue-panel" @click.stop>
		<!-- 分类：所有 -->
		<div class="tag-total" :class="{'active': currentTagName == totalTagName}" @click="tagClick">{{totalTagName}}</div>
		<!-- 分类列表 -->
		<div class="catelogue-container">
			<slot name="category"></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'CataloguePanel',
		props:{
			currentTagName:{
				type: String
			},
			totalTagName:{
				type: String
			}
		},
		methods:{
			tagClick(){
				this.$emit('tagclick',this.totalTagName)
			}
		}
	}
	
</script>

<style>
	.catelogue-panel{
		width: 100%;
		font-size: 13px;
		background-color: rgb(34,34,34);
		border-radius: 5px;
		z-index: 10;
		position: relative;
		box-shadow: 0 0 5px 1px #111;
		padding-bottom: 30px;
	}
	
	.tag-total{
		text-indent: 3em;
		line-height: 60px;
		height: 60px;
		border-bottom: 1px solid #444;
		font-size: 14px;
	}
	
	.tag-total.active{
		color: #F13E3A;
	}
</style>
