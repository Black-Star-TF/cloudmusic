<template>
	<div class="serach-result-video">
		
		<div class="serach-result-video-container" v-if="videos">
			<VideoItem v-for="video in videos" :video="video"></VideoItem>
		</div>
				
		<!-- 页码导航 -->
		<PageNumBtn :pageNum="pageNum" :totalPage="totalPage" @pagebtnclick="turnPage" v-if="videos"></PageNumBtn>
	</div>
</template>

<script>
	import {search} from '@/network/Search/search';
	import VideoItem from '@/components/search/VideoItem';
	import CategoryModule from '@/components/common/CategoryModule';
	import PageNumBtn from '@/components/common/PageNumBtn';
	export default {
		name: 'Video',
		data(){
			return{
				limit: 60,
				total: 0,
				pageNum: 1,
				type: 1014,
				videos: null,
			}
		},
		props:{
			keyword: String
		},
		components:{
			VideoItem,
			CategoryModule,
			PageNumBtn
		},
		computed:{
			offset(){
				return this.limit * (this.pageNum - 1)
			},
			totalPage(){
				if(this.total != 0){
					return Math.ceil(this.total/this.limit);
				}else{
					return 0
				}
			}
		},
		methods:{
			turnPage(pageNum){
				this.pageNum = pageNum;
				this.getSearchData();
			},
			getSearchData(){
				this.videos  = null;
				search(this.keyword,this.type,this.limit,this.offset).then(res=>{
					console.log(res);
					this.total = res.result.videoCount;
					this.videos = res.result.videos;
					
					this.$emit('getResult',`找到 ${this.total} 个视频`);
				})
			}
		},
		created(){
			this.$emit('getResult',`找到 ${this.total} 个视频`);
			this.getSearchData();
		}
	}
	
</script>

<style>
	.serach-result-video{
		padding: 25px 30px;
	}
	.serach-result-video-container{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

</style>
