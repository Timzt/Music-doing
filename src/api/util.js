/*
* @Author: Timzt
* @Date:   2017-11-24 17:35:13
* @Last Modified by:   Timzt
* @Last Modified time: 2017-11-28 14:12:32
*/
export function getDeviceRatio(){
  var isAndroid = window.navigator.appVersion.match(/android/gi);
  var isIPhone = window.navigator.appVersion.match(/iphone/gi);
  var devicePixelRatio = window.devicePixelRatio;
  var dpr;
  if (isIPhone) {
    // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
    if (devicePixelRatio >= 3) {        
      dpr = 3;
    } else if (devicePixelRatio >= 2){
      dpr = 2;
    } else {
      dpr = 1;
    }
  } else {
    // 其他设备下，仍旧使用1倍的方案
    dpr = 1;
  }
  return dpr
}
