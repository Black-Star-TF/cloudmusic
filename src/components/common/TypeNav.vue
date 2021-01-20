<template>
	<!-- 分类导航 -->
	<div class="type-nav-container">
		<!-- 类别 -->
		<div class="type-nav-item clearfix" v-for="type in category">
			<div class="type-nav-item-category">{{type.name}}:</div>
			<div class="right">
				<div class="item" v-for="(value,key,index) in type.categoryList">
					<span class="itemName" :class="{'active': value == currentCategory[type.alias]}" @click="areaClick(type,value)">{{key}}</span>
					<span class="dilimiter" v-if="index < type.categoryList.length - 1">|</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'SingerTypeNav',
		props: {
			category:{
				type:Array,
				require: true
			},
			currentCategory:{
				type: Object,
				require: true
			}
		},
		methods:{
			areaClick(type,value){
				this.$emit('typechange',{type, value})
			}
		}
	}
	
</script>

<style>
	
	/* 导航样式 */
	
	.type-nav-container{
		width: 100%;
		line-height: 20px;
		font-size: 12.5px;
		color: #878787;
		overflow: hidden;
	}
	
	.type-nav-item-category{
		color: #d0d0d0;
		width: 40px;
		float: left;
		height: 100%;
		margin-top: 10px;
	}
	.type-nav-item>.right{
		width: 95%;
		float: left;
		box-sizing: border-box;
	}
	.type-nav-item>.right>.item{
		float: left;
		margin-top: 10px;
		color: #999;
	}
	.type-nav-item .itemName{
		text-align: center;
		display: inline-block;
		width: 55px;
		border-radius: 10px;
		margin: 0 7px;
		cursor: pointer;
	}
	
	.type-nav-item .itemName:hover{
		color: #ddd;
	}
	.type-nav-item .itemName.active{
		background-color: rgba(255,0,0,.05);
		color: red;
	}
	
	.type-nav-item .dilimiter{
		color: rgba(255,255,255,.04);
	}
</style>
