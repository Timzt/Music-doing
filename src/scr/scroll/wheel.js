/*
* @Author: Timzt
* @Date:   2017-11-27 10:48:33
* @Last Modified by:   Timzt
* @Last Modified time: 2017-11-27 10:48:35
*/
import { warn } from '../util/debug'

export function wheelMixin(BScroll) {
  BScroll.prototype.wheelTo = function (index) {
    if (this.options.wheel) {
      this.y = -index * this.itemHeight
      this.scrollTo(0, this.y)
    }
  }

  BScroll.prototype.getSelectedIndex = function () {
    return this.options.wheel && this.selectedIndex
  }

  BScroll.prototype._initWheel = function () {
    const wheel = this.options.wheel
    if (!wheel.wheelWrapperClass) {
      wheel.wheelWrapperClass = 'wheel-scroll'
    }
    if (!wheel.wheelItemClass) {
      wheel.wheelItemClass = 'wheel-item'
    }
    if (wheel.selectedIndex === undefined) {
      wheel.selectedIndex = 0
      warn('wheel option selectedIndex is required!')
    }
  }
}