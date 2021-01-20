<template>
	<div class="total-mv">
		<!-- 标题 -->
		<div class="total-mv-title">全部MV</div>
		
		<div class="total-mv-main">
			<!-- MV分类导航栏 -->
			<TypeNav :category="category" :currentCategory="currentCategory" @typechange="change"></TypeNav>
			
			<div class="mv-container" v-if="MVList">
				<VideoItem v-for="video in MVList" :video="video" :columns="4"></VideoItem>
			</div>
			<!-- 页码导航 -->
			<PageNumBtn :pageNum="pageNum" :totalPage="totalPage" @pagebtnclick="turnPage" v-if="MVList"></PageNumBtn>
			<Loading v-if="!MVList"></Loading>
		</div>
	</div>
</template>

<script>
	import {getTotalMV} from '@/network/Video/mv'
	import TypeNav from '@/components/common/TypeNav';
	import VideoItem from '@/components/video/VideoItem';
	import PageNumBtn from '@/components/common/PageNumBtn';
	import Loading from '@/components/common/Loading';
	export default{
		name: 'TotalMV',
		components:{
			TypeNav,
			VideoItem,
			PageNumBtn,
			Loading
		},
		data(){
			return{
				category:[
					{
						name: '地区', alias:'area', categoryList: {'全部':'全部', '内地': '内地', '港台': '港台', '欧美': '欧美', '日本':'日本', '韩国':'韩国'}
					},
					{
						name: '类型', alias: 'type', categoryList: {'全部':'全部','官方版': '官方版', '原生':'原生', '现场版': '现场版', '网易出品':'网易出品'}
					},
					{
						name: '排序', alias: 'order', categoryList: {'上升最快': '上升最快', '最热' :'最热', '最新':'最新'}
					}
				],
				currentCategory:{
					'area': '全部',
					'type': '全部',
					'order': '上升最快'
				},
				limit: 40,
				pageNum: 1,
				MVList: null,
				totalPage: null
			}
		},
		computed:{
			offset(){
				return (this.pageNum - 1) * this.limit;
			}
		},
		methods:{
			turnPage(pageNum){
				// 翻页
				this.pageNum = pageNum;
				this.getTotalMVData()
			},
			change(data){
				// 切换分类
				this.currentCategory[data.type.alias] = data.value;
				this.getTotalMVData()
			},
			getTotalMVData(){
				this.MVList = null
				getTotalMV(this.limit,this.offset,this.currentCategory.order,this.currentCategory.type,this.currentCategory.area).then(res=>{
					// console.log(res);
					this.MVList = res.data
					if(this.totalPage == null){
						this.totalPage = Math.ceil(res.count/this.limit)
					}
					console.log(this.totalPage);
				})
			}
		},
		created(){
			// console.log(this.$router.query.area);
			if(this.$route.query.area){
				this.currentCategory.area = this.$route.query.area
			}
			if(this.$route.query.type){
				this.currentCategory.type = this.$route.query.type
			}
			if(this.$route.query.order){
				this.currentCategory.order = this.$route.query.order
			}
			
			this.getTotalMVData()
		}
	}
</script>

<style>
	
	.total-mv-title{
		padding-left: 20px;
		height: 60px;
		background-color: rgb(34,34,34);
		position: sticky; 
		top: 0;
		z-index: 1000;
		color: #afafaf;
		line-height: 60px;
		font-size: 20px;
		font-weight: 600;
		cursor: pointer;
	}
	
	.total-mv-title:hover{
		color: #fff;
	}
	
	.total-mv-main{
		width: 85%;
		margin: 0 auto;
	}
	
	.mv-container{
		margin-top: 20px;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
</style>