<template>
	<div id="Index" class="Index">
		我是Index页面写的内容
		<!-- <botMusicList :indexData1="indexData1"></botMusicList> -->
		<botMusicList></botMusicList>
	</div>
</template>
<script>
	import botMusicList from './botMusicList/botMusicList'
	import { mapState } from 'vuex'
	export default{
		name:'Index',
		data(){
			return{
				indexData1:{
					type:Object
				}
			}
		},
		computed:{
            ...mapState([
                'sendState'
            ])
        },
		created(){
			if(this.sendState !== true){
				if(localStorage.hasOwnProperty('localMusicData')){
					this.indexData1=localStorage.getItem('localMusicData')
				}else{
					this.$http.get(this.LOCALAPI)
				      .then( (res) => {  
				      	localStorage.setItem('localMusicData',JSON.stringify(res.data.music.all))
						return res
				      }).then(()=>{
				      	setTimeout(()=>{
				      		this.indexData1=localStorage.getItem('localMusicData')
				      		console.log('数据加载--ok')
				      	}, 300)
				      }).catch( (err) => {
				          console.log('数据加载--err');
				      });
				}
			}else{
				console.log(this.sendState)
				this.indexData1=this.$route.params.dataUrl.music.all
				var oldData =JSON.stringify(this.indexData1)
				localStorage.setItem('localMusicData' , oldData)
				this.indexData1=localStorage.getItem('localMusicData')	
			}
		}
		,
	  	components:{
	  		botMusicList
	  	}
	}
</script>
