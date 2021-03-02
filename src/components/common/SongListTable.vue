<template>
	<div class="song-list-table">
		<!-- 表格标题 -->
		<div class="table-row title-container" v-if="head">
			<div class="operation-of-song column-item"></div>
			<div class="name-of-song column-item">音乐标题</div>
			<div class="hot-of-song column-item" v-if="hot">热度</div>
			<div class="duration-of-song column-item">时长</div>
			<div class="album-of-song column-item" v-if="album">专辑</div>
			<div class="singer-of-song column-item" v-if="singer">歌手</div>
		</div>
		
		<!-- 歌曲 -->
		<div class="table-row songItem" v-for="(song,index) in songs" :key="song.id" :class="{'activeItem': index==currentIndex}" @click="itemClick(index)" @dblclick="play(song)">
			
			<!-- 对歌曲的操作 -->
			<div class="operation-of-song column-item">
				<span v-if="song.id==songId" style="color: red;">播</span>
				<span v-else>{{index+1 >= 10 ? index+1: "0"+(index+1)}}</span>
				
				<span class="iconfont icon-xihuan"></span>
				<span class="iconfont icon-xiazai"></span>
			</div>
			
			<div class="name-of-song column-item">
				<!-- 歌曲名称 -->
				<span class="songItem-name">{{song.name}}</span>
				<!-- 别名 -->
				<span class="songItem-alia" v-if="song.alia.length != 0">（{{song.alia[0]}})</span>
				<!-- 是否需要会员 -->
				<!-- <span class="songItem-tag vip" v-if="song.fee=='1'">VIP</span> -->
				<!-- 是否可以试听 -->
				<!-- <span class="songItem-tag audition" v-if="song.fee=='1'&&!song.privilege.cp=='0'">试听</span> -->
				
				<!-- 是否含有SQ版本 -->
				<!-- <span class="songItem-tag sq" v-if="song.originCoverType==1">SQ</span> -->
				<!-- 是否有mv -->
				<span class="songItem-tag mv" v-if="song.mv" @click="toMVDetail(song.mv)">MV</span>
			</div>
			
			<!-- 歌曲热度 -->
			<div class="hot-of-song column-item" v-if="hot">
				<div class="hot-range">
					<div class="hot-content" :style="hotStyle(song)"></div>
				</div>
			</div>
			
			<!-- 歌曲时长 -->
			<div class="duration-of-song column-item">{{song.dt | duration}}</div>
			
			<!-- 专辑 -->
			<div class="album-of-song column-item" v-if="album">
				<span class="songItem-album" @click="toAlbumDetail(song.al)">{{song.al.name}}</span>
			</div>
			
			<!-- 歌手   -->
			<div class="singer-of-song column-item" v-if="singer">
				<span v-for="(singer,index) in song.ar">
					<span class="singer-name" @click="toArtistDetail(singer)">{{singer.name}}</span>
					<span class="dilimiter" v-if="index < song.ar.length -1"> / </span>
				</span>
			</div>
			
			<!-- 歌词 -->
			<div class="lyric-of-song" :class="{'show': arr[index]}" v-if="lyric">
				<span class="songItem-lyric" v-html="lyrics(song)"></span>
				
				<div class="lyric-option1 lyric-option">
					<div class="btn-show" @click="changeLyricState(index)">
						<span v-if="!arr[index]">展开歌词</span>
						<span v-else>收起歌词</span>
					</div>
					<div class="btn-copy">复制歌词</div>
				</div>
				
				<div class="lyric-option2 lyric-option">
					<div class="btn-show" @click="changeLyricState(index)">
						<span v-if="!arr[index]">展开歌词</span>
						<span v-else>收起歌词</span>
					</div>
					<div class="btn-copy">复制歌词</div>
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'SongListTab',
		data(){
			return{
				currentIndex: -1,
				arr: []
			}
		},
		props:{
			lyric:{
				type: Boolean,
				default: false
			},
			songs:{
				type: Array,
				require: true
			},
			head:{
				type: Boolean,
				default: false
			},
			singer:{
				type: Boolean,
				default: true
			},
			album:{
				type: Boolean,
				default: true
			},
			hot:{
				type: Boolean,
				default: false
			}
		},
		computed: {
			songId() {
				return this.$store.state.currentSong ? this.$store.state.currentSong.id : null;
			}
		},
		methods:{
			toArtistDetail(singer){
				this.$router.push({
					path: '/artistdetail',
					query:{
						id: singer.id
					}
				})
			},
			changeLyricState(index){
				let temp = this.arr[index]
				this.arr.splice(index,1,!temp)
			},
			lyrics(song){
				if(song.lyrics){
					return song.lyrics.join('\n');
				}else{
					return '';
				}
			},
			// hasAudition(song,index){
			// 	if(song.privilege){
			// 		return 
			// 	}else{
					
			// 	}
			// }
			toAlbumDetail(album){
				this.$router.push({
					path: '/albumdetail',
					query:{
						id: album.id
					}
				})
			},
			hotStyle(song){
				return{
					width: `${song.pop}%`
				}
			},
			toMVDetail(id){
				this.$router.push({
					path: '/videodetail',
					query:{
						id: id
					}
				})
			},
			itemClick(index){
				this.currentIndex = index;
			},
			play(song){
				// 播放歌曲
				this.$store.dispatch('play',song)
			}
		},
		filters:{
			duration(dt){
				let sec = Math.floor(dt/1000);
				let minutes = Math.floor(sec/60);
				let seconds = sec%60;
				return `${ minutes > 10 ? minutes : "0"+minutes}:${seconds>=10 ? seconds : "0"+seconds}`;
			}
		},
		created(){
			for(const song of this.songs){
				this.arr.push(false)
			}
			
		}
	}
</script>

<style>
	
	.table-row{
		font-size: 13px;
		color: #888;
		cursor: default;
		overflow: hidden;
		box-sizing: border-box;
	}
	
	
	.title-container.table-row{
		height: 35px;
	}
	.songItem.table-row{
		height: auto;
	}
	
	.table-row.songItem{
		background-color: rgb(34,34,34);
	}
	
	.songItem:nth-of-type(2n){
		background-color: rgba(255,255,255,.02);
	}
	
	.songItem:hover{
		background-color: rgba(255,255,255,.07);
	}
	
	.songItem.activeItem{
		background-color: rgba(255,255,255,.15);
	}
	
	.column-item{
		float: left;
		height: 35px;
		line-height: 35px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.lyric-of-song{
		width: 100%;
		overflow: hidden;
		padding-bottom: 20px;
		box-sizing: border-box;
		position: relative;
	}
	
	.lyric-of-song>.lyric-option{
		position: absolute;
		left: 72%;
		top: 10px;
		width: 190px;
	}
	
	.lyric-of-song>.lyric-option2{
		display: none;
		top: auto;
		bottom: 20px;
	}
	
	.lyric-of-song.show>.lyric-option2{
		display: block;
		top: auto;
		bottom: 20px;
	}
	
	.lyric-of-song>.lyric-option>.btn-show,.lyric-of-song>.lyric-option>.btn-copy{
		text-align: center;
		width: 80px;
		height: 24px;
		line-height: 24px;
		border-radius: 12px;
		border: .5px solid #555;
		color: #d0d0d0;
		cursor: pointer;
		float: left;
		margin-left: 10px;
	}
	
	.lyric-of-song>.lyric-option>.btn-show:hover,.lyric-of-song>.lyric-option>.btn-copy:hover{
		background-color: rgba(255,255,255,.05);
	}

	
	.lyric-of-song>.songItem-lyric>b{
		line-height: 30px;
		font-weight: 400;
	}
	
	.lyric-of-song>.songItem-lyric{
		display: inline-block;
		white-space: pre-wrap;
		margin-left: 110px;
		height: 90px;
		line-height: 20px;
		overflow: hidden;
	}
	
	.lyric-of-song.show>.songItem-lyric{
		height: auto;
	}

	.operation-of-song{
		width: 100px;
		padding-left: 30px;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		margin-right: 10px;
		color: #666;
	}
	
	.name-of-song{
		width: calc(41% - 110px);
		margin-right: 2%;
	}
	
	.singer-of-song{
		float: right;
		width: 15%;
		margin-right: 2%;
	}
	
	.album-of-song{
		float: right;
		width: 18%;
		margin-right: 2%;
	}
	
	.duration-of-song{
		float: right;
		width: 6%;
		margin-right: 2%;
	}
	
	.songItem>.duration-of-song{
		color: #666;
	}
	
	.operation-of-song>.iconfont{
		cursor: pointer;
	}
	
	.operation-of-song>.iconfont:hover{
		color: #ccc;
	}
	
	.hot-of-song{
		float: right;
		width: 10%;
		margin-right: 2%;
		position: relative;
	}
	

	.songItem-name{
		color: #ccc;
	}
	
	.songItem-tag{
		display: inline-block;
		line-height: 15px;
		height: 15px;
		border: 1px solid red;
		color: red;
		font-size: 12px;
		border-radius: 3px;
		padding: 0 2px;
		-webkit-transform: scale(0.8);
	}
	
		
	span.songItem-tag:nth-child(2){
		margin-left: 5px;
	}
	
	.songItem-tag.mv{
		cursor: pointer;
	}
	.songItem-tag.vip{
		color: goldenrod;
		border: 1px solid goldenrod;
	}
	
	.songItem>.hot-of-song{
		position: relative;
	}
	
	.hot-range{
		width: 80px;
		height: 6px;
		border-radius: 3px;
		background-color: rgba(255,255,255,.03);
		position: absolute;
		top: 50%;
		margin-top: -3px;
	}
	
	.hot-range>.hot-content{
		
		height: 6px;
		border-radius: 3px;
		background-color: rgba(255,255,255,.05);
	}
	
	.album-of-song .songItem-album,.singer-of-song .singer-name{
		cursor: pointer;
		color: #888;
	}
	
	.singer-of-song .singer-name:hover,.album-of-song .songItem-album:hover{
		color: #aaa;
	}
</style>
