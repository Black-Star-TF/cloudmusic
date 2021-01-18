<template>
	
	<div class="slider-container" :style="sliderStyle" ref="slider" @mouseover="pause()" @mouseout="play()">
		<!-- 轮播图组件 -->
		<div class="slider-main">
			<img :src="item" class="slider-item" v-for="(item,index) in bannersUrlList" :height="imgWidth">
			<!-- 切换按钮 -->
			<div class="slider-btn left" @click="prev()"><span class="iconfont icon-shangyige"></span></div>
			<div class="slider-btn right" @click="next()"><span class="iconfont icon-shangyige"></span></div>
		</div>
		
		<!-- 导航图标 -->
		<div class="slider-dot" v-if="dots">
			<div class="slider-dot-item" v-for="(item,index) in bannersUrlList" @mouseover="switchTo(index)" :style="getDotsStyle(index)"></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Slider',
		data(){
			return{
				nextIndex: 0,       // 下一张显示图片的编号
				prevIndex: 0,       // 上一张显示图片的编号
				currentIndex: 0,    // 当前显示图片的编号
				bannersUrlList: [],        // 定义存放轮播图图片url的数组
				timer: null,        // 定时器
				sliderItemList: []  // 定义存放图片节点的数组
			}
		},
		props:{
			// 定义轮播图接收的参数
			height:{
				type: String,
				default: '300'
			},
			bannersData:{
				type:Array,
				require: true
			},
			// 是否显示导航图标
			dots: {
				type: Boolean,
				default: true
			},
			// 是否自动播放
			autoPlay:{
				type: Boolean,
				default: true
			},
			// 轮播速度
			speed:{
				default: 3
			},
			// 导航图标颜色
			dotStyle:{
				type: String,
				default: 'red'
			}
		},
		methods:{
			switchTo(index){
				// 切换当前显示的图片
				this.currentIndex = index;
				this.action();
			},
			
			// 定义轮播图的主要行为
			action(){
				
				// 根据当前显示图片的设置上一张和下一张图片
				this.prevIndex = this.currentIndex != 0 ? this.currentIndex - 1 : this.bannersUrlList.length - 1;
				this.nextIndex = this.currentIndex != this.bannersUrlList.length - 1 ? this.currentIndex + 1 : 0;
				
				// 清空所有导航图标的附加class
				for(let item of this.sliderItemList){
					item.classList.remove('active');
					item.classList.remove('next');
					item.classList.remove('prev');
				}
				
				// 为图片对应的导航图标添加相应的class
				this.sliderItemList[this.currentIndex].classList.add('active');
				this.sliderItemList[this.prevIndex].classList.add('prev');
				this.sliderItemList[this.nextIndex].classList.add('next');
			},
			
			next(){
				// 切换下一张图片
				this.currentIndex = ++this.currentIndex % this.bannersUrlList.length;
				this.action();
			},
			prev(){
				// 切换上一张图片
				this.currentIndex = this.currentIndex != 0 ? this.currentIndex-1 : this.bannersUrlList.length - 1;
				this.action();
			},
			
			// 定义播放轮播图的操作
			play(){
				// 在开始播放前,先清空定时器,防止定时器叠加
				this.pause()
				if(this.autoPlay){
					this.timer = setInterval(()=>{
						this.next();
					},parseInt(this.speed)*1000);
				}
			},
			pause(){
				//暂停轮播图 
				clearInterval(this.timer);
			},
			// 设置活动导航图标样式
			getDotsStyle(index){
				if(index == this.currentIndex){
					return {
						backgroundColor: this.dotStyle
					}
				}else{
					return {}
				}
			}
		},
		computed:{
			sliderStyle(){
				// 根据传入参数为轮播图设置高度
				return {
					height: `${parseInt(this.height)+20}px`
				}
			},
			imgWidth(){
				// 设置轮播图片的大小
				return this.height
			}
		},
		mounted() {
			
			// 获取所有图片节点
			this.sliderItemList = this.$refs.slider.querySelectorAll('.slider-container .slider-main .slider-item')
			this.action()
			
			// 开始播放
			this.play()
		},
		created(){
			// 通过传入的数据获取轮播图片url
			for(let item of this.bannersData){
				this.bannersUrlList.push(item.imageUrl||item.pic)
			}
		}
	}
</script>

<style>
	
	.slider-container{
		width: 100%;
		height: 100%;
		margin: 20px auto;
		perspective: 1080px;
		background-size: 100% 100%;
		padding: 30px 0;
	}
	
	/* 轮播图图片区域样式 */
	
	.slider-container .slider-main{
		position: relative;
		width: 100%;
		height: calc(100% - 20px);
		left: 0;
		top: 0;
		background-size: inherit;
	}
	
	/* 切换按钮样式 */
	.slider-container .slider-main .slider-btn{
		position: absolute;
		width: 25px;
		height: 25px;
		line-height: 21px;
		border-radius: 50%;
		top: 50%;
		margin-top: -12px;
		z-index: 30;
		background-color: rgba(0,0,0,.4);
		display: none;
		text-align: center;
	}
	
	.slider-container .slider-main .slider-btn>.iconfont{
		font-size: 12px;
	}
	
	
	.slider-container .slider-main .slider-btn.left{
		left: 10px;
	}
	
	.slider-container .slider-main .slider-btn.right{
		right: 10px;
		transform: rotate(180deg);
	}
	
	.slider-container .slider-main:hover .slider-btn{
		display: block;
	}
	
	.slider-container .slider-main .slider-item{
		display: block;
		position: absolute;
		top: 0;
		left: 50%;
		transition: 400ms all ease-in-out;
		transform: translate3d(-50%,0,-80px);
		z-index: 1;
		border-radius: 10px;
	}
	
	.slider-container .slider-main .slider-item.active{
		transform: translate3d(-50%,0,200px);
		z-index: 25;
	}
	
	.slider-container .slider-main .slider-item.next{
		left: 100%;
		transform: translate3d(-100%,0,0px);
		z-index: 18;
	}
	
	.slider-container .slider-main .slider-item.prev{
		left: 0;
		transform: translate3d(0,0,0px);
		z-index: 17;
	}
	
	
	/* 轮播图导航图标样式 */
	.slider-dot{
		height: 20px;
		position: absolute;
		display: flex;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		align-items: center;
	}
	.slider-dot .slider-dot-item{
		width: 5px;
		height: 5px;
		border-radius: 50%;
		flex: 1;
		margin: 0 5px;
		background-color: rgba(255,255,255,.2);
	}
	
</style>
