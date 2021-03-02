<template>
	<div class="comment-input-box">
		<div class="letter-num" :class="{'red': letterNum < 0}">{{letterNum}}</div>
		<textarea name="comment" id="comment" ref="comment" @click.stop @mousedown.stop @input="input"></textarea>
		<div class="commit">
			<div class="left">
				<span class="iconfont icon-xiaolian-01"></span>
				<span class="iconfont icon-aite1"></span>
				<span class="iconfont icon-jinghao"></span>
			</div>
			<div class="right">评论</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'CommentInputBoxCpn',
		data(){
			return{
				letterNum: 140
			}
		},
		methods:{
			input(e){
				this.letterNum = 140 - e.target.value.length
			}
		},
		mounted(){
			document.addEventListener('click',()=>{
				// 控制文本框的焦点
				if(this.$refs.comment===document.activeElement){
					this.$refs.comment.blur()
				}
			})
		}
	}
	
</script>

<style>
	
	.comment-input-box{
		width: 100%;
		position: relative;
	}
	.comment-input-box>.letter-num{
		position: absolute;
		font-size: 12px;
		color: #aaa;
		top: 60px;
		right: 5px;
	}
	
	.comment-input-box>.letter-num.red{
		color: red;
	}
	
	/* 评论区样式 */
	.comment-input-box #comment{
		color: #fff;
		margin-top: 10px;
		width: 100%;
		height: 65px;
		background-color: #383838;
		border: none;
		border-radius: 5px;
		line-height: 20px;
		outline: none;  /*取消轮廓线*/
		resize: none;   /*大小不可变 */
		padding: 5px;
		box-sizing: border-box;
		font-size: 16px;
	}
	
	/* 文本框的滚动条 */
	.comment-input-box #comment::-webkit-scrollbar{
		width: 5px;
		height: 1px;
		background-color: #222;
	}
	
	.comment-input-box #comment::-webkit-scrollbar-thumb{
		border-radius: 10px;
		box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background-color: #383838;
	}
	
	.comment-input-box>.commit{
		height: 30px;
		width: 100%;
		margin-top: 10px;
		margin-bottom: 20px;
	}
	
	/* 评论表情选项 */
	.comment-input-box>.commit>.left{
		float: left;
	}
	.comment-input-box>.commit>.left>.iconfont{
		line-height: 30px;
		font-size: 18px;
		color: #888;
		display: inline-block;
		margin-right: 10px;
		cursor: pointer;
	}
	
	.comment-input-box>.commit>.left>.iconfont:hover{
		color: #d0d0d0;
	}
	
	/* 评论按钮 */
	.comment-input-box>.commit>.right{
		box-sizing: border-box;
		text-align: center;
		font-size: 14px;
		line-height: 30px;
		height: 30px;
		border-radius: 15px;
		float: right;
		padding: 0 15px;
		border: 1px solid #666;
		cursor: pointer;
		color: #d0d0d0;
	}
	
	.comment-input-box>.commit>.right:hover{
		background-color: rgba(255,255,255,.05);
	}
</style>
