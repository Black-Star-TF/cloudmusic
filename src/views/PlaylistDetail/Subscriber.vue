<template>
	<div class="playlist-subscriber">
		<SubscriberItem v-for="subscriber in subscribers" :subscriberItem="subscriber"></SubscriberItem>
	</div>
</template>

<script>
	import {getPlaylistSubscriber} from '@/network/Discover/playlist'
	import SubscriberItem from '@/components/common/SubscriberItem'
	export default {
		name: 'Subscriber',
		data(){
			return {
				pageNum: 1,
				limit: 30,
				subscribers: null,
				hasMore: true
			}
		},
		props:{
			playlist: {
				type: Object,
				require: true
			}
		},
		components:{
			SubscriberItem
		},
		computed:{
			offset(){
				return this.limit * (this.pageNum - 1)
			}
		},
		methods:{
			getPlaylistSubscriberData(){
				getPlaylistSubscriber(this.playlist.id,this.limit,this.offset).then(res=>{
					console.log(res);
					if(this.subscribers){
						this.subscribers = this.subscribers.concat(res.subscribers)
					}else{
						this.subscribers = res.subscribers
					}
					this.hasMore = res.more
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
					this.getPlaylistSubscriberData();
				}
			}
		},
		created(){
			this.getPlaylistSubscriberData()
			
			// 为滚动元素添加鼠标滚轮事件
			this.$root.$children[0].$refs.content.$refs.main.addEventListener('scroll',this.getMoreData);
		}
	}
</script>

<style>
	.playlist-subscriber{
		width: 95%;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
</style>
