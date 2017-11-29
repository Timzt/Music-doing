import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios';

Vue.prototype.$http = axios

//请求前拦截
axios.interceptors.request.use((config) => {
    console.log("请求前拦截！");
    return config;
}, (err) => {
    return Promise.reject(err);
});


export default{
  install(Vue , options){
    Vue.prototype.Cowrite=function(key , value , duration){
      console.log('我是插件中的方法---开始存储')
      var Cookie = {};
      var d=new Date();
      d.setTime(d.getTime() + 1000*60*60*24*30);
      document.cookie = key + '=' + encodeURI(value) + ";expires=" + d.toGMTString();

    }
    Vue.prototype.Coread=function(key){
      var arr = document.cookie.match(new RegExp('(^| )' + key + "=([^;]*)(;|$)"));
      if(arr != null){
        return '';
      }
    }
    Vue.prototype.setItem=function(key , val){
      if (window.localStorage) {
        localStorage.setItem(key , val);
      }else{
        Cookie.write(key , val)
      }
    }    
    Vue.prototype.getItem=function(key){
      return window.localStorage ? localStorage.getItem(key) : Cookie.read(key);
    }  
    Vue.prototype.getName=function(){
      const uerId = this.getItem('Tim');

      let json =JSON.parse(this.getItem(uerId));
      console.log(json)
    }  
  }
}