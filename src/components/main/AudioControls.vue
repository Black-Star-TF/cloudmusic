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
			<span class="show-lyric" :class="{'show':showLyric}" @click="changeLrcStatus">词</span>
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
		
		
		<div class="lyric-panel" v-if="showLyric">{{currentLrc}}</div>
	</div>
</template>

<script>
	export default {
		name: 'AudioControls',
		data(){
			return {
				lrcTimer: null,
				timer: null,
				audio: null,
				progressWidth: 0,
				progress: null,
				paused: true,
				duration: 0,
				playTime: 0,
				playMode: 'ordinal',
				currentLrc: '',
				parsedLrc: [],
				flagN: 0,
				delay: 0.5,
				showLyric: false
			}
		},
		props: {
			url: {
				type: String,
				require: true
			},
		},
		methods:{
			changeLrcStatus(){
				if(this.showLyric){
					this.showLyric = false;
					clearInterval(this.lrcTimer);
				}else{
					this.showLyric = true;
					this.locLrc();
					this.lrcTimer = setInterval(this.showLrc, 100);
				}
			},
			switchSong(){
				clearInterval(this.timer);
				clearInterval(this.lrcTimer);
				this.progressWidth = 0;
				this.playTime = 0;
				this.flagN = 0;
			},
			// 切换上一首歌
			lastSong(){
				this.switchSong();
				this.$emit('nextsong')
			},
			// 切换下一首歌
			nextSong(){
				this.switchSong();
				this.$emit('lastsong')
			},
			// 一首歌播放完后
			ended(){
				this.switchSong();
				this.nextSong()
			},
			getPlayTime(){
				// 当开始播放时,开启定时器,每隔一秒获取当前播放时间
				this.playTime = this.audio.currentTime
				
				// 将播放时间对应到进度条
				this.progressWidth = (this.audio.currentTime/this.audio.duration)*this.$refs.range.offsetWidth
			},
			onPlay(){
				this.paused = false;
				clearInterval(this.timer);
				clearInterval(this.lrcTimer);
				
				this.timer= setInterval(this.getPlayTime,1000);
				if(this.showLyric){
					this.lrcTimer = setInterval(this.showLrc, 100);
				}
			},
			onPause(){
				this.paused = true;
				// 当播放暂停时,清空定时器
				clearInterval(this.timer);
				clearInterval(this.lrcTimer);
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
				clearInterval(this.lrcTimer);
				this.progressWidth = e.screenX - this.$refs.range.offsetLeft
				
				this.playTime = Math.ceil(this.duration * (this.progressWidth/this.$refs.range.offsetWidth))
				this.$refs.range.onmousemove = e =>{
					this.progressWidth = e.screenX - this.$refs.range.offsetLeft
					this.playTime = Math.ceil(this.duration * (this.progressWidth/this.$refs.range.offsetWidth))
				}
				document.onmouseup = () => {
					if(this.$refs.range.onmousemove != null){
						
						this.audio.currentTime = this.playTime;
						this.$refs.range.onmousemove = null
						this.timer= setInterval(this.getPlayTime,1000)
						
						if(this.showLyric){
							this.locLrc();
							this.lrcTimer = setInterval(this.showLrc, 100);
						}
					}
				}
			},
			// 定位歌词
			locLrc(){
				// 定位歌词
				let curTime = this.audio.currentTime+this.delay;
				
				for(let i = 0; i < this.parsedLrc.length; i++){
					if(curTime>=this.parsedLrc[i][0]&&(i+1>=this.parsedLrc.length||curTime<this.parsedLrc[i+1][0])){
						this.flagN = i;
						break;
					}
				}
			},
			// 解析歌词
			parseLrc(lrc){
				let timeReg = /\[\d{2}:\d{2}\.\d{2,3}\]/g;//匹配时间的正则表达式
				let result = [];
				
				lrc = lrc.split('\n')
				lrc.pop()
				for (let i=0;i<lrc.length;i++) {
					let time = lrc[i].match(timeReg); //获取歌词里的时间
					let value = lrc[i].replace(timeReg, ""); //获取纯歌词文本
					let t = time[0].slice(1, -1).split(":"); //t[0]分钟，t[1]秒
					let timeArr = parseInt(t[0]) * 60 + parseFloat(t[1]);
					
					if(value == ''){
						continue;
					}
					result.push([timeArr, value]);//以[时间(秒)，歌词]的形式存进result
				}
				this.parsedLrc = result;
				
				if(this.showLyric){
					this.locLrc();
					this.lrcTimer = setInterval(this.showLrc, 100);//设置定时，每200毫秒更新一下
				}
			},
			showLrc(){
				let curTime = this.audio.currentTime + this.delay;//获取当前的播放时间
				if ((this.flagN+1 <= this.parsedLrc.length-1) && (curTime >= this.parsedLrc[this.flagN][0]) && (curTime < this.parsedLrc[this.flagN+1][0])) {
					this.currentLrc = this.parsedLrc[this.flagN][1];
					this.flagN += 1;
				}
			}
		},
		filters: {
			format(second){
				// 格式化时间
				let min = Math.floor(second/60)
				min = min > 9 ? min : '0' + min;
				let sec = Math.floor(second%60)
				sec = sec > 9 ? sec : '0' + sec;
				return min + ':' + sec
			}
		},
		mounted(){
			this.audio = this.$refs.audio;
			this.progress = this.$refs.progress;
		},
		computed: {
			isPaused() {
				return this.$store.state.paused;
			},
			lyric(){
				return this.$store.state.lyric;
			}
		},
		watch: {
			isPaused(val) {
				if(val){
					this.audio.pause()
				}
			},
			url(val){
				this.switchSong();
			},
			lyric(val){
				this.parseLrc(val)
			}
		},
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
	
	.audio-controls-switch>span.show-lyric.show{
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
	
	.lyric-panel{
		width: 660px;
		height: 60px;
		background-color: rgba(0,0,0,.4);
		line-height: 60px;
		font-size: 25px;
		text-align: center;
		position: fixed;
		top: 0;
		left: 60%;
		/* margin-top: -35px; */
		margin-left: -330px;
	}
</style>
