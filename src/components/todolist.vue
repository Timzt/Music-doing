<template>
	<header class='header'>
		<div id='logo'>{{logo}}</div>
		<ul class='nav'>
			<li v-for='nav in navs'>
				{{nav.li}}
			</li>
		</ul> 
		<section>
			<div class="login">
				<label>
					<span>用户名：</span>
					<input type="text" v-model='uesername' @change='getUser' />
				</label>
			</div>
			<p>用户名为：{{uesername}}</p>
		</section>
		
		<!-- div>ul>li*5>input[value] -->
		<div>
			<ul @click='click1' class="all">
				<li>1</li>
				<li>2</li>
				<li>3</li>
				<li>4</li>
			</ul>
		</div>

		<!-- <div class="top">
			<span>返回</span>
			<span>首页</span>
			<span>下一步</span>
		</div>
		<div class="center">
			<img src="../assets/passcode.jpg">
		</div> -->
		<div>
		    {{ $store.state.count }}
		</div>
		 
		 
		<!-- 单个单个引用 -->
		<!-- <div>
			<router-link to="/user/post">日志</router-link>
			<router-link to="/user/movie">电影</router-link>
		</div>  -->
		<input type="text" @click='onEnter' v-model='input_name' placeholder="11">
		<p>{{input_name}}</p>
	</header>
	
</template>

<script>
	export default {
		name:'header',
		data (){
			return {
				navs:[
					{li:'A'},
					{li:'B'},
					{li:'C'},
					{li:'D'}
				],
				uesername:'这是todolist设置的数据',
				input_name:''
			}
		},
		created () {
		  console.log(this.getStatus(this.$route.path))
		}
		,
		watch: {
		  '$route' (to, from) {
		  //刷新参数放到这里里面去触发就可以刷新相同界面了
		    this.getStatus(this.$route.path)
		  }
		},
		props:['logo'],
		methods:{
			onEnter(){
				this.input_name='';
				
			},
			getStatus (urlStr) {
			   var urlStrArr = urlStr.split('/')
			   return urlStrArr[urlStrArr.length - 1]
			},
			getUser (){
				this.$emit('parentChildren' , this.uesername)
			},
			click1 (){
				console.log(this.$store.dispatch('incrementAsyncWithValue',5))
				var oUl=document.querySelector('.all');
				var oLi=oUl.getElementsByTagName('li');
				var i=0,val;
				// for(i=0;i<oLi.length;i++){
				// 	val=oLi[i].innerHTML;
				// 	setTimeout((function(i){
				// 		console.log(i)
				// 	})(i),3000)
				// }
				// for(i=0;i<oLi.length;i++){
				// 	val=oLi[i].innerHTML;
				// 	oLi[i].onclick=function(num){
				// 		return function(){
				// 			console.log(num+1)
				// 			return num

				// 		}
				// 	}(i)
					
				// }
				// return oLi
				// 
				for(i=0;i<oLi.length;i++){
					oLi[i].onclick=function(){
						// 千分位分割
						// function thousands(str){
						// 	var str=(str || 0).toString();
						// 	var result='';
						// 	if(str){
						// 		while(str.length >3){
						// 			result=','+str.slice(-3)+result;
						// 			str=str.slice(0,str.length-3)
						// 		}
						// 		result=str+result
						// 		console.log(result)
						// 		return result
						// 	}
						// }
						// thousands(38999000001)
						// 拍平数组 笨方法
						// var source=['first',['second',['third',['four']]],'fifth',['six']]
						// function beatArr(arr){
						// 	var reg=new RegExp(',',"g");
						// 	if(arr){	
						// 		var arr1=source.slice(0,1)							
						// 		for(var i = 0;i<arr.length;i++){
						// 			//console.log(arr[i])
						// 			if(i==1){
						// 				var arr2=arr[i];
						// 				var arr2_1=arr2[0];
						// 				var arr2_2=arr2[1][0];
						// 				var arr2_3=arr2[1][1][0]
						// 				var result=arr1.concat(arr2_1).concat(arr2_2).concat(arr2_3).concat(arr[2]).concat(arr[3])
						// 				return result;				
						// 			}
						// 		}
						// 	}
						// }
						// console.log(beatArr(source))
						// 拍平数组，递归
						// var source=['first',['second',['third',['four']]],'fifth',['six']]
						// var b =[];
						// function tree(obj){
						// 	//debugger
						// 	if(!obj){
						// 		return
						// 	}
						// 	else if(typeof obj === 'object'){
						// 		for (var i = 0; i < obj.length; i++) {
						// 			tree(obj[i])
						// 		}
						// 	}else{
						// 		b.push(obj)
						// 		console.log(b)
						// 	}
							
							
						// }
						// tree(source)
						// 继承 curring 技能sum的方法
						// function sum(name){
						// 	this.name=name
						// }
						// function curring(name){
						// 	sum.call(this,name)
						// }
						// curring.prototype=new sum();
						// curring.prototype.constructor=curring;
						// var curry=new curring('Tim')

						// console.log(curry.name)
						// function sum(a,b,c){
						// 	return a+b+c
						// }
						// function curring(fn){
						// 	sum.call(this,fn)
						// }
						// curring.prototype=new sum();
						// curring.prototype.constructor=curring;
						// var curry=new curring(sum)
						// curry.prototype=new curring()
						// curry.prototype.constructor=curry;

						// console.log(curry(1)(2)(3))//6
						// var _that=this
						// var test=(function(a){
						// 	_that.a=a;
						// 	console.log(_that.a)
						// 	return function(b){
						// 		console.log(b)
						// 		return _that.a+b;
						// 	}
						// }(function(a,b){
						// 	return a;
						// }(1,2)))

						// console.log(test(4))

						function sum(a,b,c){
							return a+b+c
						}
						function curring(fn){
							var arr=[];
							var index=0;
							var func=fn;
							var funca=function(v){
								arr[index]=v;
								index++;
								if(index==func.length){
										index=0;
										return func.apply(this,arr);
								}else{
									return funca;
								}
							};
							return function(a){
								return funca(a)
							}
						}
						var curry = new curring(sum);
						console.log(curry(1)(2)(3))


						// setTimeout(function(){console.log(4)},0); 
						// new Promise(function(resolve){ 
						// 	console.log(1)
						// 	for( var i=0 ; i<10000 ; i++ )
						// 		{
						// 		 i==9999 && resolve() 
						// 		}
						// 	 console.log(2) 
						// 	}).then(function(){ console.log(5) }); 
						// console.log(3);
						// var boil=function(cb){
						// 	setTimeout(function(){
						// 		cb('boiled')
						// 		console.log(1)
						// 	},10000)
						// }

						// var wash=function(cb){
						// 	setTimeout(function(){
						// 		cb('wash')
						// 		console.log(2)
						// 	},2000)
						// }

						// var prepare=function(cb){
						// 	setTimeout(function(){
						// 		cb('prepare')
						// 		console.log(3)
						// 	},1000)
						// }
						// console.time('callback')
						// boil(function(boiled){
						// 	wash(function(wash){
						// 		prepare(function(prepare){
						// 			console.log(boiled+wash+prepare)
						// 			console.timeEnd('callback')
						// 		})
						// 	})
						// })
						console.time('Promise')
						var boiling=new Promise(
									function(res,rej){
										res(console.log('正在进行煮开水'))
									}
							)
						var boil =function(){
									boiling	
									.then(wash)								
									.then(prepare)
									
									.then(function(fulfilled){
										setTimeout(function(){
											console.log(fulfilled+'煮！')
										},1000)
									})
									.catch(function(error){
										console.log(error.message+'错误')
									})					
						}

						var wash=function(){
							return new Promise(
								function(res,rej){
									setTimeout(function(){
										res('wash')
										console.log('洗锅完成')
									},5000)
										
								}
							)
						}

						var prepare=function(){
							return new Promise(
								function(res,rej){
									setTimeout(function(){
										res('prepare')
										console.log('准备工作完成')
									},2000)	
								}
							)
						}
						boil()
						console.timeEnd('Promise')

						var boil=new Promise(
							function(resolve,reject){
								setTimeout(function(){
									resolve('boil')
									console.log(1)
								},3000)
							}
						)
						console.time('resolve')
						boil().then(function(boiled){
							return wash()
						})
						.then(function(wash){
							return prepare()
						})
						.then(function(prepare){
							console.tiemEnd('resolve')
						})

					}
				}
				// for(var i=0; i<10;i++){
				// 	if(i===2){
				// 		window.onclick=function(){
				// 			console.log(i)//10
				// 		}
				// 	}
				// }
			
			}

			// for(var i =0;i<5;i++){
			// 	setTimeout((function(i){
			// 		console.log(i)
			// 	})(i),1000)
			// }
			// for(var i =0;i<5;i++){
			// 	var A =(function(i){
			// 		setTimeout(function(){
			// 			console.log(i)
			// 		},1000)
			// 		return A
			// 	})(i)
			// }
			// var c=0;
			// console.log(window.c)


			// function print(){
			// 	console.log(c)
			// }

			// var c=0;
			// print()
			

			// var print= function(){
			// 	var c=0;
			// 	console.log(c)
			// }
			// print()

			// plus()




			// console.log(f1()); 
			// console.log(f2()); 
			// var c=0;
			// function f1() {
			// 	console.log(c)
			// }
			// var f2 = function() {
			// 	console.log(c)
			// }
			



			// console.log(f1()); 
			
			// var c=0;
			// function f1() {
			// 	console.log(1)
			// 	console.log(c)
			// }


			
			// foo()
			
			// var c=0;
			// function f1() {
			// 	console.log(1)
			// 	console.log(c)
			// }

			// var a=2;
			// function foo(){
			// 	console.log(a)
			// 	var a=10;
			// }
			// foo()
			
			
		},
		

	}

</script>