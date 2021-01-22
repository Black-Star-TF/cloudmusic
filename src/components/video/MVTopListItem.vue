<template>
	<div class="mv-toplist-item-container" :style="itemStyle">
		<!-- 排名 -->
		<div class="mv-toplist-item-index">
		{{topIndex}}
			<div class="mv-toplist-item-status up" v-if="topIndex < mvToplistItem.lastRank">
				<span class="iconfont icon-iconup"></span>
			</div>
			<div class="mv-toplist-item-status down" v-else>
				<span class="iconfont icon-xiajiang"></span>
			</div>
		</div>
		<!-- 封面 -->
		<div class="mv-toplist-item-cover">
			<img :src="mvToplistItem.cover" class="mv-toplist-item-img" @click="toDetail">
			<!-- 热度 -->
			<span class="mv-toplist-item-score"><span class="iconfont icon-redu"></span>{{mvToplistItem.score}}</span>
		</div>
		<div class="mv-toplist-item-info">
			<div class="mv-toplist-item-name" @click="toDetail">{{mvToplistItem.name}}</div>
			<div class="mv-toplist-item-artists">
				<span class="mv-toplist-item-artist" v-for="(artist,index) in mvToplistItem.artists">
					{{artist.name}}
					<span class="delimiter" v-if="index < mvToplistItem.artists.length - 1">/</span>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'MVTopListItem',
		props:{
			mvToplistItem:{
				type: Object,
				require: true
			},
			columns:{
				type:Number,
				default: 2
			},
			index:{
				type: Number,
				require: true
			}
		},
		computed:{
			itemStyle(){
				return {
					width: `calc(100%/${this.columns})`
				}
			},
			topIndex(){
				return this.index > 9 ? this.index : "0" + this.index
			}
		},
		methods:{
			toDetail(){
				this.$router.push({
					path: '/videodetail',
					query:{
						id: this.mvToplistItem.id
					}
				})
			}
		}
	}
	
</script>

<style>
	.mv-toplist-item-container{
		height: 130px;
		border-top: .5px solid #333;
		box-sizing: border-box;
	}
	.mv-toplist-item-container:nth-of-type(1),.mv-toplist-item-container:nth-of-type(2){
		border-top: none;
	}
	
	.mv-toplist-item-container:nth-of-type(2n-1){
		border-right: .5px solid #333;
	}
	
	.mv-toplist-item-index{
		float: left;
		height: 130px;
		line-height: 130px;
		text-align: center;
		font-size: 25px;
		color: #666;
		text-indent: .5em;
		position: relative;
	}
	
	.mv-toplist-item-status{
		position: absolute;
		width: 100%;
		height: 30px;
		line-height: 30px;
		font-size: 12px;
		top: 60%;
	}
	
	.mv-toplist-item-status.up>.iconfont{
		color: red;
	}
	
	.mv-toplist-item-status.down>.iconfont{
		color: blue;
	}
	
	.mv-toplist-item-cover{
		width: 170px;
		height: 90px;
		margin: 20px 10px;
		float: left;
		cursor: pointer;
		position: relative;
	}
	.mv-toplist-item-img{
		border-radius: 5px;
		width: 100%;
		height: 100%;
	}
	
	.mv-toplist-item-score{
		position: absolute;
		right: 5px;
		top: 2px;
		font-size: 12px;
		color: #fff;
	}
	
	.mv-toplist-item-score>.iconfont{
		font-size: 12px;
		color: #fff;
	}
	
	.mv-toplist-item-info{
		width: 40%;
		height: 90px;
		margin: 20px 0;
		float: left;
	}
	
	.mv-toplist-item-name{
		cursor: pointer;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		height: 30px;
		line-height: 30px;
		width: 100%;
		float: left;
		font-size: 13px;
		color: #ddd;
	}
	
	.mv-toplist-item-name:hover{
		color: #fff;
	}
	.mv-toplist-item-artists{
		height: 30px;
		line-height: 30px;
		width: 100%;
		float: left;
		font-size: 12px;
		color: #999;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.mv-toplist-item-artist{
		cursor: pointer;
	}
	
	.mv-toplist-item-artist:hover{
		color: #bbb;
	}
</style>
