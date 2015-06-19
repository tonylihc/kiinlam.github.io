---
layout: post
title:  nodejs请求转发
date:   2015-06-19
categories: nodejs
tags: nodejs
---

初学，拿来练手，nodejs代理有成熟方案：[node-http-proxy][node-http-proxy]，推荐使用。（据说更好的代理服务器是nginx）

# 问题

客户端（浏览器）通过ajax请求第三方服务器，会遇到跨域问题，可通过nodejs服务器做中介来解决跨域问题。

# 解决方案

客户端发起请求到nodejs服务器，nodejs收到后请求第三方服务器取得数据，返回给客户端。

    client ajax --> nodejs recived --> nodejs send request --> respone to client

# 范例

## 不使用外部package的代码

```javascript
var http = require('http');
// 创建http服务
var app = http.createServer(function (req, res) {
    // 查询本机ip
    var sreq = http.request({
        host:     'sneezryworks.sinaapp.com',
        path:     '/ip.php',
        method:   req.method
    }, function(sres){
        sres.pipe(res);
        sres.on('end', function(){
            console.log('done');
        });
    });
    if (/POST|PUT/i.test(req.method)) {
        req.pipe(sreq);
    } else {
        sreq.end();
    }
});
// 访问127.0.0.1:3001查看效果
app.listen(3001);
console.log('server started on 127.0.0.1:3001');
```

## 使用[superAgent][superagent]的代码

```javascript
var http = require('http');
// 创建http服务
var app = http.createServer(function (req, res) {
    // 使用了superagent来发起请求
    var superagent = require('superagent');
    // 查询本机ip
    var sreq = superagent.get('http://sneezryworks.sinaapp.com/ip.php');
    sreq.pipe(res);
    sreq.on('end', function(){
        console.log('done');
    });
});
// 访问127.0.0.1:3001查看效果
app.listen(3001);
console.log('server started on 127.0.0.1:3001');
```

## 使用[Express][expressjs] + [superAgent][superagent]的代码

```javascript
var express = require('express');
var app = express();
app.get('/', function (req, res) {
    // 使用了superagent来发起请求
    var superagent = require('superagent');
    // 查询本机ip
    var sreq = superagent.get('http://sneezryworks.sinaapp.com/ip.php');
    sreq.pipe(res);
    sreq.on('end', function(){
        console.log('done');
    });
});
app.listen(3001);
console.log('Express started on 127.0.0.1:3001');
```

# 后记

如果需要对第三方服务器返回的内容做处理，可以在`sreq`的`data`事件的回调方法中进行，而不是直接使用`pipe`方式。

# TODO

代理重定向：接收到客户端ajax请求后，重定向到第三方服务器，后续通信不再需要nodejs介入，实现nodejs server搭桥牵线功能，如果可以实现（估计已经实现），对文件上传到第三方服务器很有帮助吧。

# 补充

以前没搞过服务器，对请求转发、请求代理、反向代理这类东西不熟悉，如果叫法有误，烦请指正，顺便求科普下 :p

- - -

## 参考资料
* [简单的HTTP代理服务器][http-proxy-server]
* [superagent][superagent]
* [[译] SuperAgent中文使用文档](https://cnodejs.org/topic/5378720ed6e2d16149fa16bd)
* [用Node.js写一个简易的前端开发工具](https://cnodejs.org/topic/511b71d0df9e9fcc58e60933)
* [分享一个入门的小实践：nodejs 做 http proxy 透明转发](https://cnodejs.org/topic/530f41e75adfcd9c0f1c8c16)
* [用NodeJS实现HTTP/HTTPS代理](https://cnodejs.org/topic/4f16442ccae1f4aa27001101)
* [用NodeJS实现HTTP/HTTPS代理——续](https://cnodejs.org/topic/52e74ad178990b04116c1aeb)
* [nodejs通过代理(proxy)发送http请求(request)](https://cnodejs.org/topic/50d41da5637ffa4155f63179)

[http-proxy-server]: https://cnodejs.org/topic/50ffd370df9e9fcc58120105#5100c3d1df9e9fcc5837a3f3
[superagent]: http://visionmedia.github.io/superagent/
[expressjs]: http://expressjs.com/
[node-http-proxy]: https://github.com/nodejitsu/node-http-proxy