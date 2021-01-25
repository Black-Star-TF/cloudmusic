<template>
	<div class="artist-mv" v-if="mvs">
		<VideoItem v-for="(mv,index) in mvs" :video="mv" :index="index" :columns="5"></VideoItem>
	</div>
</template>

<script>
	import {getSingerMV} from '@/network/Discover/singer';
	import VideoItem from '@/components/video/VideoItem';
	export default {
		name: 'MV',
		data(){
			return {
				id: null,
				limit: 15,
				mvs: null,
				pageNum: 1,
				hasMore: null
			}
		},
		components: {
			VideoItem
		},
		computed: {
			offset() {
				return this.limit * (this.pageNum - 1)
			}
		},
		methods: {
			getSingerMVData(){
				getSingerMV(this.id,this.limit,this.offset).then(res=>{
					if(this.mvs == null){
						this.mvs = res.mvs
					}else{
						this.mvs = this.mvs.concat(res.mvs)
					}
					this.hasMore = res.hasMore
				})
			},
			getMoreData(){
				// 鼠标滚动到底部，获取更多数据
				// 获取滚动元素
				let mainEle = this.$root.$children[0].$refs.content.$refs.main;
				// 获取滚动条属性
				let scrollTop = mainEle.scrollTop;
				let offsetHeight = mainEle.offsetHeight;
				let scrollHeight = mainEle.scrollHeight;
				// 判断是否滚动到底部
				if (scrollHeight - offsetHeight - scrollTop <= 5 && this.hasMore) {
					this.pageNum += 1;
					this.getSingerMVData();
				}
			},
			throttle(){
				if (this.timer == null) {
					this.timer = setTimeout(()=>{
						this.getMoreData()
						this.timer = null;
					}, 2000);
				}
			}
		},
		created(){
			this.id = this.$route.query.id;
			this.getSingerMVData()
		},
		mounted(){
			// 为滚动元素添加鼠标滚轮事件
			this.$root.$children[0].$refs.content.$refs.main.addEventListener('scroll',this.throttle);
		}
	}
	
</script>

<style>
	
	.artist-mv{
		display: flex;
		flex-wrap: wrap;
		padding: 10px 30px 30px;
		justify-content: start;
	}
</style>
