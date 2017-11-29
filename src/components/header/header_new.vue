<template>
	<div id="Header_new" class="Header_new">
		<div class="header_wap">
			<i class="menu icon-menu" @click="showMessage" ></i>
			<div class="centermenu">
				<!-- <router-link tag="i" :to="{ path:'../Index' , query:{dataUrl:111}}"> -->
				<!-- <router-link tag="i" to="../Index">	 -->
				<router-link  tag="i" :to="{ name:'Index' , params:{dataUrl:infoSibling}}">	
					<i class="menu Index icon-Index" ></i>
				</router-link>
				<router-link tag="i" to="../Music">
					<i class="menu Music icon-Music"></i>
				</router-link>
				<router-link tag="i" to="../Person" >
					<i class="menu Person icon-Person"></i>
				</router-link>
				
			</div>
			<router-link tag="i" to="../search" class="icon-search">
				<i class="menu"></i>
			</router-link>
		</div>
		<p>在mainJs里面获取state的状态来改变侧边栏的展开和伸缩，现在的状态为：{{this.count}}</p>
		<router-view></router-view>
		<SliderBar :infoSibling='infoSibling'></SliderBar>
		 <!-- v-show='!this.count' -->
		<!-- <SliderBar v-if='this.count'></SliderBar> -->
	</div> 
</template>
<script>
	
	import BScroll from 'better-scroll';
	import { mapState } from 'vuex'
	// import SliderBar from '../sliderSide/sliderSide'
	const  SliderBar = r => require.ensure( [], () => r (require('../sliderSide/sliderSide.vue')))//按需加载组件
	
	// const SliderBar = r => require.ensure([], () => r(require('@/components/SliderBar.vue')), 'chunkname1')
	export default {
		name: 'Header_new',
	    data () {
	    	return{  
	    		infoSibling:{
	    			type:Array
	    		}
	    	}    
	    },
	    computed:mapState({ 
	    	count:state=>state.status//只读
		}),
	    mounted(){
	    	//console.log(this.count)
	    	// console.log(this.$store.getters.changeState)
	    },
	    methods:{
	    	//this.$store.commit 是提交同步操作。第一参数是函数（在mutations里面定义）第二个参数是payLoad（荷载数据，就是可以自定义的数据）。这个showMessage要和mutations里面showMessage同名才行。。用了和mutations一起使用的 通过$store.commit触发mutation
	    	//filterList 是用getters来获取main.js里面的getters里面定义的函数，的结果
	    	//addBooks 中的 this.$store.dispatch是异步操作。用来和actions一起使用的
	    	//mutations和actions的关系是 一个是同步一个是异步。可以变更state里面定义的参数。一般来说是 mutations里面定义一个showMessage(函数名均与组件页面的需要用的函数名称同步) 和addBook 两个函数，其中一个可以用来处理同步，另外一个用来和actions来一起处理异步
	    	//mapState、mapGetters写在computed里面的。通过上面的方法count是相当于给state.status重新定义一个变量（重命名了）。通过this.count可以获取 传过来的值
	    	//mapAction mapMutation 写在methods里面
	    	// 带用map前缀的参数的用法意思是 可以在里面处理多个同步或者异步方法
	    	showMessage(){
	    		//同步
	    		this.$store.commit('showMessage','荷载数据')
	    	},
	    	getBotMuList:function(){
	    		this.$store.dispatch('takeBotMuList')
	        }
	 //        ,
	 //        addBooks:function(){
	 //        	//异步
	 //        	this.$store.dispatch('addBook')
	 // 　　　 }
	 		,
	 		// ...mapActions({//触发异步操作
            //getData1:'addBook1',
            //getData2:'addBook2
            //}),
	    	getStatus (urlStr) {
			    var urlStrArr = urlStr.split('/')
			    return urlStrArr[urlStrArr.length - 1]
			}
	    },
		created () {
		  	console.log('您当前刷新了页面，所在页面是:'+this.getStatus(this.$route.path))
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
		        _that.infoSibling=res.data
		        return res
		      })
		      .then(()=>{
		      	this.getBotMuList()
		      })
		      .catch( (err) => {
		          console.log(err);
		      });
		      
		},
	    watch: {
		  '$route' (to, from) {
		  //刷新参数放到这里里面去触发就可以刷新相同界面了
		    this.getStatus(this.$route.path)
		   
		    console.log('您当前所在页面是:'+this.getStatus(this.$route.path))
		  }
		},
	    components:{
	      SliderBar
	    }
	}

</script>
<style lang="scss" scoped="" type="text/css">
@import "../style_css/global.scss";
@import "../../common/font_icon/font.css";

</style>
