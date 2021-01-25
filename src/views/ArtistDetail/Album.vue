<template>
	<div class="artist-album">
		<AlbumItem v-for="album in albums" :album="album"></AlbumItem>
	</div>
</template>

<script>
	import {getSingerAlbum} from '@/network/Discover/singer';
	import AlbumItem from '@/components/album/AlbumItem'
	export default {
		name: 'Album',
		data(){
			return {
				id: null,
				albums: null,
				limit: 18,
				pageNum: 1,
				hasMore: null,
				timer: null
			}
		}, 
		computed: {
			offset() {
				return this.limit * (this.pageNum - 1)
			}
		},
		methods: {
			getSingerAlbumData() {
				getSingerAlbum(this.id,this.limit,this.offset).then(res=>{
					if(this.albums == null){
						this.albums = res.hotAlbums
					}else{
						this.albums = this.albums.concat(res.hotAlbums)
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
					this.pageNum += 1;
					this.getSingerAlbumData();
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
		components: {
			AlbumItem
		},
		created(){
			this.id = this.$route.query.id
			this.getSingerAlbumData()
		},
		mounted(){
			// 为滚动元素添加鼠标滚轮事件
			this.$root.$children[0].$refs.content.$refs.main.addEventListener('scroll',this.throttle);
		}
	}
	
</script>

<style>
	.artist-album{
		padding: 10px 30px 30px;
		display: flex;
		flex-wrap: wrap;
		justify-content: start;
	}
</style>
