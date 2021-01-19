<template>
	<!-- 新歌速递页面，歌曲列表组件 -->
	
	<div class="new-song-item-container" @dblclick="play">
		<div class="new-song-index">{{indexStr}}</div>
		<img v-lazy="newSongItem.album.picUrl" class="new-song-img" @click="play">
		<div class="new-song-name">{{newSongItem.name}}</div>
		<div class="new-song-artists">
			<span class="new-song-artist-item" v-for="(artistItem,index) in newSongItem.artists">
				<span class="new-song-artist-name">{{artistItem.name}}</span>
				<span class="dilimiter" v-if="index < newSongItem.artists.length - 1">/</span>
			</span>
		</div>
		<div class="new-song-album">
			<span class="new-song-album-name">{{newSongItem.album.name}}</span>
			<span class="new-song-album-alia" v-if="newSongItem.transNames">（{{newSongItem.transNames[0]}}）</span>
		</div>
		<div class="new-song-duration">{{duration}}</div>
	</div>
</template>

<script>
	export default {
		name: 'NewestSongListItem',
		props:{
			newSongItem:{
				type: Object,
				require: true
			},
			index: Number
		},
		computed:{
			duration(){
				let sec = Math.floor(this.newSongItem.duration/1000)
				let minutes = Math.floor(sec/60)
				let seconds = sec%60
				return `${ minutes > 10 ? minutes : "0"+minutes}:${seconds>=10 ? seconds : "0"+seconds}`
			},
			indexStr(){
				return this.index > 9 ? this.index : '0'+this.index
			}
		},
		methods:{
			play(){
				// 修改当前播放歌曲id
				// this.$store.commit('setCurrentSongId',{songId: this.newSongItem.id})
				// 播放歌曲
				// this.$store.dispatch('play')
			}
		}
	}
	
</script>

<style>
	.new-song-item-container{
		width: 100%;
		height: 80px;
		text-align: left;
		line-height: 80px;
		position: relative;
		font-size: 13px;
		color: #aaa;
	}
	
	.new-song-item-container:nth-of-type(2n-1){
		background-color: rgba(255,255,255,.05);
	}
	
	.new-song-img{
		display: block;
		width: 60px;
		height: 60px;
		margin: 10px 0;
		border-radius: 5px;
		position: absolute;
		cursor: pointer;
	}
	
	.new-song-item-container div{
		height: 100%;
		position: absolute;
		top: 0;
	}
	
	.new-song-item-container .new-song-index{
		left: 0;
		width: 5%;
		text-align: center;
	}
	
	.new-song-item-container .new-song-img{
		left: 5%;
	}
	
	.new-song-item-container .new-song-name{
		left: calc(6% + 60px);
		width: 35%;
		color: #ddd;
		font-size: 14px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.new-song-item-container .new-song-artists{
		left: 50%;
		width: 15%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.new-song-artist-name{
		cursor: pointer;
	}
	
	.new-song-artist-name:hover{
		color: #ddd;
	}
	
	.new-song-item-container .new-song-album{
		left: 70%;
		width: 22%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		cursor: pointer;
	}
	
	.new-song-album:hover .new-song-album-name{
		color: #ddd;
	}
	
	.new-song-item-container .new-song-duration{
		right: 1%;
	}
</style>
