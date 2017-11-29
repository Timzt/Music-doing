/*
* @Author: Timzt
* @Date:   2017-11-27 10:47:32
* @Last Modified by:   Timzt
* @Last Modified time: 2017-11-27 10:47:34
*/
import { DIRECTION_UP } from '../util/const'

export function pullUpMixin(BScroll) {
  BScroll.prototype._initPullUp = function () {
    // must watch scroll in real time
    this.options.probeType = 3

    this.pullupWatching = false
    this._watchPullUp()
  }

  BScroll.prototype._watchPullUp = function () {
    if (this.pullupWatching) {
      return
    }
    this.pullupWatching = true
    const {threshold = 0} = this.options.pullUpLoad

    this.on('scroll', checkToEnd)

    function checkToEnd(pos) {
      if (this.movingDirectionY === DIRECTION_UP && pos.y <= (this.maxScrollY + threshold)) {
        this.trigger('pullingUp')
        this.pullupWatching = false
        this.off('scroll', checkToEnd)
      }
    }
  }

  BScroll.prototype.finishPullUp = function () {
    if (this.isInTransition) {
      this.once('scrollEnd', () => {
        this._watchPullUp()
      })
    } else {
      this._watchPullUp()
    }
  }
}