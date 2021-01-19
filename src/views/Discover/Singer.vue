<template>
	<div class="singer">
		<!-- 歌手分类导航 -->
		<SingerTypeNav :category="category" :currentCategory="currentCategory" @typechange="change"></SingerTypeNav>
		<!-- 歌手列表 -->
		<CategoryModule>
			<template slot="content">
				<SingerListItem v-for="singer in singerList" :singer="singer" v-if="singerList"></SingerListItem>
			</template>
		</CategoryModule>
		<Loading v-if="!singerList"></Loading>
	</div>
</template>

<script>
	import {getSingerList} from '@/network/Discover/singer.js';
	import CategoryModule from '@/components/common/CategoryModule';
	import SingerTypeNav from '@/components/singer/SingerTypeNav';
	import SingerListItem from '@/components/singer/SingerListItem';
	import Loading from '@/components/common/Loading';
	export default {
		name: 'Singer',
		components:{
			SingerTypeNav,
			SingerListItem,
			Loading,
			CategoryModule
		},
		data(){
			return {
				category:[
					{name: '语种', alias:'area', categoryList: {'全部':'-1','华语':'7','欧美':'96','日本':'8','韩国':'16','其他':'0'}},
					{name: '分类', alias:'type', categoryList: {'全部': '-1','男歌手': '1','女歌手': '2','乐队组合': '3'}},
					{name: '筛选', alias:'initial', categoryList: {'热门':'-1',A : 'a', B : 'b',C : 'c',D : 'd',E : 'e',F : 'f',G : 'g',H : 'h',I : 'i',J : 'j',K : 'k',L : 'l',M : 'm',N : 'n',O : 'o',P : 'p',Q : 'q',R : 'r',S : 's',T : 't',U : 'u',V : 'v',W : 'w',X : 'x',Y : 'y',Z : 'z','#': 0 }}
				],
				currentCategory:{
					'type': '-1',
					'area': '-1',
					'initial': '-1'
				},
				limit: 30,
				pageNum: 1,
				singerList: null
			}
		},
		methods:{
			change(data){
				this.currentCategory[data.type.alias] = data.value;
				// 请求数据
				this.singerList = null;
				this.getSingerListData();
			},
			getSingerListData(){
				getSingerList(this.currentCategory.type,this.currentCategory.area,this.currentCategory.initial,this.limit,this.offset).then(res=>{
					// 判断获取数据后是追加或是重新渲染
					if(this.singerList){
						this.singerList = this.singerList.concat(res.artists);
					}else{
						this.singerList = res.artists;
					}
				})
			},
			getMoreData(){
				// 鼠标滚动到底部，获取更多数据
				// 获取滚动元素
				let mainEle = this.$root.$children[0].$refs.content.$refs.main;
				// 获取滚动条属性
				let scrollTop = mainEle.scrollTop;
				let offsetHeight = mainEle.offsetHeight;
				let scrollHeight = mainEle.scrollHeight;
				// 判断是否滚动到底部
				if (scrollHeight - offsetHeight - scrollTop <= 5) {
					this.pageNum ++;
					this.getSingerListData();
				}
			}
		},
		computed:{
			offset(){
				return (this.pageNum - 1) * this.limit;
			}
		},
		created(){
			// 请求数据
			this.getSingerListData();
		},
		mounted(){
			// 为滚动元素添加鼠标滚轮事件
			this.$root.$children[0].$refs.content.$refs.main.addEventListener('scroll',this.getMoreData);
		}
	}
	
</script>

<style>
</style>
