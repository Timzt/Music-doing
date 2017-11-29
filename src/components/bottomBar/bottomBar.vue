<template>
	<div id="bottomBar" class="bottomBar" @click='showMusicDetails'>
		<div class="barName">
			<img src="http://oiq8j9er1.bkt.clouddn.com/music_%E6%88%91%E8%BF%98%E6%83%B3%E5%A5%B9.jpg" />
			<div class="barNameTit">
				<h1 class="musicNa" >{{infos.name}}</h1>
				<p class="singerNa" >{{infos.singer}}</p><!-- v-if="!musicSinger" -->
			</div>
		</div>
		<div class="barIcon" @click.stop='playPause'><i :class="this.playing ? 'icon-pause' : 'icon-play'"></i></div>
		<div class="barListBtn"><i class="icon-list-music"></i></div>
		
	</div>
</template>
<script>
	import { mapState } from 'vuex'
	export default{
		name:'bottomBar',
		props:['infos'],
		data(){
			return {
				audioInfo: {
				},
				myaudio: {},
				state: {
					isplaying: false,
					loading: false,
					currentIndex: 0
				}
			}
		},
		computed:{
            ...mapState([
                'isShowMusicDetail',
                'isShow',
                'playing'
            ]),
            // 获取音乐名称
			// musicName () {
			// 	return this.$store.getters.getCurrentMusic ? this.$store.getters.getCurrentMusic.name : ''
			// },
			// 获取歌手名称
			// musicSinger () {
			// 	return this.$store.getters.getCurrentMusic ? this.$store.getters.getCurrentMusic.singer : ''
			// }
        },
		methods:{
			showMusicDetails(){
				this.$store.dispatch({
					type:'set_MusicDetail',
					isShow:true
				})
			},
			playPause(){
				this.$store.commit('togglePlay')
			}
		},
		mounted(){
			//所有的audio的 vuex的状态信息
			this.state = this.$store.state;
			//音乐是否play
			this.state.isplaying = this.playing
		}
	}
</script>
<style lang="scss" scoped="" type="text/css">
@import "../style_css/global.scss";
@import "../../common/font_icon/font.css";
/*SCSS语法*/
$primary-color: #aaa;
.singerNa {
 color: $primary-color;  
}

</style>