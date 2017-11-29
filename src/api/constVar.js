/*
* @Author: Timzt
* @Date:   2017-11-28 14:12:24
* @Last Modified by:   Timzt
* @Last Modified time: 2017-11-28 14:12:38
*/
//如果是外链的
export default{
  install(Vue,options)
  {
    Vue.prototype.LOCALAPI = 'static/dataApi.json'
  }
}