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
				path: 'songlist',
				component: ()=>import('@/views/Discover/SongList')
			},
			{
				path: 'radio',
				component: ()=>import('@/views/Discover/Radio')
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
				component: ()=>import('@/views/Discover/Newest')
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
