# JavaScript语言精粹

## 数据类型
---
JavaScript弱类型语言，不像其他语言需要先声明它是个什么类型，并且有很多东西是编译的时候检查不出来的，JavaScript有7种数据类型
* null 
* boolean 
* string 
* number 
* undefined
* symbol 
* Object(Array、RegExp、Date、Math……)

> ECMAScript包括两个不同类型的值:基本数据类型和引用数据类型。

基本数据类型指的是简单的数据段，引用数据类型指的是有多个值构成的对象。

当我们把变量赋值给一个变量时，解析器首先要确认的就是这个值是基本类型值还是引用类型值。

``` js
var obj1 = new Object();
var obj2 = obj1;
obj2.name = "我有名字了";
console.log(obj1.name); // 我有名字了
```
## 声明变量时不同的内存分配：
---
1. 原始值：存储在栈（stack）中的简单数据段，也就是说，它们的值直接存储在变量访问的位置。
这是因为这些原始类型占据的空间是固定的，所以可将他们存储在较小的内存区域 – 栈中。这样存储便于迅速查寻变量的值。

2. 引用值：存储在堆（heap）中的对象，也就是说，存储在变量处的值是一个指针（point），指向存储对象的内存地址。这是因为：引用值的大小会改变，所以不能把它放在栈中，否则会降低变量查寻的速度。相反，放在变量的栈空间中的值是该对象存储在堆中的地址。
地址的大小是固定的，所以把它存储在栈中对变量性能无任何负面影响。

## 不同的内存分配机制也带来了不同的访问机制
---
1. 在javascript中是不允许直接访问保存在堆内存中的对象的，所以在访问一个对象时，
首先得到的是这个对象在堆内存中的地址，然后再按照这个地址去获得这个对象中的值，这就是传说中的按引用访问。
2. 而原始类型的值则是可以直接访问到的。

## 参数传递的不同（把实参复制给形参的过程）
---
>首先我们应该明确一点：ECMAScript中所有函数的参数都是按值来传递的。
但是为什么涉及到原始类型与引用类型的值时仍然有区别呢？还不就是因为内存分配时的差别。 　
1. 原始值：只是把变量里的值传递给参数，之后参数和这个变量互不影响。
2. 引用值：对象变量它里面的值是这个对象在堆内存中的内存地址，这一点你要时刻铭记在心！
因此它传递的值也就是这个内存地址，这也就是为什么函数内部对这个参数的修改会体现在外部的原因了，因为它们都指向同一个对象。

## const理解 
---
```js
const obj = {
    name:'xianming'
}
obj.name = 111;
console.log(obj);//name:111
obj = {};//Assignment to constant variable.
//引用类型 不可以改变储存的地址，但是可以改变储存的值
```

## arguments
---
1. arguments;
2. arguments.length;
3. arguments.caller;调用当前执行函数的函数
4. arguments.callee;当前正在执行的函数
```js
function foo() {
    return arguments;
}

console.log(foo(1, 2, 3));//{'0':1,'1':2,'2':3}类数组的对象

```
## rest
---
```js
function foo(...arguments) {
    return arguments;
}
console.log(foo(1, 2, 3));//[1,2,3]

function foo(a, b, ...arguments) {
    return arguments;
}

console.log(foo(1, 2, 3, 4, 5));//(3) [3, 4, 5]

```
---
1. 每个函数都有一个prototype（原型）的对象属性，对象内有一个constructor属性，默认指向函数本身
2. 每个对象都有一个proto（指针）的属性，属性指向其父类型的prototype

> this
```js 
'use strict'
function test() {
    console.log(this);//undefined
}
test() 
```
> 非严格模式this node->global 浏览器->window
## 惰性函数
---
> 惰性载入表示函数执行的分支只会在函数第一次掉用的时候执行，在第一次调用过程中，该函数会被覆盖为另一个按照合适方式执行的函数，这样任何对原函数的调用就不用再经过执行的分支了。
为了兼容各浏览器，对事件监听的的支持：

```js
function addEvent (type, element, fun) {
    if (element.addEventListener) {
        element.addEventListener(type, fun, false);
    }
    else if(element.attachEvent){
        element.attachEvent('on' + type, fun);
    }
    else{
        element['on' + type] = fun;
    }
}
```
上面是注册函数监听的各浏览器兼容函数。由于，各浏览之间的差异，不得不在用的时候做能力检测。显然，单从功能上讲，已经做到了兼容各浏览器。但是，每次绑定监听，都会对能力做一次检测，这就没有必要了，真正的应用中，这显然是多余的，同一个应用环境中，只需要检测一次即可。

于是有了如下改变：
``` js
function addEvent (type, element, fun) {
    if (element.addEventListener) {
        addEvent = function (type, element, fun) {
            element.addEventListener(type, fun, false);
        }
    }
    else if(element.attachEvent){
        addEvent = function (type, element, fun) {
            element.attachEvent('on' + type, fun);
        }
    }
    else{
        addEvent = function (type, element, fun) {
            element['on' + type] = fun;
        }
    }
    return addEvent(type, element, fun);
}

```
可以看出，第一次调用addEvent会对浏览器做能力检测，然后，重写了addEvent。下次再调用的时候，由于函数被重写，不会再做能力检测。

## 柯里化 : 一种允许使用部分参数生成函数的方式
---
```js
function isType(type) {
    return function (obj) {
        console.log(obj);
        return Object.prototype.toString.call(obj) === '[object ' + type + ']'
    }
}
var isNumber = isType('Number');

console.log(isNumber(1));
console.log(isNumber('s'));

var isArray = isType('Array');
console.log([1,2,3])

```
## 测试题
---
```js
var nane = 'xiaoming';
function A(name) {
    console.log(name);//3 
    this.name = name;
    var name = '1'
}
A.prototype.name = '2';
var a = new A("3");
console.log(a.name);//3 this会优先找实例化的对象
delete a.name;
console.log(a.name);//2 delete 是整个a上面的name 所以只能继续往上找


 function fun(n, o) {
    console.log(o);
    return {
        fun: function (m) {
            console.log(m, n);

        }
    }
}
var a = fun(0); //undifinde
a.fun(1); //1,0
a.fun(2); //2,0
var b = fun(0).fun(1).fun(2).fun(3); // 1,0 VM1302:1 Uncaught TypeError: Cannot read property 'fun' of undefined
var c = fun(0).fun(1); //1,0
c.fun(2);/// 1,0 VM1302:1 Uncaught TypeError: Cannot read property 'fun' of undefined
c.fun(3);// / 1,0 VM1302:1 Uncaught TypeError: Cannot read property 'fun' of undefined

```
