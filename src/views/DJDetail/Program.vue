<template>
	<div class="radio-program-page-container">
		<!-- 期数 -->
		<div class="radio-program-page-header">
			<span class="radio-program-count">共{{radioProgramCount}}期</span>
			<span class="radio-program-sortord">
				<span>升序</span>
				<span>降序</span>
			</span>
		</div>
		
		<!-- 节目列表 -->
		
		<div class="radio-program-list" v-if="radioProgramList">
			<RadioProgramItem v-for="radioItem in radioProgramList"  :radioProgramItem="radioItem"></RadioProgramItem>
			
			<!-- 翻页 -->
			<PageNumBtn v-if="totalPage>=1" :pageNum="pageNum" :totalPage="totalPage" :range="5" @pagebtnclick="skip"></PageNumBtn>
		</div>
		
	</div>
</template>

<script>
	import {getRadioProgram} from '@/network/Discover/djProgram'
	import PageNumBtn from '@/components/common/PageNumBtn';
	import RadioProgramItem from '@/components/DJProgram/RadioProgramItem'
	export default {
		name: 'Program',
		data(){
			return{
				radioProgramList: null,
				radioProgramCount: null,
				limit: 30,
				pageNum: 1,
				asc: false,
				rid: null
			}
		},
		components:{
			RadioProgramItem,
			PageNumBtn
		},
		computed:{
			offset(){
				return this.limit*(this.pageNum-1)
			},
			totalPage(){
				return Math.ceil(this.radioProgramCount/this.limit)
			}
		},
		methods:{
			skip(pageNum){
				this.pageNum = pageNum
				this.getRadioProgramData()
			},
			getRadioProgramData(){
				this.radioProgramList = null
				getRadioProgram(this.rid,this.limit,this.offset,this.asc).then(res=>{
					if(!this.radioProgramCount){
						this.radioProgramCount = res.count
					}
					this.radioProgramList = res.programs
				})
			}
		},
		created(){
			this.rid = this.$route.query.id
			this.getRadioProgramData()
		}
	}
	
</script>

<style>
	.radio-program-page-container{
		width: 100%;
	}
	
	.radio-program-page-header{
		width: 100%;
		height: 20px;
		line-height: 20px;
		margin: 10px 0;
	}
	
	.radio-program-count{
		display: inline-block;
		margin: 0 2.5%;
		font-size: 12px;
		color: #ccc;
	}
	
	.radio-program-sortord{
		display: inline-block;
		float: right;
		margin: 0 20px;
		font-size: 12px;
		color: #ccc;
	}
	
	.radio-program-sortord>span{
		display: inline-block;
		margin: 0 5px;
		cursor: pointer;
	}
	
	.radio-program-list{
		width: 100%;
	}
</style>

