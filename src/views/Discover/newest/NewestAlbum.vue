<template>
	<div class="newest-album">
		<CategoryModule>
			<template slot="title">
				<!-- 新碟上架分类 地区 -->
				<div class="newest-music-area-type">
					<div class="newest-music-area-type-item" v-for="(value,key) in albumAreaList" @click="changeCategory({value,key})" :class="{'active':key == currentAlbumArea}">{{key}}</div>
				</div>
			</template>
			<template slot="shortcut">
				<!-- 新碟上架分类  全部/推荐-->
				<div class="newest-album-num">
					<span class="newest-album-type commend" :class="{'active': '推荐'== currentAlbumnumType}" @click="changNumType('推荐')">推荐</span>
					<span class="delimiter">|</span>
					<span class="newest-album-type all" :class="{'active': '全部'==currentAlbumnumType}" @click="changNumType('全部')">全部</span>
				</div>
			</template>
			<template slot="content"></template>
		</CategoryModule>
	</div>
</template>

<script>
	import CategoryModule from '@/components/common/CategoryModule';
	export default {
		name: 'NewestAlbum',
		data(){
			return{
				album: null,
				albumAreaList: {'全部':'ALL','华语': 'ZH','欧美': 'EA','韩国': 'KR','日本': 'JP'},
				currentAlbumArea: '全部',
				currentAlbumnumType: '推荐'
			}
		},
		components:{
			CategoryModule
		},
		methods:{
			changeCategory(category){
					this.currentAlbumArea = category.key;
			},
			changNumType(type){
				if(this.currentAlbumnumType != type){
					this.currentAlbumnumType = type;
				}
			}
			// 请求新碟上架数据
		},
		created(){
			
		}
	}
	
</script>

<style>
	
	.newest-music-area-type{
		display: flex;
	}
	
	.newest-music-area-type-item{
		margin-right: 20px;
		font-size: 14px;
		font-weight: normal;
		color: #878787;
		cursor: pointer;
	}
	
	.newest-music-area-type-item.active{
		font-weight: 600;
		color: #fff;
	}
	
	.newest-music-area-type-item:hover{
		color: #fff;
	}
	
	.newest-album-num{
		display: flex;
		font-size: 12px;
		height: 24px;
		line-height: 24px;
		color: #878787;
	}
	
	.newest-album-num>.delimiter{
		color: #333;
	}
	
	.newest-album-type{
		display: inline-block;
		width: 45px;
		height: 24x;
		line-height: 24px;
		margin: 0 10px;
		text-align: center;
		border-radius: 12px;
		cursor: pointer;
	}
	
	.newest-album-type.active{
		background-color: rgba(255,0,0,0.06);
		color: red;
	}
</style>
