<template>
	<div class="artist-info" v-if="info">
		<div class="artist-info-type-item" v-for="item in info">
			<div class="artist-info-type-title">{{item.ti}}</div>
			<div class="artist-info-type-content">
				<p v-for="para in text(item.txt)" v-if="para.length > 0">{{para}}</p>
			</div>
		</div>
	</div>
</template>

<script>
	import {getSingerDesc} from '@/network/Discover/singer';
	export default {
		name: 'Detail',
		data(){
			return {
				id: null,
				info: null
			}
		},
		methods: {
			text(txt) {
				return txt.split('\n')
			}
		},
		created(){
			this.id = this.$route.query.id
			getSingerDesc(this.id).then(res=>{
				this.info = res.introduction
			})
		}
	}
	
</script>

<style>
	.artist-info{
		padding: 10px 30px 20px;
		font-size: 14px;
	}
	
	.artist-info-type-item{
		margin-bottom: 20px;
	}
	
	.artist-info-type-title{
		height: 35px;
		line-height: 35px;
		color: #D0D0D0;
		font-weight: 600;
	}
	
	.artist-info-type-content{
		line-height: 30px;
		color: #878787;
		text-indent: 2em;
	}
</style>
