import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {getSongDetail,getSongUrl,getSongLyric} from '@/network/Discover/song';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		// 用户id
		uid: null,
		// 登录状态
		logined: false,
		// 歌词
		lyric: '',
		paused: false,
		// 当前正在播放的音乐
		currentSong: null,
		// 当前播放列表
		currentPlaylist: [],
		// 历史记录
		history: [],
		historyLength: 50
  },
  mutations: {
		// 登录 改变状态
		login(state,uid){
			this.state.logined = true
			this.state.uid = uid
		},
		// 退出登录
		logout(state){
			this.state.logined = false
			this.state.uid = null
		},
		
		// 设置歌词
		setLyric(state,lyric){
			state.lyric = lyric;
		},
		// 清空当前播放列表
		clearPlaylist(state){
			state.currentPlaylist = [];
		},
		// 清空历史记录
		clearHistory(state){
			state.history = [];
		},
		// 改变音频播放状态
		changePaused(state,value){
			state.paused = value;
		},
		// 从本地存储获取数据
		getLocalData(state,data){
			if(data.currentSong!=null){
				this.commit('setCurrentSong',data.currentSong)
			}
			state.currentPlaylist = data.playlist;
			state.history = data.history;
		},
		// 播放
		setCurrentSong(state,song){
			// 判断要播放的歌曲是否正在播放
			if(state.currentSong == null || (song.id!=state.currentSong.id)){
				let lastSong = state.currentSong
				state.currentSong = song
				
				// 获取当前播放歌曲的歌词
				this.dispatch('getLyric',song)
				
				
				// 判断要播放的歌曲是否在当前播放列表中
				let index = state.currentPlaylist.findIndex( item => item.id == song.id)
				if(index<0){
					// 如果要播放的歌曲不在当前播放列表，则将其加入当前播放列表
					let lastIndex = state.currentPlaylist.findIndex(item => item.id == lastSong.id)
					state.currentPlaylist.splice(lastIndex+1,0,song);
				}
				
				// 获取时间戳记录播放时间
				let playTime = Date.parse(new Date());
				song.playTime = playTime;
				this.commit('addHistory',song)
			}
		},
		// 添加历史记录
		addHistory(state,song){
			// 将歌曲加入历史记录
			
			// 判断历史记录中有没有当前歌曲
			let index = state.history.findIndex( item => item.id == song.id);
			if(index >= 0){
				// 如果有，则将对应记录删除，重新添加
				state.history.splice(index,1)
			}
			state.history.unshift(song)
			
			// 判断历史记录是否超出上限，如果超出，则删除最早的记录
			if(state.history.length>state.historyLength){
				state.history.pop()
			}
			
		},
		// 更新播放列表
		setCurrentPlaylist(state,playlist){
			state.currentPlaylist = playlist
		},
		// 播放下一首
		playNextSong(state){
			let index = state.currentPlaylist.findIndex( item => item.id == state.currentSong.id)
			// 更新正在播放的歌曲
			if(index < state.currentPlaylist.length - 1){
				let song = state.currentPlaylist[index+1]
				this.commit('setCurrentSong',song);
			}else{
				let song = state.currentPlaylist[0]
				this.commit('setCurrentSong',song);
			}
		},
		// 播放上一首
		playLastSong(state){
			let index = state.currentPlaylist.findIndex( item => item.id == state.currentSong.id)
			if(index > 0){
				let song = state.currentPlaylist[index-1]
				this.commit('setCurrentSong',song);
			}else{
				let song = state.currentPlaylist[state.currentPlaylist.length-1]
				this.commit('setCurrentSong',song);
			}
		}
  },
  actions: {
		// 获取歌词
		getLyric({commit,state},song){
			getSongLyric(song.id).then(res=>{
				commit('setLyric',res.lrc.lyric)
			})
		},
		// 点击播放时，获取歌曲详情，包括url、歌词
		play({commit,state},song){
			
			getSongUrl(song.id).then(res=>{
				song.url = res.data[0].url
				
				// 更新正在播放的歌曲
				commit('setCurrentSong',song)
			})
		},
		// 点击播放全部，获取播放列表或专辑中的所有歌曲信息
		playAll({commit,state},playlist){
			// 处理id参数
			let arr = []
			for(let song of playlist){
				arr.push(song.id)
			}
			// 获取音乐url
			getSongUrl(arr.join(',')).then(res=>{
				for(let song1 of res.data){
					for(let song2 of playlist){
						if(song1.id == song2.id){
							song2.url = song1.url
							break;
						}
					}
				}
				// 更新播放列表
				commit('setCurrentPlaylist',playlist);
				// 更新正在播放的歌曲
				commit('setCurrentSong',playlist[0]);
			})
		}
  },
  modules: {}
})
