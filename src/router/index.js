import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Discover from '@/views/Discover'

const routes = [
  {
		path: '',
		redirect: '/discover'
	},
	{
		path: '/discover',
		component: Discover,
		children: [
			{
				path: '',
				redirect: 'recommand'
			},
			{
				path: 'recommand',
				component: ()=>import('@/views/Discover/Recommend')
			},
			{
				path: 'playlist',
				component: ()=>import('@/views/Discover/Playlist')
			},
			{
				path: 'djprogram',
				component: ()=>import('@/views/Discover/DJProgram')
			},
			{
				path: 'toplist',
				component: ()=>import('@/views/Discover/TopList')
			},
			{
				path: 'singer',
				component: ()=>import('@/views/Discover/Singer')
			},
			{
				path: 'newest',
				component: ()=>import('@/views/Discover/Newest'),
				children:[
					{
						path: '',
						redirect: 'newestsong'
					},
					{
						path: 'newestsong',
						component: ()=>import('@/views/Discover/newest/NewestSong'),
					},
					{
						path: 'newestalbum',
						component: ()=>import('@/views/Discover/newest/NewestAlbum'),
					}
				]
			}
		]
	},
	{
		path: '/video',
		component: ()=>import('@/views/Video'),
		children: [
			{
				path: '',
				redirect: 'mv'
			},
			{
				path: 'video',
				component: ()=>import('@/views/Video/Video')
			},
			{
				path: 'mv',
				component: ()=>import('@/views/Video/MV')
			}
		]
	},
	{
		path: '/totalmv',
		component: ()=>import('@/views/Video/TotalMV')
	},
	{
		path: '/mvtoplist',
		component: ()=>import('@/views/Video/MVTopList')
	},
	{
		path: '/playlistdetail',
		component: ()=>import('@/views/PlaylistDetail/PlaylistDetail'),
		meta:{
			keepAlive: true
		},
		children: [
			{
				path: '',
				redirect: 'songlist'
			},
			{
				path: 'songlist',
				component: ()=>import('@/views/PlaylistDetail/SongList')
			},
			{
				path: 'comment',
				component: ()=>import('@/views/PlaylistDetail/Comment')
			},
			{
				path: 'subscriber',
				component: ()=>import('@/views/PlaylistDetail/Subscriber')
			}
		]
	},
	{
		path: '/videodetail',
		component: ()=>import('@/views/Video/VideoDetail')
	},
	{
		path: '/djdetail',
		component: ()=>import('@/views/DJDetail/DJDetail'),
		meta:{keepAlive: true},
		children:[
			{
				path: '',
				redirect: 'program'
			},
			{
				path: 'program',
				component: ()=>import('@/views/DJDetail/Program'),
			}
		]
	}
]

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
