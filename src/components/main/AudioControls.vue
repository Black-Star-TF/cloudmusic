<template>
	<div class="audio-controls">
		<div class="audio-controls-switch">
			<!-- 播放方式 -->
			<!-- 顺序播放 -->
			<!-- 循环播放 -->
			<!-- 随机播放 -->
			<!-- 单曲循环 -->
			<span class="play-mode iconfont icon-shunxubofang" v-if="playMode == 'ordinal'"></span>
			
			<!-- 上一首 -->
			<span class="prev-song iconfont icon-shangyishou3" @click="nextSong"></span>
			
			<!-- 播放状态 -->
			<!-- 播放 -->
			<span class="play-status play iconfont icon-bofang" v-if="paused" @click="changePlayStatus"></span>
			<!-- 暂停 -->
			<span class="play-status pause iconfont icon-zantingtingzhi" v-else @click="changePlayStatus"></span>
			
			<!-- 下一首 -->
			<span class="next-song iconfont icon-xiayishou2" @click="lastSong"></span>
			
			<!-- 是否显示歌词 -->
			<span class="show-lyric">词</span>
		</div>
		
		<div class="audio-controls-progress">
			<!-- 当前播放时间-->
			<span>{{playTime | format}}</span>
			
			<!-- 进度条 -->
			<span class="progress-range" @mousedown="changePlayTime" ref="range">
				<div class="progress-range-pole" ref="progress" :style="{width: progressWidth+'px'}"><span class="right"></span></div>
			</span>
			<!-- 歌曲时长 -->
			<span>{{duration | format}}</span>
		</div>
		<audio :src="url" autoplay ref="audio" @canplay="setDuration" @play="onPlay" @pause="onPause" @ended="ended"></audio>
	</div>
</template>

<script>
	export default {
		name: 'AudioControls',
		data(){
			return {
				timer: null,
				audio: null,
				progressWidth: 0,
				progress: null,
				paused: true,
				duration: 0,
				playTime: 0,
				playMode: 'ordinal',
			}
		},
		props: {
			url: {
				type: String,
				require: true
			},
		},
		methods:{
			// 切换上一首歌
			lastSong(){
				this.$emit('nextsong')
			},
			// 切换下一首歌
			nextSong(){
				this.$emit('lastsong')
			},
			// 一首歌播放完后
			ended(){
				console.log('播放完毕');
				this.nextSong()
			},
			getPlayTime(){
				// 当开始播放时,开启定时器,每隔一秒获取当前播放时间
				this.playTime = this.audio.currentTime
				
				// 将播放时间对应到进度条
				this.progressWidth = (this.audio.currentTime/this.audio.duration)*this.$refs.range.offsetWidth
			},
			onPlay(){
				this.paused = false
				clearInterval(this.timer)
				this.timer= setInterval(this.getPlayTime,1000)
			},
			onPause(){
				this.paused = true
				// 当播放暂停时,清空定时器
				clearInterval(this.timer)
			},
			setDuration(){
				// 获取歌曲时长
				this.duration = this.audio.duration
			},
			changePlayStatus(){
				// 控制歌曲播放暂停
				if(this.audio.src){
					if(this.audio.paused){
						this.audio.play()
					}else{
						this.audio.pause()
					}
				}
			},
			changePlayTime(e){
				// 通过控制进度条来控制音频播放时间
				clearInterval(this.timer)
				this.progressWidth = e.screenX - this.$refs.range.offsetLeft
				
				this.playTime = Math.ceil(this.duration * (this.progressWidth/this.$refs.range.offsetWidth))
				this.$refs.range.onmousemove = e =>{
					this.progressWidth = e.screenX - this.$refs.range.offsetLeft
					this.playTime = Math.ceil(this.duration * (this.progressWidth/this.$refs.range.offsetWidth))
				}
				document.onmouseup = () => {
					if(this.$refs.range.onmousemove != null){
						this.$refs.range.onmousemove = null
						this.audio.currentTime = this.playTime 
						this.timer= setInterval(this.getPlayTime,1000)
					}
				}
			}
		},
		filters: {
			format(second){
				// 格式化时间
				let min = Math.floor(second/60)
				min = min > 9 ? min : '0' + min;
				let sec = Math.ceil(second%60)
				sec = sec > 9 ? sec : '0' + sec;
				return min + ':' + sec
			}
		},
		mounted(){
			this.audio = this.$refs.audio;
			this.progress = this.$refs.progress;
		}
	}
	
</script>

<style scoped>
	.audio-controls{
		height: 69px;
		width: 500px;
	}
	
	.audio-controls>.audio-controls-switch{
		color: #d0d0d0;
		height: 39px;
		display: flex;
		font-size: 12px;
		justify-content: space-evenly;
		padding: 0 100px;
		padding-top: 5px;
	}
	
	.audio-controls-switch>span{
		display: inline-block;
		font-size: 12px;
		width: 19px;
		height: 19px;
		line-height: 19px;
		margin: 10px 0;
		text-align: center;
		cursor: pointer;
	}
	
	.audio-controls-switch>span:hover{
		color: #EC4245;
	}
	
	.play-status.iconfont{
		text-indent: 4px;
		width: 35px;
		height: 35px;
		line-height: 35px;
		font-size: 20px;
		border-radius: 50%;
		margin: 2px 0;
		background-color: rgba(255,255,255,.03);
	}

	.play-status.pause::before{
		position: relative;
		top: 1px;
		left: -2px;
	}
	
	.play-status.iconfont:hover{
		background-color: rgba(255,255,255,.1);
		color: #d0d0d0;
	}
	
	.audio-controls-progress{
		height: 15px;
		line-height: 15px;
		display: flex;
		font-size: 12px;
		color: #777;
		align-items: center;
		justify-content: center;
	}
	
	.progress-range{
		width: 400px;
		display: inline-block;
		height: 2.5px;
		background-color: #444;
		border-radius: 1.5px;
		margin: 0 2px;
	}
	
	.progress-range:hover{
		height: 6px;
		border-radius: 3px;
	}
	
	.progress-range-pole{
		max-width: 100%;
		height: 100%;
		background-color: red;
		border-radius: 3px;
		position: relative;
	}
	
	.progress-range-pole>.right{
		display: none;
		width: 10px;
		height: 10px;
		position: absolute;
		border-radius: 50%;
		right: -5px;
		top: 50%;
		margin-top: -5px;
		background-color: red;
	}
	
	.progress-range:hover>.progress-range-pole>.right{
		display: inline-block;
	}
</style>
