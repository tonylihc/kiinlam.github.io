---
layout: post
title:  认识promise
date:   2015-11-27
categories: js
tags: js
---

# 问：下面四个使用 promise 的语句之间的不同点在哪儿？

    doSomething().then(function () {
        return doSomethingElse();
    }).then(finalHandler)；

    doSomethin().then(functiuoin () {
        doSomethingElse();
    }).then(finalHandler);

    doSomething().then(doSomethingElse())
        .then(finalHandler);

    doSomething().then(doSomethingElse)
        .then(finalHandler);

# 答：

### Q1

    doSomething().then(function () {
      return doSomethingElse();
    }).then(finalHandler);

    答案：

    doSomething
    |-----------------|
                      doSomethingElse(undefined)
                      |------------------|
                                         finalHandler(resultOfDoSomethingElse)
                                         |------------------|
### Q2

    doSomething().then(function () {
      doSomethingElse();
    }).then(finalHandler);

    答案：

    doSomething
    |-----------------|
                      doSomethingElse(undefined)
                      |------------------|
                      finalHandler(undefined)
                      |------------------|
### Q3

    doSomething().then(doSomethingElse())
      .then(finalHandler);

    答案

    doSomething
    |-----------------|
    doSomethingElse(undefined)
    |---------------------------------|
                      finalHandler(resultOfDoSomething)
                      |------------------|
### Q4

    doSomething().then(doSomethingElse)
      .then(finalHandler);

    答案

    doSomething
    |-----------------|
                      doSomethingElse(resultOfDoSomething)
                      |------------------|
                                         finalHandler(resultOfDoSomethingElse)
                                         |------------------|

- - -


## 参考资料
* [谈谈使用 promise 时候的一些反模式](http://efe.baidu.com/blog/promises-anti-pattern/)
* [习题JSBin例子](http://jsbin.com/tuqukakawo/1/edit?js,console,output)
* [Javascript Promise 迷你书](http://liubin.github.io/promises-book/)