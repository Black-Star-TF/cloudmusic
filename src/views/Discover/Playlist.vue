<template>
	<div class="playlist">
		<CategoryModule v-if="show">
			<template slot="title">
				<!-- 显示当前歌单分类 -->
				<div class="title-tag" @click.stop="changePanelState">{{playlistTag}}</div>
				</template>
			<template slot="catalogue">
				<!-- 歌单分类面板 -->
				<CateloguePanel :totalTagName="totalTagName" :currentTagName="playlistTag" v-if="showCateloguePanel" @tagclick="change">
					<template slot="category">
						<PlaylistCategory v-for="(name,id) in categories" :category="{id, name}" :subCate="playlistCategory" :currentTag="playlistTag" @tagChange="change"></PlaylistCategory>
					</template>
				</CateloguePanel>
			</template>
			
			<template slot="shortcut">
				<!-- 显示歌单热门分类 -->
				<div class="hot-playlist-tag">
					<span v-for="tag in hotCategory" :class="{'active': playlistTag==tag.name}" @click="hotCategoryClick(tag.name)">{{tag.name}}</span>
				</div>
			</template>
			
			<template slot="content">
				<!-- 歌单列表 -->
				<PlaylistItem v-for="playlist in playlists" :playlist="playlist" v-if="playlists"></PlaylistItem>
			</template>
		</CategoryModule>
		
		<!-- 页码导航 -->
		<PageNumBtn :pageNum="pageNum" :totalPage="totalPage" @pagebtnclick="turnPage" v-if="playlists"></PageNumBtn>
		
		<!-- 加载动画 -->
		<div class="loading" v-if="!playlists">
			<Loading></Loading>
		</div>
	</div>
</template>

<script>
	import {getHotCategory,getPlaylist,getPlaylistCategory} from '@/network/Discover/playlist';
	import CategoryModule from '@/components/common/CategoryModule';
	import CateloguePanel from '@/components/common/CateloguePanel';
	import PlaylistCategory from '@/components/playlist/PlaylistCategory';
	import PlaylistItem from '@/components/playlist/PlaylistItem';
	import PageNumBtn from '@/components/common/PageNumBtn';
	import Loading from '@/components/common/Loading';
	export default {
		name: 'Playlist',
		data(){
			return{
				playlists: null,
				playlistTag: '全部歌单',
				hotCategory: null,
				playlistCategory: null,
				categories: null,
				totalTagName: null,
				showCateloguePanel: false,
				limit: 50,
				pageNum: 1,
				playlistNum: null
			}
		},
		components:{
			CategoryModule,
			CateloguePanel,
			PlaylistCategory,
			PlaylistItem,
			PageNumBtn,
			Loading
		},
		methods:{
			change(tag){
				if(tag!=this.playlistTag){
					this.playlistTag = tag;
					this.getPlaylistData();
				}
				this.changePanelState();
			},
			changePanelState(){
				this.showCateloguePanel = !this.showCateloguePanel;
			},
			hotCategoryClick(tag){
				this.playlistTag = tag;
				this.getPlaylistData();
			},
			getPlaylistData(){
				this.playlists = null;
				getPlaylist(this.playlistTag,this.limit,this.offset).then(res=>{
					this.playlists = res.playlists;
					if(this.playlistNum==null){
						this.playlistNum = res.total
					}
				})
			},
			turnPage(pageNum){
				this.pageNum = pageNum;
				this.getPlaylistData();
			}
		},
		computed:{
			show(){
				return this.playlistTag && this.hotCategory
			},
			offset(){
				return (this.pageNum-1)*this.limit;
			},
			totalPage(){
				if(this.playlistNum != null){
					return Math.ceil(this.playlistNum/this.limit);
				}else{
					return 0
				}
			}
		},
		created(){
			this.playlistTag = this.$route.query.tag || this.playlistTag
			// 获取热门歌单分类
			getHotCategory().then(res=>{
				this.hotCategory = res.tags;
			})
			
			// 获取歌单分类数据
			getPlaylistCategory().then(res=>{
				if(this.playlistTag == null){
					this.playlistTag = res.all.name;
				}
				this.totalTagName = res.all.name;
				this.categories = res.categories;
				this.playlistCategory = res.sub;
			})
			
			// 获取歌单数据
			this.getPlaylistData();
			
			// 添加鼠标点击事件 当点击歌单分类面板以外的地方关闭歌单分类面板
			document.addEventListener('click',()=>{
				this.showCateloguePanel = false;
			})
		},
	}
	
</script>

<style>
	.title-tag{
		width: 100px;
		height: 32px;
		padding: 5px;
		line-height: 20px;
		box-sizing: border-box;
		text-align: center;
		border: 1px solid #878787;
		border-radius: 15px;
		font-size: 15px;
		position: absolute;
		top: -8px;
		cursor: pointer;
		font-weight: 100;
	}
	
	.title-tag:hover{
		background-color: rgba(255,255,255,.1);
	}
	
	.hot-playlist-tag>span{
		display: inline-block;
		padding: 0 5px;
		font-size: 13px;
		line-height: 20px;
		color: #878787;
		margin-left: 10px;
		cursor: pointer;
		border-radius: 10px;
	}
	
	.hot-playlist-tag>span:hover{
		color: #d0d0d0;
	}
	
	.hot-playlist-tag>span.active{
		color: red;
		background-color: rgba(255,0,0,.15);
	}
</style>