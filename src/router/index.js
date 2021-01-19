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
		component: ()=>import('@/views/Video')
	}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
