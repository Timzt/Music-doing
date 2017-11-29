/*
* @Author: Timzt
* @Date:   2017-11-27 10:51:50
* @Last Modified by:   Timzt
* @Last Modified time: 2017-11-27 10:51:53
*/
const DEFAULT_INTERVAL = 100 / 60

export const requestAnimationFrame = (() => {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    // if all else fails, use setTimeout
    function (callback) {
      return window.setTimeout(callback, (callback.interval || DEFAULT_INTERVAL) / 2) // make interval as precise as possible.
    }
})()

export const cancelAnimationFrame = (() => {
  return window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.oCancelAnimationFrame ||
    function (id) {
      window.clearTimeout(id)
    }
})()