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
		},
		created(){
			this.getPlaylistSubscriberData()
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
