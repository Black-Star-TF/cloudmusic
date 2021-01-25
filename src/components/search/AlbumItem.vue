<template>
	<div class="search-album-item" @click="toAlbumDetail">
		<img :src="album.picUrl" class="album-cover">
		<span class="album-name">{{album.name}}<span class="album-name-alia" v-if="album.alias.length>0">({{album.alias[0]}})</span></span>
		<span class="album-creator"><span class="album-creator-name" @click.stop="toArtistDetail">{{album.artist.name}}<span class="album-creater-alia" v-if="album.artist.alias.length>0">({{album.artist.alias[0]}})</span></span></span>
	</div>
</template>

<script>
	export default {
		name: 'AlbumItem',
		props:{
			album:{
				type: Object,
				require: true
			}
		},
		methods:{
			toAlbumDetail(){
				this.$router.push({
					path: '/albumdetail',
					query:{
						id: this.album.id
					}
				})
			},
			toArtistDetail(){
				this.$router.push({
					path: '/artistdetail',
					query:{
						id: this.album.artist.id
					}
				})
			}
		}
	}
	
</script>

<style>
	
	.search-album-item{
		width: 100%;
		height: 80px;
		padding-left: 30px;
		position: relative;
		cursor: pointer;
	}
	
	.search-album-item:nth-of-type(2n){
		background-color: rgba(255,255,255,.03);
	}
	
	.search-album-item:hover{
		background-color: rgba(255,255,255,.05);
	}
	.album-cover{
		border-radius: 5px;
		width: 60px;
		height: 60px;
		margin: 10px 0;
		margin-right: 10px;
		float: left;
	}
	
	.album-name{
		color: #ddd;
	}
	
	.album-name:hover{
		color: #fff;
	}
	
	.album-name{
		width: 40%;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		font-size: 14px;
	}
	
	.album-name-alia{
		color: #666;
	}
	
	.album-name,.album-creator{
		line-height: 80px;
	}
	
	.album-creator{
		position: absolute;
		left: 50%;
		font-size: 12px;
		color: #999;
	}
	.album-creator-name:hover{
		color: #ccc;
	}
	
	.album-creater-alia{
		color: #666;
	}
</style>
