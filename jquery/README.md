# jq技术内幕
jquery 代码一上来这样子的。为什么？
```js
(function(window, undefined) {
  // undefined 在外面是关键字，在里面就是undefined变量
  undefined = 42;
  alert(42)	// 42
})(window);
undefined = 42;
alert(undefined);	// undefined;
```
闭包，保护内部的变量。
  ```js
  var s = new $('.test');
var q = $('.test');
// s 和 q 的原型链不一样，但是取出来的东西是一样的。
  ```
  # jquery 源码第一行
  ```js
  (function(window, undefined) {
  var jQuery = function(selector, context) {
    // 默默的给做了一个 new
    return jQuery.fn.init(selector, context); // 这段代码被传为佳话
  };
  jQuery.fn = jQuery.prototype = {
    init: function(select, context){
      
    }
  };
  // jQuery.fn.init.prototype = jQuery.fn = jQuery.prototype ???
  // 为什么绕？ 有什么好处?
  // 绝妙的地方
  // 要把 jQuery.fn.init.prototype 给绕出来
  jQuery.fn.init.prototype = jQuery.fn
  
  // 1. 构造函数 2. prototype的方法
  // new 第一步 返回一个 init 的函数，原型链上挂载了一个init的函数 没有主动执行
  // init没调用，被搁置了
  // 构造函数内部的 return new
  // jQuery
  
  // jQuery.fn.init.prototype = jQuery.fn = jQuery
  // 把各自的原型链去掉
  // jQuery.fn.init = jQuery
  // new jQuery.fn.init 相当于 new 自己
  
  // new 自己就好了，为什么就要绕？
  // 为了得到 jQuery 原型链的方法。jQuery.fn上拥有原型链上的所有方法
})(window)
  ```
  new 和 不new 展现出来的形式是一样的。所以默默的 new一样。

new的话，s能够访问jq原型链所有方法

不new的话 q也能够访问jq原型链所有方法
> $.fn 

$.fn 上挂载一个方法。所有的jQuery都能够使用了。

# jQuery 链式调用

```js
var s = {
  a: function(argument) {
    console.log("first");
    return this
  },
  b: function(argument) {
    console.log("two");
    return this
  },
  c: function(argument) {
    console.log("three");
    return this
  }
};

s.a().b().c();
```
# jquery事件代理
直接绑定会失败
```js
$('body').append('<div class="test"></div>');
$('.test').click(function(argument){
  // body..
}); 

//模拟时间代理
function live(targetObject, type, fn) {
  document.onclick = function(event) {
    var e = event ? event : window.event;
    addRow();
    alert(1);
    // 解决浏览器兼容的问题，e.srcElement IE, e.target FF
    var target = e.srcElement || e.target;
    if (e.type == type && target.tagName.toLocaleLowerCase() == targetObject) {
      alert(3);
      fn();	// 如果元素类型和事件类型同时匹配，则执行函数
    }
  }
}
```

原来的事件绑定，要绑定好多事件，现在只需要绑定一个事件，大大提高了效率和页面性能，解决的动态添加元素导致不能触发的bug。
# jquery 重载方式
* 例如：


```js
$('.test').val();	// 不传参数， 取值
$('.test').val("test");	// 传了参数，赋值
// $() -> 函数 函数的重载

/**
old undefined obj.find = f0 
old find0 obj.find = f1
obj find1 obj.find = f2
*/
function addMethod(obj, name, f) {
  var old = obj[name];
  obj[name] = function() {
    if (f.length === arguments.length) {
      return f.apply(this, arguments)
    } else {
      return old.apply(this, arguments)
    }
  }
}

var people = {
  name: ['张三', '李四', '王二麻']
};

var find0 = function() {
  return this.name;
};

addMethod(people, 'find', find0);
people.find();
```

