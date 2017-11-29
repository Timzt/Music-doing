<template>
  <div id="app">
    <br/><br/><br/><br/><br/><br/>
    <audio id="myaudio" ref="audio" ></audio><br/><br/><br/><br/><br/><br/><br/>
    <HeaderNnew></HeaderNnew>
    <bottomBar :infos='infoSibling'></bottomBar>
    <musicDetail></musicDetail>
  </div>
</template>

<script>
import HeaderNnew from './components/header/header_new'
import bottomBar from './components/bottomBar/bottomBar'
import musicDetail from './components/musicDetail/musicDetail'
import { mapState } from 'vuex'
export default {
  name: 'app',

  data () {
    return{
      infoSibling:{type:Array}
    }
  },
  components:{
    HeaderNnew,bottomBar,musicDetail
  },
  computed:{
    ...mapState([
        'isShowMusicDetail',
        'playing'
    ])
    
  },
  mounted(){
    //所有的audio的 vuex的状态信息
    this.state = this.$store.state;
    //音乐是否play
    this.state.isplaying = this.playing
    // this.musicName()
  },
  methods:{
    updateData(){
      this.$store.dispatch({
          type:'updata_data',
          isUp:true,
          musicName1:this.infoSibling//通过get获取数据，赋值给musicName1,传送到main.js里面进行state.musicList更新数据。然后其他组件通过 状态来获取state.musicList下面填充过的新数据
      })
    },
    // 页面初始化就获取音乐名称
    // musicName () {
    //   this.musicName2= this.$store.getters.getMusicList ? this.$store.getters.getMusicList[0].name : ''
    // }
  },
  created () {
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
          _that.infoSibling=res.data.music.all[0]
          _that.$refs.audio.setAttribute('src', _that.infoSibling.url)
          _that.$store.dispatch('push_AudioEle', _that.$refs.audio)
          return res
        })
        .catch( (err) => {
            console.log(err);
        });
        this.updateData()
  },
}
</script>
<style lang='scss' scoped=""  type="text/css">
</style>


