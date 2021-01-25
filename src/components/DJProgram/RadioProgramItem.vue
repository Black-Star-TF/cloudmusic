<template>
	<div class="radio-program-item-container" :class="{'active': isActive}" @dblclick="play">
		
		<!-- 序号 -->
		<span class="radio-program-item-serial-num">{{radioProgramItem.serialNum}}</span>
		
		<!-- 头图 -->
		<img :src="radioProgramItem.coverUrl" class="radio-program-item-avatar" @click="play">
		
		<!-- 名称 -->
		<span class="radio-program-item-name">{{radioProgramItem.name}}</span>
		
		<!-- 时长 -->
		<span class="radio-program-item-duration">{{duration}}</span>
		
		<!-- 创建时间 -->
		<span class="radio-program-item-create-time">{{createDate}}</span>
		
		<!-- 获赞量 -->
		<span class="radio-program-item-liked-count"><span class="iconfont icon-zanpress"></span> {{radioProgramItem.likedCount}}</span>
		
		<!-- 收听数量 -->
		<span class="radio-program-item-listener-count"><span class="iconfont icon-bofang4"></span> {{listenerCount}}</span>
		
		
		
	</div>
</template>

<script>
	import {formatDate1} from '@/assets/js/tools'
	export default {
		name: 'RadioProgramItem',
		data(){
			return{
				isActive: false
			}
		},
		props:{
			radioProgramItem:{
				type: Object,
				require: true,
			}
		},
		methods:{
			play(){
				console.log(this.radioProgramItem.id);
				// 修改当前播放歌曲id
				this.$store.commit('setCurrentSongId',{songId: this.radioProgramItem.id})
				// 播放歌曲
				this.$store.dispatch('play')
				
				setTimeout(()=>{
					console.log(this.$store.state.currentSongUrl);
				},5000)
				
			}
		},
		computed:{
			createDate(){
				return formatDate1(this.radioProgramItem.createTime)
			},
			listenerCount(){
				if(this.radioProgramItem.listenerCount >= 100000){
					return Math.floor(this.radioProgramItem.listenerCount/10000) + '万'
				}else{
					return this.radioProgramItem.listenerCount
				}
			},
			duration(){
				let durSec = Math.floor(this.radioProgramItem.duration/1000)
				let min = Math.floor(durSec/60)
				let sec = durSec%60
				return  (min > 9 ? min : '0' + min) + ':' + (sec > 9 ? sec : '0' + sec)
			}
		}
	}
	
</script>

<style>
	.radio-program-item-container{
		cursor: default;
		width: 100%;
		height: 80px;
		line-height: 80px;
		position: relative;
	}
	
	.radio-program-item-container:nth-of-type(2n-1){
		background-color: rgba(255,255,255,.02);
	}
	
		
	.radio-program-item-container:hover{
		background-color: rgba(255,255,255,.05);
	}
	
	.radio-program-item-container.active{
		background-color: transparent;
	}
	
	.radio-program-item-container>span{
		display: block;
		height: 80px;
		line-height: 80px;
		font-size: 12px;
		color: #686868;
	}
	
	.radio-program-item-serial-num,.radio-program-item-avatar,.radio-program-item-name{
		float: left;
	}
	
	.radio-program-item-serial-num{
		box-sizing: border-box;
		padding-left: 30px;
		width: 70px;
		color: #555;
	}
	
	.radio-program-item-avatar{
		width: 60px;
		height: 60px;
		display: block;
		border-radius: 5px;
		margin: 10px;
		cursor: pointer;
	}
	
	.radio-program-item-container>.radio-program-item-name{
		width: calc(78% - 390px);
		color: #D0D0D0;
		font-size: 14px;
		margin-right: 2%;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}


	.radio-program-item-duration,.radio-program-item-create-time,.radio-program-item-liked-count,.radio-program-item-listener-count{
		float: right;
		margin-right: 5%;
		width: 50px;
	}
	
	.radio-program-item-create-time{
		width: calc(70px + 2%);
	}


	.radio-program-item-duration{
		margin-right: 3%;
	}
	
	.radio-program-item-liked-count{
		width: 60px;
	}
	
	.radio-program-item-liked-count>.iconfont{
		color: #999;
		line-height: 80px;
		font-size: 12px;
	}
	
	.radio-program-item-listener-count{
		width: 60px;
	}
	.radio-program-item-listener-count>.iconfont{
		color: #999;
		line-height: 80px;
		font-size: 13px;
	}
</style>
