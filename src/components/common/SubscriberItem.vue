<template>
	<div class="subscriber-item-container" :style="itemStyle">
		<!-- 头像 -->
		<img :src="subscriberItem.avatarUrl" class="subscriber-avatar">
		<div class="subscriber-info">
			<!-- 昵称 -->
			<div class="subscriber-name">{{subscriberItem.nickname}}
			<!-- 性别 -->
			<span class="iconfont nan icon-82" v-if="subscriberItem.gender == 1"></span>
			<span class="iconfont nv icon-nv" v-if="subscriberItem.gender == 2"></span>
			</div>
			
			<!-- 个性签名 -->
			<div class="subscriber-signature" v-if="subscriberItem.signature">{{subscriberItem.signature}}</div>
		</div>
	</div>
	
</template>

<script>
	export default {
		name: 'SubscriberItemCpn',
		props:{
			subscriberItem:{
				type: Object,
				require: true
			},
			columns: {
				type: Number,
				default: 3
			}
		},
		computed:{
			itemStyle(){
				return {
					width: `calc(100%/3 - 50px)`
				}
			}
		}
	}
	
</script>

<style>
	.subscriber-item-container{
		height: 90px;
		margin: 10px 0;
	}
	
	.subscriber-avatar{
		cursor: pointer;
		width: 90px;
		height: 90px;
		border-radius: 50%;
		float: left;
	}
	.subscriber-info{
		height: 90px;
		float: left;
		margin-left: 10px;
		width: calc(100% - 100px);
		display: flex;
		align-content: center;
		flex-wrap: wrap;
	}
	
	.subscriber-info .subscriber-name{
		cursor: pointer;
		width: 100%;
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		color: #d0d0d0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.subscriber-info .subscriber-name:hover{
		color: #fff;
	}
	
	.subscriber-info .subscriber-signature{
		width: 100%;
		height: 30px;
		line-height: 30px;
		font-size: 12px;
		color: #aaa;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.subscriber-info>.subscriber-name>.iconfont{
		display: inline-block;
		width: 18px;
		height: 18px;
		line-height: 18px;
		font-size: 13px;
		border-radius: 50%;
		text-align: center;
		cursor: default;
	}
	.subscriber-info>.subscriber-name>.nan{
		color: blue;
		background-color: rgba(0,0,255,.3);
	}
	
	.subscriber-info>.subscriber-name>.nv{
		color: red;
		font-size: 12px;
		background-color: rgba(255,0,0,.3);
	}
</style>
