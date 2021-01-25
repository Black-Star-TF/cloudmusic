<template>
	<!-- 头部信息 -->
	<div class="user-detail-header">
		<!-- 用户头像 -->
		<img :src="user.profile.avatarUrl" class="user-avatar">
		
		<!-- 详情 -->
		<div class="user-detail-header-right">
			<!-- 用户姓名，等级等信息 -->
			<div class="user-detail-header-right-top">
				<div class="user-name">{{user.profile.nickname}}</div>
				<div class="user-identify">
					<span class="user-desc" v-if="user.identify"> <img :src="user.identify.imageUrl" class="user-identity-icon">{{user.identify.imageDesc}}</span>
					<span class="user-level">Lv{{user.level}}</span>
					
					<!-- 性别 -->
					<span class="iconfont nan icon-82" v-if="user.profile.gender == 1"></span>
					<span class="iconfont nv icon-nv" v-if="user.profile.gender == 2"></span>
					
					<!-- 操作 -->
					<div class="option">
						<!-- 歌手页 -->
						<div class="btn-to-artist-page option-item" v-if="user.profile.artistId">歌手页</div>
						<!-- 发私信 -->
						<div class="btn-send-msg option-item">发私信</div>
						<!-- 关注 -->
						<div class="btn-follow option-item">关注</div>
						<!-- 更多操作 -->
						<div class="btn-more option-item">···</div>
					</div>
				</div>
			</div>
			<!-- 动态、关注、粉丝、签名等 -->
			<div class="user-detail-header-right-bottom">
				
				<div class="info-container">
					<div class="event item">
						<div class="event-num num">{{user.profile.eventCount}}</div>
						<div class="title">动态</div>
					</div>
					<div class="dilimiter"></div>
					<div class="follows item">
						<div class="follows-num num">{{user.profile.follows}}</div>
						<div class="title">关注</div>
					</div>
					<div class="dilimiter"></div>
					
					<div class="follower item">
						<div class="follower-num num">{{user.profile.followeds}}</div>
						<div class="title">粉丝</div>
					</div>
				</div>
				
				<!-- 个人介绍 -->
				<div class="user-signature">个人介绍：<span>{{user.profile.signature}}</span></div>
				
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'UserDetailHeader',
		props:{
			user:{
				type: Object,
				require: true
			}
		}
	}
	
</script>

<style>
	.user-detail-header{
		height: 190px;
		margin-bottom: 30px;
	}
	
	.user-avatar{
		width: 190px;
		height: 190px;
		display: block;
		border-radius: 50%;
		float: left;
		margin-right: 20px;
		outline: none;
	}
	
	.user-detail-header-right{
		float: left;
		width: calc(100% - 210px);
		height: 100%;
	}
	
	.user-detail-header-right-top{
		height: 65px;
		border-bottom: 1px solid #444;
		box-sizing: border-box;
	}
	
	.user-detail-header-right-top>.user-name{
		font-size: 22px;
		height: 25px;
		line-height: 25px;
		font-weight: 600;
		color: #d0d0d0;
	}
	
	.user-identify{
		height: 16px;
		line-height: 16px;
		margin: 12px 0;
	}
	
	.user-identify>span{
		display: inline-block;
		line-height: 16px;
		height: 16px;
		box-sizing: border-box;
		font-size: 12px;
		border-radius: 8px;
		color: #d0d0d0;
		background-color: #fff;
		padding: 0 8px;
		position: relative;
		margin-right: 10px;
	}
	
	.user-identify>span.user-desc{
		padding-left: 18px;
		color: red;
		background-color: #FDE4E2;
	}
	
	.user-identify>span.user-level{
		color: #000;
	}
	
	.user-identity-icon{
		width: 16px;
		height: 16px;
		position: absolute;
		left: 0;
	}
	
	.user-identify>span.iconfont{
		padding: 0;
		display: inline-block;
		width: 16px;
		height: 16px;
		line-height: 16px;
		font-size: 13px;
		border-radius: 50%;
		text-align: center;
		cursor: default;
		position: relative;
		top: -1px;
	}
	
	.user-identify>span.iconfont.nan{
		color: blue;
		background-color: rgba(0,0,255,.3);
	}
	
	.user-identify>span.iconfont.nv{
		color: red;
		font-size: 12px;
		background-color: rgba(255,0,0,.3);
	}
	
	.user-identify>.option{
		float: right;
		height: 30px;
		display: flex;
		margin-top: -7px;
	}
	
	.user-identify>.option>.option-item{
		height: 30px;
		line-height: 30px;
		border: 1px solid #444;
		border-radius: 15px;
		margin-left: 10px;
		color: #d0d0d0;
		font-size: 14px;
		padding: 0 15px;
		cursor: pointer;
	}
	
	.user-identify>.option>.option-item.btn-more{
		width: 30px;
		height: 30px;
		padding: 0;
		border-radius: 50%;
		text-align: center;
	}
	
	.user-identify>.option>.option-item:hover{
		background-color: rgba(255,255,255,.05);
		color: #fff;
	}
	
	.user-detail-header-right-bottom{
		height: 125px;
	}
	
	.user-detail-header-right-bottom>.info-container{
		height: 35px;
		margin: 15px 0;
	}
	
	.info-container>.item{
		float: left;
		height: 35px;
		cursor: pointer;
		text-align: center;
	}
	
	.info-container>.item:hover>.num{
		color: #fff;
	}
	
	.info-container>.item:hover>.title{
		color: #ccc;
	}
	
	.info-container>.item>.num{
		font-size: 18px;
		color: #d0d0d0;
		height: 20px;
		line-height: 15px;
	}
	
	.info-container>.item>.title{
		font-size: 12px;
		color: #888888;
		height: 10px;
		line-height: 10px;
		margin-top: 5px;
	}
	
	.info-container>.dilimiter{
		height: 35px;
		float: left;
		width: 1px;
		background-color: #444;
		margin: 0 30px;
	}
	
	.user-signature{
		height: 20px;
		line-height: 20px;
		color: #d0d0d0;
		font-size: 13px;
	}
	
	.user-signature>span{
		color: #888;
	}
</style>
