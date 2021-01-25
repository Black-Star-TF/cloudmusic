<template>
	<div class="dj-pay-container" :style="itemStyle">
		<!--付费电台封面 -->
		<div class="dj-pay-cover">
			<img :src="DJPayItem.picUrl" class="dj-pay-img" @load="show" v-show="hasImg">
		</div>
		
		<div class="dj-pay-detail" v-show="hasImg">
			<div class="dj-pay-name">{{DJPayItem.name}}</div>
			<div class="dj-pay-rcmdText">{{DJPayItem.rcmdText}}</div>
			<div class="dj-pay-lastProgramName">{{DJPayItem.lastProgramName}}</div>
			<div class="dj-pay-price">
				<span class="dj-pay-originalPrice">￥{{DJPayItem.originalPrice/100}}</span><span class="measure" v-if="DJPayItem.radioFeeType==1">/期</span>
				<span class="dj-pay-discountPrice" v-if="DJPayItem.discountPrice">/SVIP:￥{{DJPayItem.discountPrice/100}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'PayRadioItem',
		data(){
			return{
				hasImg: false
			}
		},
		props:{
			DJPayItem: {
				type: Object,
				require: true
			},
			columns:{
				default: 2
			},
			height:{
				default: 150
			},
			index:{
				type: Number,
				require: true
			}
		},
		computed:{
			itemStyle(){
				let mr = '20px'
				if( (this.index + 1) % this.columns == 0){
					mr = 0
				}
				return{
					width: `calc((100% - ${this.columns - 1} * 20px) / ${this.columns})`,
					height: `${this.height}px`,
					marginRight: mr
				}
			}
		},
		methods:{
			show(){
				this.hasImg = true
			}
		}
	}
</script>
<style>
	
	.dj-pay-cover{
		width: 135px;
		height: 135px;
		float: left;
		cursor: pointer;
	}
	
	.dj-pay-img{
		border-radius: 10px;
		width: 100%;
	}
	
	.dj-pay-detail{
		height: 100%;
		float: left;
		margin-left: 10px;
	}
	
	
	
	.dj-pay-name{
		vertical-align: middle;
		line-height: 300%;
		font-size: 16px;
		color: #d0d0d0;
		font-weight: 600;
		cursor: pointer;
	}
	
	.dj-pay-name:hover{
		color: #fff;
	}
	
	.dj-pay-rcmdText,
	.dj-pay-lastProgramName{
		font-size: 14px;
		line-height: 200%;
		color: #666;
	}
	
	.dj-pay-price{
		line-height: 200%;
	}
	
	.dj-pay-originalPrice{
		font-size: 19px;
		color: red;
	}
	
	.dj-pay-item-price>.measure{
		color: #666;
		font-size: 13px;
	}
	
	.dj-pay-item-discountPrice{
		color: #9d352f;
		font-size: 13px;
	}
	
</style>