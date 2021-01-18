<template>
	<div class="DJ-program">
		<!-- 轮播图 -->
		<Slider :bannersData="DJBanner" height="180" v-if="DJBanner"></Slider>
		
		<!-- 电台节目导航 -->
		
		<!-- 内容 -->
		
		<!-- 付费精品 -->
		<CategoryModule v-if="show">
			<template slot="title"><div class="link">付费精品</div></template>
			<template slot="content">
				<PayRadioItem v-for="DJPayItem in DJPayList" :DJPayItem="DJPayItem"></PayRadioItem>
			</template>
		</CategoryModule>
		
		<!-- 电台个性推荐 -->
		<CategoryModule v-if="show">
			<template slot="title">电台个性推荐</template>
			<template slot="content">
				<DJProgramItem v-for="recommendDJ in recommendDJList" :DJProgram="recommendDJ"></DJProgramItem>
			</template>
		</CategoryModule>
		
		<!-- 电台分类推荐 -->
		<CategoryModule v-for="DJCate in DJCategoryCommendList" v-if="show">
			<template slot="title"><div class="link">{{DJCate.name}}</div></template>
			<template slot="content">
				<DJProgramItem v-for="(DJProgram,index) in DJCate.DJPrograms" :DJProgram="DJProgram" v-if="index<6"></DJProgramItem>
			</template>
		</CategoryModule>
	</div>
</template>

<script>
	import {getDJBanner,getDJPay,getDJCategory,getDJCategoryRecommend} from '@/network/Discover/djProgram'
	import {getRecommendDJProgram} from '@/network/Discover/recommend'
	import Slider from '@/components/common/Slider'
	import CategoryModule from '@/components/common/CategoryModule'
	import PayRadioItem from '@/components/DJProgram/PayRadioItem'
	import DJProgramItem from '@/components/DJProgram/DJProgramItem'
	export default {
		name: 'DJProgram',
		data(){
			return {
				DJBanner: null,
				DJPayList: null,
				recommendDJList: null,
				DJCategory: null,
				DJCategoryCommendList: [],
				DJSubCategory: ['创作翻唱','声之剧场','情感调频','声音恋人']
			}
		},
		components:{
			Slider,
			CategoryModule,
			PayRadioItem,
			DJProgramItem
		},
		computed:{
			show(){
				return this.DJPayList && this.recommendDJList && this.DJCategoryCommendList.length == this.DJSubCategory.length;
			}
		},
		created(){
			// 获取电台轮播图数据
			getDJBanner().then(res=>{
				this.DJBanner = res.data;
			})
			
			// 获取付费精品电台
			getDJPay().then(res=>{
				this.DJPayList = res.data.list;
			})
			
			// 获取电台个性推荐数据
			getRecommendDJProgram().then(res=>{
				this.recommendDJList = res.data;
			});
			
			// 获取电台分类数据
			getDJCategory().then(res=>{
				this.DJCategory = res.categories;
				return Promise.resolve();
			}).then(()=>{
				// 获取电台分类推荐数据
				for(const DJCate of this.DJCategory){
					for(const item of this.DJSubCategory){
						if(DJCate.name == item){
							getDJCategoryRecommend(DJCate.id).then(res=>{
								this.DJCategoryCommendList.push({name:DJCate.name, DJPrograms: res.djRadios})
							})
						}
					}
				}
			});
		}
	}
	
</script>

<style>
	.link{
		cursor: pointer;
	}
	.link:hover{
		color: #fff;
	}
</style>
