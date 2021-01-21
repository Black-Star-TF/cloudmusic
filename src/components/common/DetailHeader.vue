<template>
	<div class="detail-header-container clearfix">
		<!-- 封面 -->
		<div class="detail-header-cover">
			<slot name="cover"></slot>
		</div>
		
		<!-- 详情 -->
		<div class="detail-header-info">
			<!-- 名称 -->
			<div class="detail-name"><span class="detail-type"><slot name="type"></slot></span><slot name="name"></slot></div>
			<!-- 用户 -->
			<div class="detail-user-info">
				<slot name="user-info"></slot>
			</div>
			<!-- 操作 -->
			<div class="detail-action">
				<slot name="action"></slot>
			</div>
			
			<!-- 标签 -->
			<div class="detail-tags">
				<slot name="tags"></slot>
			</div>
			<!-- 播放相关信息 -->
			<div class="play-info">
				<slot name="play-info"></slot>
			</div>
			
			<!-- description -->
			<div class="desc" :class="{'show': showDesc}">
				<div class="desc-content">
					<slot name="desc"></slot>
				</div>
				<!-- 收起/展开简介按钮 -->
				<div class="btn" @click="changeDescState" :class="{'show': showDesc}"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'DetailHeader',
		data(){
			return{
				showDesc: false
			}
		},
		methods:{
			changeDescState(){
				this.showDesc = !this.showDesc;
			}
		}
	}
	
</script>

<style>
	
	.detail-header-container{
		font-size: 13px;
		vertical-align:text-bottom;
		color: #fff;
		cursor: default;
		width: 95%;
		margin: 40px auto;
		margin-top: 30px;
		color: #d0d0d0;
	}
	
	.detail-header-cover{
		width: 180px;
		height: 180px;
		float: left;
	}
	
	.detail-header-cover>img{
		width: 100%;
		display: block;
		border-radius: 5px;
	}
	
	.detail-header-info{
		height: fit-content;
		width: calc(100% - 200px);
		margin-left: 20px;
		float: left;
	}
	
	/* 名称样式 */
	.detail-name{
		font-size: 25px;
		font-weight: 600;
		color: #d0d0d0;
		line-height: 30px;
		height: 30px;
		cursor: default;
	}
	
	/* 标签样式 */
	.detail-name>.detail-type{
		position: relative;
		top: -4px;
		display: inline-block;
		height: 20px;
		box-sizing: border-box;
		padding: 0 3px;
		margin-right: 5px;
		line-height: 18px;
		font-size: 13px;
		color: red;
		border: 1px solid red;
		font-weight: 400;
		border-radius: 3px;
	}
	
	.detail-user-info{
		height: 30px;
		line-height: 30px;
		position: relative;
	}
	
	.detail-user-info>img.user-avatar{
		position: relative;
		top: 8px;
		height: 80%;
		border-radius: 50%;
		margin-right: 10px;
	}
	
	.detail-user-info>img.user-identityIcon{
		bottom: -1px;
		left: 14px;
		height: 40%;
		position: absolute;
	}
	
	.detail-user-info>span.user-nickname{
		margin-right: 10px;
		color: #85B9E6;
		cursor: pointer;
	}
	
	.detail-user-info>span.user-nickname:hover{
		color: #B3CEE5;
	}
	
	.detail-user-info>span.create-time,.detail-user-info>span.update-time{
		color: #777;
	}
	
	/* 操作样式 */
	
	.detail-action{
		margin: 15px 0;
		height: 30px;
	}
	
	.detail-action>div{
		float: left;
		box-sizing: border-box;
		margin-right: 10px;
		height: 30px;
		line-height: 28px;
		padding: 0 15px;
		text-align: center;
		border-radius: 15px;
		font-size: 15px;
		border: 1px solid #666;
		color: #ccc;
	}
	.detail-action>div:hover{
		background-color: rgba(255,255,255,.05);
	}
	
	.detail-action>div.play{
		background-color: red;
		color: #fff;
	}
	
	.desc{
		width: 100%;
		overflow-y: visible;
		position: relative;
	}
	
	.desc>.desc-content{
		width: calc(100% - 50px);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: pre;
		position: relative;
	}
	
	.desc>.desc-content>.tag{
		display: inline-block;
		height: 17px;
		box-sizing: border-box;
		padding: 0 3px;
		margin-right: 5px;
		line-height: 13px;
		color: red;
		border: 1px solid red;
		font-weight: 400;
		border-radius: 3px;
		cursor: pointer;
	}
	
	.desc.show>.desc-content{
		/* height: auto; */
		height: fit-content;
		overflow-y: visible;
		white-space: pre-wrap;
	}
	
	.desc>.btn{
		position: absolute;
		right: 0;
		top: 5px;
		border: 7px solid transparent;
		border-top-color: #ccc;
		cursor: pointer;
	}
	
	.desc>.btn.show{
		border-color: transparent;
		border-bottom-color: #ccc;
	}

	.detail-tags,.play-info,.desc-content{
		height: 20px;
		line-height: 20px;
	}
	
	.detail-tags>.tag>.tagname{
		color: #0a98b8;
		cursor: pointer;
	}
	
	.detail-tags>.tag>.tagname:hover{
		color: #0bc0e8;
	}
	
	.play-info>span{
		color: #aaa;
	}
</style>
