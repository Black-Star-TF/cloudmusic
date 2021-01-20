<template>
	<table class="song-list-table"  cellspacing="0" cellpadding="5">
		<thead v-if="head">
			<tr>
				<td class="operation-of-song"></td>
				<td class="songname-of-song">音乐标题</td>
				<td class="artists-of-song" v-if="singer">歌手</td>
				<td class="album-of-song" v-if="album">专辑</td>
				<td class="duration-of-song">时长</td>
				<td class="hot-of-song" v-if="hot">热度</td>
			</tr>
		</thead>
		<tbody v-if="songs">
			<tr class="songItem" 
					:class="{'activeItem': index==currentIndex}" 
					v-for="(song,index) in songs"
					@click="itemClick(index)"
					@dblclick="play(song)">
					
				<td class="operation-of-song">
					{{index+1 >= 10 ? index+1: "0"+(index+1)}}
				</td>
				
				<td class="songname-of-song">
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
				</td>
				
				<td class="artists-of-song" v-if="singer">
					<!-- 歌手 -->
						<span class="songItem-artists">{{ song.ar | artists}} </span>
				</td>
				
				<!-- 专辑 -->
				<td class="album-of-song" v-if="album">
				 <span class="songItem-album" @click="toAlbumDetail(song.al)">{{song.al.name}}</span>
				</td>
				
				<td class="duration-of-song">{{song.dt | duration}}</td>
				
				<td class="hot-of-song" v-if="hot">
					<div class="hot-range">
						<div class="hot-content" :style="hotStyle(song)"></div>
					</div>
				</td>
			</tr>
		</tbody>
	</table>
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
			},
			artists(ar){
				let arList = []
				for(let item of ar){
					arList.push(item.name)
				}
				return arList.join('/')
			}
		}
	}
	
</script>

<style>
	.song-list-table{
		cursor: default;
		width: 100%;
		font-size: 12.5px;
		color: #777;
		overflow: hidden;
		table-layout: fixed;
	}
	
	.song-list-table tr{
		height: 35px;
		line-height: 35px;
	}
	
	.song-list-table tr td {
		padding-left: 2em;
		padding-right: 100px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.song-list-table .operation-of-song{
		width: 7%;
	}
	.song-list-table .name-of-song{
		width: 40%;
	}
	.song-list-table .artists-of-song{
		width: 20%;
	}
	
	.song-list-table .album-of-song{
		width: 25%;
	}
	.song-list-table .duration-of-song{
		width: 9%;
	}
	
	.song-list-table .hot-of-song{
		width: 14%;
	}
	
	.song-list-table tr td {
		padding-left: 2em;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
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
	
	.songItem:nth-of-type(2n-1){
		background-color: rgba(255,255,255,.02);
	}
	
	.songItem:hover{
		background-color: rgba(255,255,255,.07);
	}
	
	.songItem.activeItem{
		background-color: rgba(255,255,255,.15);
	}
	
	.hot-range{
		width: 80px;
		height: 6px;
		border-radius: 3px;
		background-color: rgba(255,255,255,.03);
	}
	
	.hot-range .hot-content{
		height: 6px;
		border-radius: 3px;
		background-color: rgba(255,255,255,.05);
	}
	
	.songItem-album{
		cursor: pointer;
	}
	.songItem-album:hover{
		color: #aaa;
	}
</style>
