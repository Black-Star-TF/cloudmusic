import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {getSongUrl} from '@/network/Discover/song';
import {getSongDetail} from '@/network/Discover/song';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		// 当前正在播放的音乐
		currentSong: null,
		// 当前播放列表
		currentPlaylist: []
  },
  mutations: {
		// 播放
		setCurrentSong(state,song){
			let lastSong = state.currentSong
			state.currentSong = song
			// 判断要播放的歌曲是否在当前播放列表中
			let index = state.currentPlaylist.findIndex( item => item.id == song.id)
			if(index<0){
				// 如果要播放的歌曲不在当前播放列表，则将其加入当前播放列表
				let lastIndex = state.currentPlaylist.findIndex( item => item.id == lastSong.id)
				state.currentPlaylist.splice(lastIndex+1,0,song)
			}
		},
		// 更新播放列表
		setCurrentPlaylist(state,playlist){
			state.currentPlaylist = playlist
		},
		// 播放下一首
		playNextSong(state){
			let index = state.currentPlaylist.findIndex( item => item.id == state.currentSong.id)
			if(index < state.currentPlaylist.length - 1){
				state.currentSong = state.currentPlaylist[index+1]
			}else{
				state.currentSong = state.currentPlaylist[0]
			}
		},
		// 播放上一首
		playLastSong(state){
			let index = state.currentPlaylist.findIndex( item => item.id == state.currentSong.id)
			if(index > 0){
				state.currentSong = state.currentPlaylist[index-1]
			}else{
				state.currentSong = state.currentPlaylist[state.currentPlaylist.length-1]
			}
		}
  },
  actions: {
		// 点击播放时，获取歌曲详情，包括url
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
