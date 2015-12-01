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

---

# 将thenable的对象转换为promise对象

    Promise.resolve({
      'then':function(resolve, reject){
        setTimeout(function(){
          if(Math.random()*10 > 5) {
            resolve(1);
          } else {
            reject(0);
          }
        },1000);
      }
    }).then(function(result){
      console.log(result);
    }).catch(function(error){
      console.error(error);
    })

通过 `Promise.resolve(Thenable对象)` 形式将 `Thenable对象` 转为 `Promise对象` 。

重点在于创建具有 `then` 方法的对象，方法参数与 `Promise` 的 `then` 方法一致，在确定时执行 `resolve` 方法，拒绝时调用 `reject` 方法。

Thenable主要是用于 Promise类库 之间的转换

- - -


## 参考资料
* [谈谈使用 promise 时候的一些反模式](http://efe.baidu.com/blog/promises-anti-pattern/)
* [习题JSBin例子](http://jsbin.com/tuqukakawo/1/edit?js,console,output)
* [Javascript Promise 迷你书](http://liubin.github.io/promises-book/)