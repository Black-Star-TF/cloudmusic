<template>
	<div class="login-box" v-if="panel">
		<!-- 登录面板 -->
		
		<!-- 手机号 -->
		<input type="text" class="phone" v-model="phone">
		<!-- 密码 -->
		<input type="password" class="password" v-model="password">
		<!-- 登录按钮 -->
		<button @click="loginClick">登录</button>
		<!-- 查询登录状态 -->
		<button @click="getLoginStatus">登录状态</button>
		<!-- 退出登录 -->
		<button @click="logoutClick">退出登录</button>
		
		<!-- 关闭按钮 -->
		<div class="btn-close" @click="close">x</div>
	</div>
</template>

<script>
	import md5 from 'md5-node';
	import {login,loginStatus,logout} from '@/network/Login/login'
	export default {
		name: 'Login',
		data(){
			return {
				phone: '',
				password: '',
			}
		},
		props:{
			panel: {
				type: Boolean
			}
		},
		methods:{
			// 登录
			loginClick(){
				let psw = md5(this.password)
				login(this.phone,psw).then(res=>{
					if(res.code==200){
						this.$store.commit('login',res.account.id)
						this.close()
					}
				})
			},
			// 登录状态
			getLoginStatus(){
				// loginStatus().then(res=>{
					
				// })
				console.log(this.$store.state.uid);
			},
			// 退出登录
			logoutClick(){
				logout().then(res=>{
					this.$store.commit('logout')
				})
			},
			// 关闭面板
			close(){
				this.$emit('close')
			}
		}
	}
	
</script>

<style>
	.login-box{
		position: fixed;
		width: 350px;
		height: 530px;
		left: 50%;
		top: 50%;
		margin-left: -175px;
		margin-top: -265px;
		background-color: #fff;
		z-index: 1500;
	}
	
	.btn-close{
		position: absolute;
		top: 0;
		right: 0;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		background-color: red;
		line-height: 30px;
		text-align: center;
		margin-top: -15px;
		margin-right: -15px;
		color: #fff;
		cursor: pointer;
	}
	
</style>
