// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import home from './home'
import constVar from './api/constVar'
Vue.use(home)
Vue.use(constVar)
import axios from 'axios';

Vue.prototype.$http = axios

//请求前拦截
axios.interceptors.request.use((config) => {
    console.log("请求前拦截！");
    if (store.getters.getToken) {
        config.headers.Authorization = 'Token ${store.getters.getToken}';
    }
    return config;
}, (err) => {
    return Promise.reject(err);
});

Vue.config.productionTip = false; //生产环境提示，这里设置成了false

// 记住用之前要先注册
Vue.use(Vuex)

const SHOW_MUSIC_LIST = true;//底部提上来
const HIDE_MUSIC_LIST = false;//底部提上来

Vue.config.debug = true; 
//创建Store实例
const store = new Vuex.Store({
  // 存储状态值
  state: {
    audioEle: '',// audio元素
    audio: {// audio信息
      id: 0,
      name: '',
      singer: '',
      url: '',
      img_url: '',
      type: '',
      lyric: ''
    },
    musicList: [
    {
      name:'Tim222',
      singer:'著名歌手--Tim'

    }
    ],// 音乐播放信息
    currentIndex: 0,// 当前音乐的index索引
    status:'false',//侧边栏
    isShowMusicDetail:false,//打开底部列表
    isShow:false,//暂时没用到
    playing:false,//是否正在播放
    isUp:false,//是否更新歌曲
    sendState:false//改变状态来显示 底部音乐列表数据
  },
  // 状态值的改变方法,操作状态值
  // 提交mutations是更改Vuex状态的唯一方法
  mutations: {
    //同步 修改state
    showMessage (state,value) {//侧边栏
      // 变更状态
      // state.status='Store mutations changed this words。'+value;
      //这里处理 点击header左侧图标展开侧边栏的 函数
      state.status= !state.status
    },
    addBook(state,value){
      state.status = true
    },
    showMusicDetails(state){//打开底部列表 同步，暂时没用它
      state.isShow=!SHOW_MUSIC_LIST;
    },
    //打开底部列表
    setMusicDetail(state , value){
      state.isShowMusicDetail=!state.isShowMusicDetail//获取bottomBar.vue那边的isShow状态
    },
    // play设置
    play (state) {
      state.playing = true
      state.audioEle.play()
    },
    //点击播放歌曲
    togglePlay(state){
      if(state.playing){
        console.log('暂停')
        state.playing = false;
        state.audioEle.pause()
      }else{
        console.log('开始')
        state.playing = true;
        state.audioEle.play()
      }
    },
    // 获取音乐元素 Dom
    get_AudioEle (state, valueEle) {
      state.audioEle = valueEle
    },
    initAudio (state) {// 初始化音乐
      if (state.musicList) {
        alert(1)
      } else {
        alert(2)
      }
    },
    //提交负荷 Payload
    // add(state, n) {
    //   return state.count += n
    // }
    updateData(state,value){
      state.musicList=value.musicName1
      console.log(state.musicList)
    },
    takeBotMuListData(state,value){
        state.sendState = !state.sendState
        return state.sendState
    }
  },
  // 在store中定义getters（可以认为是store的计算属性）。Getters接收state作为其第一个函数
  getters: {
     changeState(state) {//侧边栏
      return state.status
    },
    // 获取音乐是否播放
    getIsPlaying: state => state.playing,
    // 获取audio信息
    getAudioInfo(state,value){
      console.log(value)
    },
    // 当前音乐详细信息
    getCurrentMusic: state => state.musicList[state.currentIndex],
    // 获取音乐播放列表信息
    getMusicList: state => state.musicList
  },
  actions: { 
    //异步 修改state
    addBook ({commit},value) {
      setTimeout(function(){
        commit('addBook' , value)
      },2000) 
    },
    set_MusicDetail({commit},value){ //打开底部歌曲播放 异步，暂时用的是它
      commit('setMusicDetail' , value)
    },
    updata_data({commit} , value){
      commit('updateData',value)
    },
    push_AudioEle({commit},valueEle){
      commit('get_AudioEle',valueEle)
    },
    takeBotMuList({commit} , value){
       commit('takeBotMuListData',value)        
    }
  }
})
// 要改变状态值只能通过提交mutations来完成

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store,
  home
})


