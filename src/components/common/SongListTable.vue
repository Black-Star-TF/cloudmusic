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
		<div class="table-row songItem" v-for="(song,index) in songs" :class="{'activeItem': index==currentIndex}" @click="itemClick(index)" @dblclick="play(song)">
			
			<!-- 对歌曲的操作 -->
			<div class="operation-of-song column-item">
				<span>{{index+1 >= 10 ? index+1: "0"+(index+1)}}</span>
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
				<!-- <span class="songItem-tag sq" v-if="song.privilege.subp=='1'&&song.originCoverType=='0'">SQ</span> -->
				<!-- 是否有mv -->
				<span class="songItem-tag mv" v-if="song.mv" @click="toDetail(song.mv)">MV</span>
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
			
			<!-- 歌手  ---需重做---   -->
			<div class="singer-of-song column-item" v-if="singer">
				<span v-for="(singer,index) in song.ar">
					<span class="singer-name">{{singer.name}}</span>
					<span class="dilimiter" v-if="index < song.ar.length -1"> / </span>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'SongListTab',
		data(){
			return{
				currentIndex: -1
			}
		},
		props:{
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
		methods:{
			// hasAudition(song,index){
			// 	if(song.privilege){
			// 		return 
			// 	}else{
					
			// 	}
			// }
			toAlbumDetail(){
				
			},
			hotStyle(song){
				return{
					width: `${song.pop}%`
				}
			},
			toDetail(id){
				this.$router.push({
					path: '/videodetail',
					query:{
						id: id
					}
				})
			},
			itemClick(index){
				this.currentIndex = index
			},
			play(song){
				// 修改当前播放歌曲id
				// this.$store.commit('setCurrentSongId',{songId: song.id})
				// 播放歌曲
				// this.$store.dispatch('play')
			}
		},
		filters:{
			duration(dt){
				let sec = Math.floor(dt/1000)
				let minutes = Math.floor(sec/60)
				let seconds = sec%60
				return `${ minutes > 10 ? minutes : "0"+minutes}:${seconds>=10 ? seconds : "0"+seconds}`
			}
		}
	}
</script>

<style>
	
	.table-row{
		font-size: 13px;
		height: 35px;
		color: #888;
		padding-left: 2.5%;
		cursor: default;
	}
	
	.table-row.songItem{
		background-color: rgb(34,34,34);
	}
	
	.songItem:nth-of-type(2n-1){
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
	
	.operation-of-song{
		width: 6%;
		display: flex;
		justify-content: space-between;
		margin-right: 1%;
		color: #666;
	}
	
	.name-of-song{
		width: 27%;
		margin-right: 2%;
	}
	
	.singer-of-song{
		float: right;
		width: 15%;
		margin-right: 2%;
	}
	
	.album-of-song{
		float: right;
		width: 23%;
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
	
	.hot-range{
		width: 80px;
		height: 6px;
		border-radius: 3px;
		background-color: rgba(255,255,255,.03);
	}
	
	.hot-range>.hot-content{
		height: 6px;
		border-radius: 3px;
		background-color: rgba(255,255,255,.05);
	}
	
	.songItem-album,.singer-name{
		cursor: pointer;
	}
	
	.singer-name:hover,.songItem-album:hover{
		color: #aaa;
	}
</style>
