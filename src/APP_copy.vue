<!--<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HeaderDiv :logo='logoMsg' @parentChildren='setUser'></HeaderDiv>
  
    <home></home>
    <router-view style="border: 1px solid red"></router-view>渲染child
     <p id="dataSet"></p>
  </div>
</template>
--> 
<!-- <script>
import HeaderDiv from './components/todolist'
import home from './components/user/home'
export default {
  name: 'app',
  data () {
    return{
      logoMsg:'Tim-index 这是App.vue设置的数据',
      username:''
      
    }
  },
  methods:{
    setUser(msg){
      this.username=msg
    }
  },
  components:{
    'HeaderDiv':HeaderDiv,
    'home':home
  },
  mounted(){
    this.$http.get('http://www.ls-tim.com/vue/get.json')
      .then( (res) => {       
        var data1=res.data.results[0].name
        let dataSet = document.querySelector('#dataSet');
        dataSet.innerHTML=data1
        return data1
      })
      .catch( (err) => {
          console.log(err);
      });
      this.Cowrite('five','Tim');
      this.Coread();
      this.setItem('five','Tim');
      this.getItem('five','Tim');
      this.getName();
  }
}
</script> -->


