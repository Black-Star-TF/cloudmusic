<template>
	<div class="newest-song">
		<CategoryModule>
			<template slot="title">
				<!-- 新歌速递分类 -->
				<div class="newest-music-area-type">
					<div class="newest-music-area-type-item" v-for="(value,key) in songAreaList" @click="changeCategory({value,key})" :class="{'active':key == currentSongArea}">{{key}}</div>
				</div>
			</template>
			<template slot="shortcut">
				<!-- 新歌速递操作 -->
				<div class="newest-song-opration">
					<div class="newest-song-opration-item play">播放全部</div>
					<div class="newest-song-opration-item collect">收藏全部</div>
				</div>
			</template>
			<template slot="content">
				<NewestSongListItem v-for="(songItem,index) in newestSongs" :newSongItem="songItem" :index="index+1" v-if="newestSongs"></NewestSongListItem>
			</template>
		</CategoryModule>
		
		<Loading v-if="!newestSongs"></Loading>
	</div>
</template>

<script>
	import {getNewestSong} from '@/network/Discover/newest'
	import CategoryModule from '@/components/common/CategoryModule';
	import NewestSongListItem from '@/components/newest/NewestSongListItem';
	import Loading from '@/components/common/Loading';
	export default {
		name: 'NewestSong',
		components:{
			CategoryModule,
			NewestSongListItem,
			Loading
		},
		data(){
			return{
				newestSongs: null,
				songAreaList: {'全部': 0,'华语': 7,'欧美': 96,'韩国': 16,'日本': 8},
				currentSongArea: '全部'
			}
		},
		methods:{
			changeCategory(category){
				if(this.currentSongArea != category.key){
					this.currentSongArea = category.key;
					this.getNewestSongData();
				}
			},
			// 请求新歌速递数据
			getNewestSongData(){
				this.newestSongs = null;
				getNewestSong(this.songAreaList[this.currentSongArea]).then(res=>{
					this.newestSongs = res.data;
				})
			}
		},
		created(){
			this.getNewestSongData();
		}
	}
</script>

<style>
	
	.newest-music-area-type{
		display: flex;
	}
	
	.newest-music-area-type-item{
		margin-right: 20px;
		font-size: 14px;
		font-weight: normal;
		color: #878787;
		cursor: pointer;
	}
	
	.newest-music-area-type-item.active{
		font-weight: 600;
		color: #fff;
	}
	
	.newest-music-area-type-item:hover{
		color: #fff;
	}
	
	.newest-song-opration{
		display: flex;
	}
	
	.newest-song-opration-item{
		width: 90px;
		height: 24px;
		border-radius: 12px;
		margin-left: 10px;
		font-size: 14px;
		box-sizing: border-box;
		text-align: center;
		line-height: 24px;
		cursor: pointer;
	}
	
	.newest-song-opration-item.play{
		background-color: #EC4141;
		color: #fff;
	}
	
	.newest-song-opration-item.collect{
		color: #d0d0d0;
		border: 1px solid #666;
	}
</style>
