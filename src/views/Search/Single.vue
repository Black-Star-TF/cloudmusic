<template>
	<div class="search-result-single">
		
		<!-- 最佳匹配 -->
		<div class="search-best-match-contaner" v-if="(artist||album)&&pageNum==1">
			<div class="search-best-match-title">最佳匹配</div>
			
			<!-- 歌手 -->
			<div class="search-best-match-item artist" v-if="artist" @click="toArtistDetail">
				<img :src="artist.img1v1Url" class="artist-cover">
				<span>歌手：{{artist.name}} <span class="alias" v-if="artist.alias.length>0">({{artist.alias[0]}})</span></span>
			</div>
			
			<!-- 用户 -->
			<div class="search-best-match-item user" v-if="user" @click="toUserDetail">
				<img :src="user.avatarUrl" class="user-cover">
				<span>用户：{{user.nickname}}</span>
			</div>
			
			<!-- 专辑 -->
			<div class="search-best-match-item album" v-if="album" @click="toAlbumDetail">
				<img :src="album.picUrl" class="album-cover">
				<span class="album-name">专辑：{{album.name}}</span>
				<span class="album-artist-name">{{album.artist.name}}</span>
			</div>
		</div>
		
		
		<!-- 歌曲列表 -->
		<SongListTable :songs="songs" v-if="songs" head hot></SongListTable>
		<!-- 页码导航 -->
		<PageNumBtn :pageNum="pageNum" :totalPage="totalPage" @pagebtnclick="turnPage" v-if="songs"></PageNumBtn>
		<Loading v-else></Loading>
	</div>
</template>

<script>
	import {search,bestMatch} from '@/network/Search/search';
	import SongListTable from '@/components/common/SongListTable';
	import Loading from '@/components/common/Loading';
	import PageNumBtn from '@/components/common/PageNumBtn';
	export default {
		name: 'Single',
		data(){
			return {
				limit: 100,
				type: 1,
				pageNum: 1,
				total: 0,
				songs: null,
				artist: null,
				album: null,
				user: null
			}
		},
		props:{
			keyword: String
		},
		components:{
			SongListTable,
			Loading,
			PageNumBtn
		},
		computed:{
			offset(){
				return this.limit * (this.pageNum -1)
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
			toUserDetail(){
				this.$router.push({
					path: '/userdetail',
					query:{
						id: this.user.userId
					}
				})
			},
			toArtistDetail(){
				this.$router.push({
					path: '/artistdetail',
					query:{
						id: this.artist.id
					}
				})
			},
			toAlbumDetail(){
				this.$router.push({
					path: '/albumdetail',
					query:{
						id: this.album.id
					}
				})
			},
			getSearchData(){
				this.songs = null;
				search(this.keyword,this.type,this.limit,this.offset).then(res=>{
					this.total = res.result.songCount
					this.songs = res.result.songs
					
					this.$emit('getResult',`找到 ${this.total} 首单曲`)
				})
			},
			getBestMatchData(){
				this.artist = null;
				this.album = null;
				this.user = null;
				// 获取最佳匹配
				bestMatch(this.keyword).then(res=>{
					this.artist = res.result.artist ? res.result.artist[0] : null;
					this.album = res.result.album ? res.result.album[0] : null;
					this.user = res.result.user ? res.result.user[0] : null;
				})
			}
		},
		created(){
			this.$emit('getResult',`找到 ${this.total} 首单曲`);
			this.getSearchData();
			
			this.getBestMatchData();
		},
		watch: {
			keyword(){
				//将数据重新加载
				this.getSearchData();
				this.getBestMatchData();
			}
		},
	}
	
</script>

<style>
	
	.search-best-match-contaner{
		height: 140px;
		border-bottom: 1px solid #444;
		padding-left: 30px;
		box-sizing: border-box;
	}
	
	.search-best-match-title{
		height: 20px;
		line-height: 20px;
		margin-top: 20px;
		font-size: 12px;
		font-weight: 600;
	}
	
	.search-best-match-item{
		width: 360px;
		height: 80px;
		margin: 20px 0;
		background-color: #333;
		float: left;
		margin-right: 90px;
		border-radius: 5px;
		overflow: hidden;
		cursor: pointer;
	}
	
	.search-best-match-item.artist>span,.search-best-match-item.user>span{
		line-height: 80px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.search-best-match-item.artist>span>span.alias{
		color: #777;
	}
	
	.search-best-match-item.artist>.artist-cover,.search-best-match-item.album>.album-cover{
		width: 80px;
		height: 80px;
		float: left;
		margin-right: 15px;
	}
	
	.search-best-match-item.user>.user-cover{
		width: 60px;
		height: 60px;
		border-radius: 50%;
		margin: 10px;
		margin-right: 30px;
		float: left;
	}
	
	.search-best-match-item.user>span{
		font-size: 12px;
	}
	
	.search-best-match-item.album>span{
		display: inline-block;
		line-height: 20px;
		width: 220px;
		position: relative;
		top: 20px;
		font-size: 15px;
	}
	
	.search-best-match-item.album>span.album-artist-name{
		font-size: 13px;
		color: #888;
	}
</style>
