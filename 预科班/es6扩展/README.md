# EcmaScript6
## class
```js
class Person {
    constructor(age) {
        this.age = age;
    }

    tell() {
        console.log(`xiaowang${this.age}`);
    }
}

class Son extends Person {
    constructor(age) {
        super(age)
        this.arr = []
    }
    set menu(data) {
        this.arr.push(data)
    }
    get menu() {
        return this.arr
    }
    tell() {
        super.tell();
        console.log('被重写');
    }

    static init() {
        console.log('这是一个静态方法！');
        
    }
}

let result = new Son('19');
result.tell()
result.menu = '苹果';
console.log(result.menu);
Son.init()
//result.init()这里是不行的 静态方法不能被实例化
```
## Map
```js
let food = new Map();
let fruit = {},cook=function() {};
food.set(fruit,'这是一个🍎')
food.set(cook,'我会做饭')
console.log(food.get(fruit));
console.log(food);
food.delete(fruit);
console.log(food.size);
food.clear();
console.log(food)
```
## Set
```js
let arr = [1,2,2,2];
let arr1 = [...new Set(arr)];
console.log(arr1);
```
## import
```js
//index1.js
let name = 'xiaoming';
let age = 20;
export {name,age};
//index2.js
import {name,age} from './index1.js';

//如果index1.js 用了default
export default{name,age};
//index2.js 就不能用解构了
import data from './index.js';
```
## Symbol
es6引入了新的原始数据类型，表示独一无二的值,表示变量是Symbol类型
Symbol函数前不能使用new命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象