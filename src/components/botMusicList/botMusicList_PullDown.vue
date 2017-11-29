<template>
	<div ref="wrapper" class="list-wrapper" style='height: 26rem;'>
    <div class="scroll-content">
      <slot>
        <ul ref="list" class="list-content">
          <li @click="clickItem($event,item,index)" class="list-item" v-for="(item,index) in newData">
          {{item.name}}</li>
        </ul>
      </slot>
      <slot name="pullup"
            :pullUpLoad="pullUpLoad"
            :isPullUpLoad="isPullUpLoad"
      >
        <div class="pullup-wrapper" v-if="pullUpLoad">
          <div class="before-trigger" v-if="!isPullUpLoad">
            <span>{{pullUpTxt}}</span>
          </div>
          <div class="after-trigger" v-else>
            <loading></loading>
          </div>
        </div>
      </slot>
    </div>
    <slot name="pulldown"
          :pullDownRefresh="pullDownRefresh"
          :pullDownStyle="pullDownStyle"
          :beforePullDown="beforePullDown"
          :isPullingDown="isPullingDown"
          :bubbleY="bubbleY"
    >
      <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
        <div class="before-trigger" v-if="beforePullDown">
          <bubble :y="bubbleY"></bubble>
        </div>
        <div class="after-trigger" v-else>
          <div v-if="isPullingDown" class="loading">
            <loading></loading>
          </div>
          <div v-else><span>{{refreshTxt}}</span></div>
        </div>
      </div>
    </slot>
  </div>
</template>
<script>
	import BScroll from '../../scr/index'
	import Loading from '../loading/loading'
	import { mapState } from 'vuex'
	import { getRect } from '../../api/dom'
	import Bubble from '../bubble/bubble'
	const COMPONENT_NAME = 'scroll'
	const DIRECTION_H = 'horizontal'
	const DIRECTION_V = 'vertical'
	export default{
		name:COMPONENT_NAME,
		props: {
			data: {
				type: Array,
				default: function () {
				  return []
				}
			},
			probeType: {
				type: Number,
				default: 1
			},
			click: {
				type: Boolean,
				default: true
			},
			listenScroll: {
				type: Boolean,
				default: false
			},
			listenBeforeScroll: {
				type: Boolean,
				default: false
			},
			direction: {
				type: String,
				default: DIRECTION_V
			},
			scrollbar: {
				type: null,
				default: false
			},
			pullDownRefresh: {
				type: null,
				default: true
			},
			pullUpLoad: {
				type: null,
				default: true
			},
			startY: {
				type: Number,
				default: 0
			},
			refreshDelay: {
				type: Number,
				default: 20
			},
			freeScroll: {
				type: Boolean,
				default: false
			},
			loadingStatus: {
			    type: Object,
			    default: function () {
			        return {
			            showIcon: false,
			            status: false
			        };
			    }
			},

    	},
		data(){
			return{
				newData:[],
	            beforePullDown: true,
		        isRebounding: false,
		        isPullingDown: false,
		        isPullUpLoad: false,
		        pullUpDirty: true,
		        pullDownStyle: '',
		        bubbleY: 0
			}
		},
	    mounted(){
	    	// 保证在DOM渲染完毕后初始化better-scroll
			if(this.sendState === false){
				console.log('F5刷新页面了')	
				window.onbeforeunload=()=>{
					this.newData=JSON.parse(localStorage.getItem('localMusicData'))						  	
				}
			}
			setTimeout(() => {
				this._initScroll()
			}, 20)
	    },
		computed:{
            ...mapState([
                'sendState'
            ]),
            pullUpTxt() {
		        const moreTxt = this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.more || '11'
		        const noMoreTxt = this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.noMore || '22'
		        return this.pullUpDirty ? moreTxt : noMoreTxt
		      },
		      refreshTxt() {
		      	console.log('lkkkkkkkkkkk')
		        return this.pullDownRefresh && this.pullDownRefresh.txt || '33'
		      }
        }
        ,	
	  	created(){	
	  		this.pullDownInitTop = -50//默认滑动多少开始 出现icon
	  		this.newData=JSON.parse(localStorage.getItem('localMusicData'))	
	  		 		
	  	},
	  	methods:{
	  		_initScroll() {
		        if (!this.$refs.wrapper) {
		          return
		        }
		        if (this.$refs.list && (this.pullDownRefresh || this.pullUpLoad)) {
		          this.$refs.list.style.minHeight = `${getRect(this.$refs.wrapper).height + 1}px`;
		        }
		        let options = {
		          probeType: this.probeType,
		          click: this.click,
		          scrollY: this.freeScroll || this.direction === DIRECTION_V,
		          scrollX: this.freeScroll || this.direction === DIRECTION_H,
		          scrollbar: this.scrollbar,
		          pullDownRefresh: this.pullDownRefresh,
		          pullUpLoad: this.pullUpLoad,
		          startY: this.startY,
		          freeScroll: this.freeScroll
		        }
		        this.scroll = new BScroll(this.$refs.wrapper, options)
		        if (this.listenScroll) {
		          this.scroll.on('scroll', (pos) => {
		            this.$emit('scroll', pos)
		          })
		        }
		        if (this.listenBeforeScroll) {
					this.scroll.on('beforeScrollStart', () => {
						this.$emit('beforeScrollStart')
					})
		        }
		        if (this.pullDownRefresh) {
		          this._initPullDownRefresh()
		        }
		        if (this.pullUpLoad) {

		          this._initPullUpLoad()
		        }
	        },
			forceUpdate(dirty) {
				if (this.pullDownRefresh && this.isPullingDown) {
		        	console.log('0000000000000000000000000')
					this.isPullingDown = false
					this._reboundPullDown().then(() => {
						this._afterPullDown()
					})
				} else if (this.pullUpLoad && this.isPullUpLoad) {

				  this.isPullUpLoad = false
				  this.scroll.finishPullUp()
				  this.pullUpDirty = dirty
				  this.refresh()
				} else {
				  this.refresh()
				}
		    },
			_initPullDownRefresh() {
				console.log('---------开始---------')
				//触发下拉去   加载数据的时候
			this.scroll.on('pullingDown', () => {
				console.log('----------------我开始加载数据---------------')
				this.beforePullDown = false;
				this.isPullingDown = true;

				this.refresh()
				this.$emit('pullingDown')
			    this.$http.get('static/dataApi.json')
			      .then( (res) => {  
			  //     	this.newDataArr = Object.assign({}, {
					//   name: '28-------',
					//   favoriteColor: 'Vue Green'
					// })
					// this.newData.concat(this.newDataArr)
					// this.$set(this.newData, 'name', 'Timzt')
			      	this.newData.splice(this.newData.length, 0 ,{"name":"Timzt"})
			      	console.log(this.newData)
					return res
			      }).then(()=>{
			      	setTimeout(()=>{

			      		this.beforePullDown = true;
						this.isPullingDown = false;
						this.scroll.finishPullDown() //回到页面顶部 每次加载完成 写一下
						//finishPullUp()//回到页面底部
			      	}, 3000)
			      }).catch( (err) => {
			          console.log(err);
			      });
			    

			})
			//下拉的过程
			this.scroll.on('scroll', (pos) => {
			  if (this.beforePullDown) {
			    this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop)
			    this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 10)}px`
			    console.log(pos.y+'----------------我在下拉--'+this.bubbleY)
			    this.scroll.finishPullUp()
			  } else {
			    this.bubbleY = 0
			  }
			  if (this.isRebounding) {
			    this.pullDownStyle = `top:${10 - (this.pullDownRefresh.stop - pos.y)}px`
			  }
			})
			},
			_initPullUpLoad() {
				this.scroll.on('pullingUp', () => {
				  this.isPullUpLoad = true
				  this.$emit('pullingUp')
				})
			},
			_reboundPullDown() {
				console.log('-------------------------------')
				const {stopTime = 600} = this.pullDownRefresh
				return new Promise((resolve) => {
				  setTimeout(() => {
				    this.isRebounding = true
				    this.scroll.finishPullDown()
				    resolve()
				  }, stopTime)
				})
			},
			_afterPullDown() {
				setTimeout(() => {
				  this.pullDownStyle = `top:${this.pullDownInitTop}px`
				  this.beforePullDown = true
				  this.isRebounding = false
				  this.refresh()
				}, this.scroll.options.bounceTime)
			},
	        disable() {
		        this.scroll && this.scroll.disable()
			},
			enable() {
				this.scroll && this.scroll.enable()
			},
			refresh() {
				this.scroll && this.scroll.refresh()
			},
			scrollTo() {
				this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
			},
			scrollToElement() {
				this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
			},
			clickItem(e, item,index) {//跳转对应页面
				console.log(index)
				this.$emit('click', item,index)
			},
			destroy() {
				console.log('------------销毁scroll------------')
				this.scroll.destroy()
			} 	
           
        },
        watch:{
        	data() {
		        setTimeout(() => {
		          this.forceUpdate(true)
		        }, this.refreshDelay)
		      }
        },
        components:{Bubble,Loading}
	}
</script>
<style lang='scss' scoped=''>
.list-wrapper{
    position: absolute;
    left: 0;
    top: 144px;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background: #fff}
    .scroll-content{
      position: relative;
      z-index: 1}
    .list-content{
      position: relative;
      z-index: 10;
      background: #fff;}
      .list-item{
        height: 60px;
        line-height: 60px;
        font-size: 18px;
        padding-left: 20px;
        border-bottom: 1px solid #e5e5e5;}
  .pulldown-wrapper{
    position: absolute;
    width: 100%;
    left: 0;
    display: flex;
    justify-content:center;
    align-items:center;
    transition: all;}
    .after-trigger{
      margin-top: 10px;
    }
  .pullup-wrapper{
    width: 100%;
    display: flex;
    justify-content:center;
    align-items:center;
    padding: 16px 0}


	@import "../style_css/global.scss";
	.wrapper{
            position: fixed;
		    z-index: 1;
		    top: 55px;
		    bottom: 50px;
		    left: 0;
		    width: 100%;
		    background: #fff;
		    overflow: hidden;
		    -webkit-overflow-scrolling : touch; 
        .content{
            
            li{
                list-style:none;
                width:100%;
                text-align:center;
                color:#666;

            }
        }
    }
    $cube-size: 10px; 
.better-scroll-root {
    .loading-pos, .pulldown-tip,.loading-pos-down {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 35px;
        color: #333;
        text-align: center;
        z-index: 2000;
    }
    .loading-pos,.loading-pos-down {
        background-color: rgba(7, 17, 27, 0.2);
        transition: all 0.15s ease-in-out;
    }
    .loading-pos-down{top: auto;bottom: 50px}
    .pulldown-tip {
        top: -50px;
        height: 50px;
        line-height: 50px;
        z-index: 1;
    }
    .pullup-tip {
        bottom: -50px;
        height: 50px;
        line-height: 50px;
        z-index: 1;
    }
    .pull-icon {
        position: absolute;
        top: 0;
        left: 30%;
        color: #a5a1a1;
        font-size: 1.5em;
        transition: all 0.15s ease-in-out;
    }
    .pull-icon.icon-rotate {
        transform:rotate(180deg);
    }
    
    .loading-container {
        position: absolute;
        height: $cube-size;
        width: $cube-size;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        perspective: 40px;
    }
    .loading-connecting {
        line-height: 35px;
    }
    .cube{
        height:$cube-size;
        width:$cube-size;
        transform-origin:50% 50%;
        transform-style:preserve-3d;
        animation:rotate 3s infinite ease-in-out;
    }
    .side{
        position:absolute;
        height:$cube-size;
        width:$cube-size;
        border-radius:50%;
    }
    .side1{
        background: #4bc393;
        transform:translateZ($cube-size);
    }
    .side2{
        background:#FF884D;
        transform:rotateY(90deg) translateZ($cube-size);
    }
    .side3{
        background:#32526E;
        transform:rotateY(180deg) translateZ($cube-size);
    }
    .side4{
        background: #c53fa3;
        transform:rotateY(-90deg) translateZ($cube-size);
    }
    .side5{
        background:#FFCC5C;
        transform:rotateX(90deg) translateZ($cube-size);
    }
    .side6{
        background:#FF6B57;
        transform:rotateX(-90deg) translateZ($cube-size);
    }
    
    @keyframes rotate{
        0%{
            transform:rotateX(0deg) rotateY(0deg);
        }
        50%{
            transform:rotateX(360deg) rotateY(0deg);
        }
        100%{
            transform:rotateX(360deg) rotateY(360deg);
        }
    }
}
</style>