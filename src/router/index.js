import Vue from 'vue'
import Router from 'vue-router'

import Hello from '@/components/Hello'
import home from '@/components/user/home'
import child from '@/components/user/child'
import child_2 from '@/components/user/child_2'

// 引用模板

import Index from '@/components/Index'
import Music from '@/components/Music'
import Person from '@/components/Person'
// 执行 npm run build 会打包为一个整体 app.[contenthash].js ,这个文件是非常大,可能几兆或者几十兆,加载会很慢
// 所以我们需要分模块打包,把我们想要组合在一起的组件打包到一个 chunk块中去

// 分模块打包需要下面这样使用 webpack的 require.ensure,并且在最后加入一个 chunk名,

// 相同 chunk名字的模块将会打包到一起

// router/index.js 修改为懒加载组件
// const Index = r => require.ensure([], () => r(require('@/components/Index.vue')), 'Index')
// const Music = r => require.ensure([], () => r(require('@/components/Music.vue')), 'Music')
// const Person = r => require.ensure([], () => r(require('@/components/Person.vue')), 'Person')

Vue.use(Router)

//单个单个引用
// export default new Router({
//   routes: [
//     { path: '/',name: 'Hello', component: Hello},
//     { path: '/post/post',name: 'Post', component: Post },
// 	{ path: '/movie/movie',name: 'Movie', component: Movie },
//   ]
// })

//嵌套路由


export default new Router({
	mode: 'history',//可以是去掉#号
	routes: [
	{ path: "/", redirect: "/Index" },//重定向,指向了Music组件
	{ 
		path: '/Index', 
		component: Index,
		// component: Index
		children:[
			{path:'/Index' , component: Index,name: "Index"}
		]
		// component:resolve => require(['@/components/Index'],resolve)
	 },
	 { 
		path: '/Music', 
		component: Music
		// component:resolve => require(['@/components/Music'],resolve)
	 },
	 { 
		path: '/Person', 
		component: Person
		// component:resolve => require(['@/components/Person'],resolve)
	 }
	]
})

