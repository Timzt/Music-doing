<template>
	<transition name="sliderUpHideRight">
		<div id="musicDetail" class="musicDetail"  v-show='this.isShowMusicDetail'>
			<div class="filterbg" style="background: url(&quot;http://oiq8j9er1.bkt.clouddn.com/music_%E6%88%91%E8%BF%98%E6%83%B3%E5%A5%B9.jpg&quot;);"></div>
				<div class="detailcontent">
					<div class="content-header">
						<i class="back icon-back" @click="hideMusicDetail"></i>
					</div>
					
					
				</div>
			
		</div>
	</transition>		
</template>
<script>
	import { mapState } from 'vuex'
	const API_PROXY = 'https://bird.ioliu.cn/v1/?url='
	export default{
		name:'musicDetail',
		data(){
			return {
				
			}
		},
		computed:{
            ...mapState([
                'isShowMusicDetail'
            ])
        },
        methods:{
        	hideMusicDetail(){
        		this.$store.dispatch({
					type:'set_MusicDetail'
				})
        	}
        },
        created(){
        	var _that=this;//因为这里，this的指向不是当前的vue实例，那我们在使用axios之前重新，定义一下this
		    this.$http.get(this.LOCALAPI)
		      .then( (res) => {       
		        // _that.infoSibling=res.data.result.namehttp://music.163.com/api/playlist/detail?id=19723756
		        
			    // 把所有的音乐数据给vuex的musicAllList
			    //store.dispatch('set_MusicAllList', res.data.music)
			    // 所有的数据存起来  包括音乐个人信息 等等
			    //store.dispatch('set_AllInfo', res.data)
			    // 设置音乐的地址  初始化 根据vuex的currentIndex来决定
			    //this.$refs.audio.setAttribute('src', store.getters.getCurrentMusic.url)
			    // 给audio元素存在vuex 的state里面  方便日后调用
			    //store.dispatch('set_AudioElement', this.$refs.audio)
		        // data.user的信息赋值给info  再通过组件的数据传递传给sideBar
		       	console.log(res.data.user.name)
		        return res
		      })
		      .catch( (err) => {
		          console.log(err);
		      });
		      
		  }
	}
</script>
<style lang='scss' scoped=""  type="text/css">
@import "../style_css/global.scss";
</style>