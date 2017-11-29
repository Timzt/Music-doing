// rem
export function rem(doc, win) {
    var docWidth = 750;// 设计图文档宽度
    // css值为：设计图尺寸/100  例：100px => 1rem;
    // 为什么是100 由下面的 20 * 5得出
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize';
    var recalc = (function refreshRem() {
        var clientWidth = docEl.getBoundingClientRect().width;
        // 8.533333为iPhone4[最小宽为iPhone4尺寸]
        // *5为了方便计算 => 设计图px值除以100得出rem值
        var size = (20 * (clientWidth / docWidth) * 5);
        docEl.style.fontSize = (size >100 ? 100 : size)+ 'px';
        return refreshRem;
    })();
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
    // 解决:active这个高端洋气的CSS伪类不能使用问题 特别注意：有可能跟FastClick冲突
    doc.addEventListener('touchstart', function () {
    }, false);
}(document, window);

//侦听事件
export function on(ele, ev, handler) {
  if (ele.addEventListener) {
    ele.addEventListener(ev, handler, false)
  } else {
    ele.attachEvent('on' + ev, function () {
      fn.call(handler);
    })
  }
}

//添加class
export function addClass(ele, cls) {
  var oClass = ele.className.split(' ');
  if (!ele.className) {
    ele.className = cls;
    return;
  }
  for (var i = 0; i < oClass.length; i++) {
    if (oClass[i] === cls) {
      return;
    }
  }
  ele.className += " " + cls;
}
//移除class
export function removeClass(obj, sClass) {
  var aClass = obj.className.split(' ');
  if (!obj.className) return;
  for (var i = 0; i < aClass.length; i++) {
    if (aClass[i] === sClass) {
      aClass.splice(i, 1);
      obj.className = aClass.join(' ');
      break;
    }
  }
}

//获取样式
export function getStyle(dom, attr) {

  return dom.currentStyle ? dom.currentStyle[attr] : getComputedStyle(dom, false)[attr];

};

export function view() {
  return {
    w: document.documentElement.clientWidth,
    h: document.documentElement.clientHeight
  };
}

//获取id
export function $(id){
    return typeof id=== 'string'?document.getElementById(id):id;
}