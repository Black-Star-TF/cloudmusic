### 使用vue仿写的pc版网易云音乐客户端

后端接口： [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)

#### 安装运行

安装运行前请确定已安装node环境，安装并启动后端接口程序 [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)

```
1. 安装依赖
npm install

2. 项目启动
npm run serve
```

#### 技术栈
- vue
- vue-router
- vuex
- axios
- vue-lazyload

#### 目前已实现的功能
- 个性推荐、歌单、主播电台、排行榜、歌手、最新音乐、MV列表等页面
- 歌手、专辑、电台、歌单、用户等详情页面
- 音乐播放（自己实现了一个音乐播放组件，可以实现切歌、通过拖拽进度条改变歌曲播放进度、展示歌词等）
- mv播放详情页，包括mv播放，mv介绍，相似mv，mv评论，相似mv播放切换
- 搜索功能，可以展示单曲、歌手、视频、专辑、歌单、用户、电台等搜索结果
- 展示当前播放列表和历史播放记录，使用localStorage存储历史播放记录
- 使用vuex管理当前播放歌曲、播放列表和历史记录，

#### 效果展示
![image](http://42.193.187.197:8888/down/HAp6ibrwlUlZ)
![image](http://42.193.187.197:8888/down/CTAWNADQTIHD)
![image](http://42.193.187.197:8888/down/XW4wqoDnH6IF)
![image](http://42.193.187.197:8888/down/6U5SWAeYYINM)
![image](http://42.193.187.197:8888/down/C94zrTHjOLQE)
![image](http://42.193.187.197:8888/down/tx5brQdtChYX)
![image](http://42.193.187.197:8888/down/X1kVmY9Mg02B)