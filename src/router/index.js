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
			},
			{
				path: 'subscriber',
				component: ()=>import('@/views/DJDetail/Subscriber'),
			}
		]
	},
	{
		path: '/albumdetail',
		component: ()=>import('@/views/AlbumDetail/AlbumDetail'),
		children:[
			{
				path: '',
				redirect: 'songlist'
			},
			{
				path: 'songlist',
				component: ()=>import('@/views/AlbumDetail/SongList')
			},
			{
				path: 'comment',
				component: ()=>import('@/views/AlbumDetail/Comment')
			},
			{
				path: 'detail',
				component: ()=>import('@/views/AlbumDetail/Detail')
			}
		]
	},
	{
		path: '/search',
		component: ()=>import('@/views/Search'),
		children:[
			{
				path: '',
				redirect: 'single'
			},
			{
				path: 'single',
				component: ()=>import('@/views/Search/Single')
			},
			{
				path: 'singer',
				component: ()=>import('@/views/Search/Singer')
			},
			{
				path: 'album',
				component: ()=>import('@/views/Search/Album')
			},
			{
				path: 'video',
				component: ()=>import('@/views/Search/Video')
			},
			{
				path: 'playlist',
				component: ()=>import('@/views/Search/Playlist')
			},
			{
				path: 'radio',
				component: ()=>import('@/views/Search/Radio')
			},
			{
				path: 'user',
				component: ()=>import('@/views/Search/User')
			},
			{
				path: 'lyric',
				component: ()=>import('@/views/Search/Lyric')
			}
		]
	},
	{
		path: '/artistdetail',
		component: ()=>import('@/views/ArtistDetail/ArtistDetail'),
		children:[
			{
				path: '',
				redirect: 'album'
			},
			{
				path: 'album',
				component: ()=>import('@/views/ArtistDetail/Album'),
			},
			{
				path: 'mv',
				component: ()=>import('@/views/ArtistDetail/MV'),
			},
			{
				path: 'desc',
				component: ()=>import('@/views/ArtistDetail/Description'),
			},
			{
				path: 'similar',
				component: ()=>import('@/views/ArtistDetail/SimilarArtist'),
			}
		]
	},
	{
		path: '/userdetail',
		component: ()=>import('@/views/UserDetail/UserDetail')
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
