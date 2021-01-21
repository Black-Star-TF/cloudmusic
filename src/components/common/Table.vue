<template>
	<div class="container">
		<!-- 标题行 -->
		<div class="column title-container">
			<div class="song-operation item"></div>
			<div class="song-name-container item">音乐标题</div>
			<div class="song-hot item">热度</div>
			<div class="song-duration item">时长</div>
			<div class="song-album item">专辑</div>
			<div class="song-singer item">歌手</div>
		</div>
		<!-- 个体 -->
		<div class="column songItem" v-for="(song,index) in songs">
			<div class="song-operation item">{{index+1}}</div>
			<div class="song-name-container item">{{song.name}}</div>
			<div class="song-hot item">{{song.pop}}</div>
			<div class="song-duration item">{{song.dt}}</div>
			<div class="song-album item">{{song.al.name}}</div>
			<div class="song-singer item">{{song.ar[0].name}}</div>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'Table',
		props:{
			songs:{
				type: Array,
				require: true
			}
		}
	}
</script>

<style>
	
	.column{
		height: 35px;
		background-color: #555;
		color: #fff;
		padding-left: 2.5%;
	}
	
	.songItem{
		background-color: #777;
	}
	
	.item{
		float: left;
		height: 35px;
		line-height: 35px;
		font-size: 14px;
	}
	
	.song-operation{
		width: 6%;
	}
	
	.song-name-container{
		width: 28%;
		margin-right: 2%;
	}
	
	.song-singer{
		float: right;
		width: 15%;
		/* display: none; */
		margin-right: 2%;
	}
	
	.song-album{
		float: right;
		width: 23%;
		/* display: none; */
		margin-right: 2%;
	}
	
	.song-duration{
		float: right;
		width: 5%;
		margin-right: 2%;
		/* display: none; */
	}
	
	.song-hot{
		float: right;
		width: 10%;
		display: none;
		margin-right: 3%;
		position: relative;
	}
	
	.song-hot::after{
		content: "";
		display: block;
		width: 80px;
		height: 5px;
		background-color: #fff;
		position: absolute;
		top: 50%;
		margin-top: -2px;
	}
</style>
