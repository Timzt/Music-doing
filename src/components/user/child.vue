<template>
	<div class="ajax">
	   	
	    <router-link to="/user/child_2">我是。。。点击猪爷出现的child</router-link>
	    
    </div>

</template>

<script>
export default {
 	name:'ajax',
 	data (){
 		return {
 			child:'我是child',
 			srcImg:'images/loading.gif'
 		}
 	},
 	methods:{
 	}
}
</script>