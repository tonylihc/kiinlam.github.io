---
layout: post
title:  gulp的基础用法
date:   2016-04-27
categories: gulp
tags: gulp
---

# gulp

插件页面：[http://gulpjs.com/plugins/](http://gulpjs.com/plugins/)，或者在`npm`搜索`gulpplugin`

taoboa NPM: [http://npm.taobao.org/](http://npm.taobao.org/)

#### 安装

1. 全局安装：npm install -g gulp
2. 项目安装：npm install --save-dev gulp
3. 创建gulpfile.js

## GULP.SRC(glob)

+ js/app.js 精确匹配文件
+ js/*.js 仅匹配js目录下的所有后缀为.js的文件
+ js/*/.js 匹配js目录及其子目录下所有后缀为.js的文件
+ !js/app.js 从匹配结果中排除js/app.js，这种方法在你想要匹配除了特殊文件之外的所有文件时非常管用
+ *.+(js|css) 匹配根目录下所有后缀为.js或者.css的文件

js目录下包含了压缩和未压缩的JavaScript文件，现在我们想要创建一个任务来压缩还没有被压缩的文件，我们需要先匹配目录下所有的JavaScript文件，然后排除后缀为.min.js的文件:

    gulp.src(['js/**/*.js', '!js/**/*.min.js'])


## GULP.WATCH(glob)

监听文件变化执行回调

    // 当文件变化时执行任务数组中的任务build
    gulp.task('watch', function () {
       gulp.watch('templates/*.tmpl.html', ['build']);
    });

或者

    // 当文件变化时执行回调函数，包含事件对象event
    gulp.watch('templates/*.tmpl.html', function (event) {
       console.log('Event type: ' + event.type); // added, changed, or deleted
       console.log('Event path: ' + event.path); // The path of the modified file
    });

`gulp.watch()`返回一个`watcher`对象，`watcher`可以监听事件，或向`watch`中添加文件。

    // 监听change事件
    var watcher = gulp.watch('templates/*.tmpl.html', ['build']);
    watcher.on('change', function (event) {
       console.log('Event type: ' + event.type); // added, changed, or deleted
       console.log('Event path: ' + event.path); // The path of the modified file
    });

可监听事件

+ end 在watcher结束时触发（这意味着，在文件改变的时候，任务或者回调不会执行）
+ error 在出现error时触发
+ ready 在文件被找到并正被监听时触发
+ nomatch 在glob没有匹配到任何文件时触发

`Watcher`对象一些可以调用的方法：

+ watcher.end() 停止watcher（以便停止执行后面的任务或者回调函数）
+ watcher.files() 返回watcher监听的文件列表
+ watcher.add(glob) 将与指定glob相匹配的文件添加到watcher（也接受可选的回调当第二个参数）
+ watcher.remove(filepath) 从watcher中移除个别文件

## 定义任务

参数：任务名称，执行函数

    gulp.task('greet', function () {
       console.log('Hello world!');
    });
    
    // 运行
    gulp greet // Hello world


#### 并行任务
    
    // 运行gulp build时，同时无序执行css、js、imgs三个任务
    gulp.task('build', ['css', 'js', 'imgs']);


#### 串行任务

    // 运行gulp css时，先执行greet任务，结束后执行回调函数
    gulp.task('css', ['greet'], function () {
        // Deal with CSS here
    });

#### 默认任务
    
    // 运行gulp时，执行default任务
    gulp.task('default', function () {
        // Your default task
    });


## 复制文件

    gulp.task('copy', function () {
        gulp.src('src/fonts/**/*')
            .pipe(gulp.dest('dist/fonts/'))
    })