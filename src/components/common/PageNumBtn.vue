<template>
	<div class="page-num-nav-container" v-if="totalPage>1">
		<!-- 上一页 -->
		<div class="page-num-nav-btn-item prev" @click="skipPage(currentPage-1)" :class="{'disabled': currentPage==1}"> < </div>
		<!-- 第一页 -->
		<div class="page-num-nav-btn-item firstPage" @click="skipPage(1)" :class="{'active': currentPage==1}">1</div>
		<!-- 省略页码 左-->
		<div class="page-num-nav-btn-item ellipsis" v-if="showLeftEllipsis">...</div>
		
		<!-- 中间显示的页码 -->
		<div class="page-num-nav-btn-item" v-for="btn in btnList" v-if="showBtn(btn)" :class="{active: btn==currentPage}" @click="skipPage(btn)">{{btn}}</div>
		
		<!-- 省略页码 右-->
		<div class="page-num-nav-btn-item ellipsis" v-if="showRightEllipsis">...</div>
		
		<!-- 最后一页 -->
		<div class="page-num-nav-btn-item lastPage" v-if="totalPage>1" @click="skipPage(totalPage)" :class="{'active': currentPage==totalPage}">{{totalPage}}</div>
		
		<!-- 下一页 -->
		<div class="page-num-nav-btn-item next" @click="skipPage(currentPage+1)" :class="{'disabled': currentPage==totalPage}"> > </div>
	</div>
</template>

<script>
	export default{
		name: 'PageNumBtn',
		data(){
			return{
				currentPage: this.pageNum
			}
		},
		props:{
			pageNum:{
				default: 10
			},
			totalPage:{
				default: 0
			},
			range:{
				default: 9
			}
		},
		computed:{
			btnList(){
				let arr = []
				for(let i = 1; i <= this.totalPage;i++){
					arr.push(i)
				}
				return arr
			},
			showLeftEllipsis(){
				return this.currentPage-1>(this.range-3)/2+1&&this.totalPage>this.range
			},
			showRightEllipsis(){
				return this.totalPage-this.currentPage>(this.range-3)/2+1&&this.totalPage>this.range
			},
		},
		methods:{
			// 跳转页码
			skipPage(pageNum){
				if(pageNum != this.currentPage&&pageNum<=this.totalPage&&pageNum>=1){
					this.$emit('pagebtnclick',pageNum)
					this.currentPage = pageNum
				}
			},
			showBtn(btn){
				// 中间页码按钮的显示规则
				let commRule = btn!=1&&btn!=this.totalPage
				let computedRule = null
				
				if(this.currentPage>1+(this.range-3)/2&&this.currentPage<this.totalPage-(this.range-3)/2){
					computedRule = btn>=this.currentPage-(this.range-3)/2 && btn<=this.currentPage+(this.range-3)/2
				}else if(this.currentPage<=1+(this.range-3)/2){
					computedRule = btn <= this.range -1
				}else if(this.currentPage>=this.totalPage-(this.range-3)/2){
					computedRule = btn >= this.totalPage - this.range + 2
				}
				return commRule&&computedRule
			}
		}
	}
</script>

<style>
	
	.page-num-nav-container{
		margin: 20px;
		width: 100%;
		display: flex;
		text-align: center;
		justify-content: center;
	}
	
	.page-num-nav-btn-item{
		box-sizing: border-box;
		margin: 3px;
		width: 25px;
		height: 25px;
		line-height: 25px;
		border-radius: 5px;
		border: 1px solid #666;
		color: #666;
		cursor: pointer;
		font-size: 12px;
	}
	
	.page-num-nav-btn-item:hover{
		border: none;
		background-color: #040044;
		color: #fff;
	}
	
	.page-num-nav-btn-item.active{
		background-color: #ec4141;
		color: #fff;
		border: none;
		cursor: default;
	}
	
	.page-num-nav-btn-item.disabled{
		cursor: default;
		background-color: rgba(255,255,255,.1);
	}
	
	.page-num-nav-btn-item.ellipsis{
		cursor: default;
		border: 1px solid #666;
		color: #666;
		background-color: transparent;
	}
	
/* 	.page-num-nav-btn-item.ellipsis:hover{
		border: 1px solid #666;
		color: #666;
	} */
	
	.page-num-nav-btn-item.disabled:hover{
		border: 1px solid #666;
		color: #666;
	}
</style>
