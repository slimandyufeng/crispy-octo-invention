# 你不知道的HTML

## 1．开发工具

推荐 Sublime Text （最主要的优点：轻量、性能高）

插件推荐：
Emmet
概括地说，Emmet（译者注：前身就是以前大名鼎鼎的Zen Coding，这个如果你没听说和使用过，就悲哀了）是一个可以让你更快更高效地编写HTML和CSS，节省你大量时间的插件。怎么使用？你只需按约定的缩写形式书写而不用写整个代码，然后按“扩展”键，这些缩写就会自动扩展为对应的代码内容。

Material Theme
主题插件，界面看起来清爽优化。

Comic Sans MS
这个是英文字体，一个看起来舒服的英文字体，能够让开发在写代码时，心情更加愉悦。比如说，后面这段调皮的代码：
  console.info("Hello World");

备注：统一编辑器的好处

  1)作为团队开发，统一的编辑器可以尽量减少团队的沟通的成本。
  2)好的编辑器能够提高团队的开发效率，无论从写代码的角度，还是审美的角度。

## 前端跨域请求解决方案

1. 什么是同源
2. 浏览器不同的域名不能访问对应的cookie但是内部的表单没有限制
3. 同源策略限制的对象（跨域）
4. 如何设置同源策略（hosts）
5. 怎么突破同源策略

### 同源策略

先来说说什么是源？  
源（origin）就是协议、域名和端口号。

同源策略是浏览器的一个安全功能，不同源的客户端脚本在没有明确授权的情况下，不能读写对方资源。所以a.com下的js脚本采用ajax读取b.com里面的文件数据是会报错的。

同源就是：
* 协议相同
* 域名相同
* 端口号相同

以上url中的源就是：`http://www.company.com:80`  
若地址里面的协议、域名和端口号均相同则属于同源。  
以下是相对于 `http://www.a.com/test/index.html` 的同源检测

* `http://www.a.com/dir/page.html` ----成功
* `http://www.child.a.com/test/index.html` ----失败，域名不同
* `https://www.a.com/test/index.html` ----失败，协议不同
* `http://www.a.com:8080/test/index.html` ----失败，端口号不同

不受同源策略限制的：
1. 页面中的链接，重定向以及表单提交是不会受到同源策略限制的。
2. 跨域资源的引入是可以的。但是js不能读写加载的内容。如嵌入到页面中的`<script src="..."></script>，<img>，<link>，<iframe>`等。

### 跨域

1、什么是跨域
受前面所讲的浏览器同源策略的影响，不是同源的脚本不能操作其他源下面的对象。想要操作另一个源下的对象是就需要跨域。

2、跨域的实现形式
降域 document.domain
同源策略认为域和子域属于不同的域，如：
* child1.a.com 与 a.com，
* child1.a.com 与 child2.a.com，
* xxx.child1.a.com 与 child1.a.com

两两不同源，可以通过设置 document.damain='a.com'，浏览器就会认为它们都是同一个源。想要实现以上任意两个页面之间的通信，两个页面必须都设置documen.damain='a.com'。
此方式的特点：
1. 只能在父域名与子域名之间使用，且将 xxx.child1.a.com域名设置为a.com后，不能再设置成child1.a.com。
2. 存在安全性问题，当一个站点被攻击后，另一个站点会引起安全漏洞。
3. 这种方法只适用于 Cookie 和 iframe 窗口。

JSONP跨域  
JSONP和JSON并没有什么关系！

JSONP的原理：

举例：`a.com/jsonp.html`想得到`b.com/main.js`中的数据在`a.com`的`jsonp.html`里创建一个回调函数xxx，动态添加`<script>`元素，向服务器发送请求，请求地址后面加上查询字符串，通过callback参数指定回调函数的名字。请求地址为`http://b.com/main.js?callback=xxx`。
在main.js中调用这个回调函数xxx，并且以JSON数据形式作为参数传递，完成回调。我们来看看代码：

javascript写法

``` javascript
 function addScriptTag(src) {
  var script = document.createElement('script');
  script.setAttribute("type","text/javascript");
  script.src = src;
  document.body.appendChild(script);
}

window.onload = function () {
  addScriptTag('http://example.com/ip?callback=foo');
}

function foo(data) {
  console.log('Your public IP address is: ' + data.ip);
};

```

## html语义化

### 1、什么是HTML语义化？

<基本上都是围绕着几个主要的标签，像标题（H1~H6）、列表（li）、强调（strong em）等等>

根据内容的结构化（内容语义化），选择合适的标签（代码语义化）便于开发者阅读和写出更优雅的代码的同时让浏览器的爬虫和机器很好地解析。

### 2、为什么要语义化？

1. 为了在没有CSS的情况下，页面也能呈现出很好地内容结构、代码结构:为了裸奔时好看；
2. 用户体验：例如title、alt用于解释名词或解释图片信息、label标签的活用；
3. 有利于SEO：和搜索引擎建立良好沟通，有助于爬虫抓取更多的有效信息：爬虫依赖于标签来确定上下文和各个关键字的权重；
4. 方便其他设备解析（如屏幕阅读器、盲人阅读器、移动设备）以意义的方式来渲染网页；
5. 便于团队开发和维护，语义化更具可读性，是下一步吧网页的重要动向，遵循W3C标准的团队都遵循这个标准，可以减少差异化。

### 3、写HTML代码时应注意什么？

1. 尽可能少的使用无语义的标签div和span；
2. 在语义不明显时，既可以使用div或者p时，尽量用p, 因为p在默认情况下有上下间距，对兼容特殊终端有利；
3. 不要使用纯样式标签，如：b、font、u等，改用css设置。
4. 需要强调的文本，可以包含在strong或者em标签中（浏览器预设样式，能用CSS指定就不用他们），strong默认样式是加粗（不要用b），em是斜体（不用i）；
5. 使用表格时，标题要用caption，表头用thead，主体部分用tbody包围，尾部用tfoot包围。表头和一般单元格要区分开，表头用th，单元格用td；
6. 表单域要用fieldset标签包起来，并用legend标签说明表单的用途；
7. 每个input标签对应的说明文本都需要使用label标签，并且通过为input设置id属性，在lable标签中设置for=someld来让说明文本和相对应的input关联起来。

### 4、HTML5新增了哪些语义标签

在HTML 5出来之前，我们用div来表示页面章节，但是这些div都没有实际意义。（即使我们用css样式的id和class形容这块内容的意义）。这些标签只是我们提供给浏览器的指令，只是定义一个网页的某些部分。但现在，那些之前没“意义”的标签因为因为html5的出现消失了，这就是我们平时说的“语义”。
### 5、以下是最基本的操作
``` html
  <header></header>
  <div>
    <section>
      <nav>
        www.baidu.com
      </nav>
      <aside></aside>
    </section>
  </div>
  <footer></footer>
```
### 6 、尽量少写html 一定要少写html：
  第一，减少DOM渲染时间， 浪费整个文件大小
    一个html最少顶3个元素
### 7 、高阶WebSocket postMessage(ifarame image) 参考地址
[跨域问题] (http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)
[图片压缩成base64位，可实现攻击转换为可执行代码] (http://www.jb51.net/article/102767.htm)
