<template>
	<div class="dj-subscriber">
		<SubscriberItem v-for="subscriber in subscribers" :subscriberItem="subscriber"></SubscriberItem>
	</div>
</template>

<script>
	import {getRadioSubscriber} from '@/network/Discover/djProgram'
	import SubscriberItem from '@/components/common/SubscriberItem'
	export default {
		name: 'Subscriber',
		data(){
			return{
				rid: null,
				limit: 30,
				time: -1,
				subscribers: null,
				hasMore: null
			}
		},
		components:{
			SubscriberItem
		},
		methods:{
			getRadioSubscriberData(){
				getRadioSubscriber(this.rid,this.limit,this.time).then(res=>{
					if(this.subscribers){
						this.subscribers = this.subscribers.concat(res.subscribers)
					}else{
						this.subscribers = res.subscribers;
					}
					this.time = res.time;
					this.hasMore = res.hasMore;
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
					this.getRadioSubscriberData();
				}
			}
		},
		created(){
			this.rid = this.$route.query.id;
			this.getRadioSubscriberData();
			
			// 为滚动元素添加鼠标滚轮事件
			this.$root.$children[0].$refs.content.$refs.main.addEventListener('scroll',this.getMoreData);
		}
	}
	
</script>

<style>
	.dj-subscriber{
		width: 95%;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
</style>
