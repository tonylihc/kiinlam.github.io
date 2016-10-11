---
layout: post
title:  gulp插件
date:   2016-10-11
categories: gulp
tags: gulp plugin
---

## 插件

### 自动加载插件模块

`gulp-load-plugins`

[http://npm.taobao.org/package/gulp-load-plugins](http://npm.taobao.org/package/gulp-load-plugins)

`npm install -–save-dev gulp-load-plugins`

    // 自动加载package.json中的插件，并将插件作为plugins的属性
    // 属性名为插件的驼峰式命名，gulp-ruby-sass将被加载成plugins.rubySass
    // 仅在回调函数中使用到时才加载(lazyLoad)
    var gulp = require('gulp'),
        gulpLoadPlugins = require('gulp-load-plugins'),
        plugins = gulpLoadPlugins();

    gulp.task('js', function () {
       return gulp.src('js/*.js')
          .pipe(plugins.jshint())
          .pipe(plugins.jshint.reporter('default'))
          .pipe(plugins.uglify())
          .pipe(plugins.concat('app.js'))
          .pipe(gulp.dest('build'));
    });


### 压缩图片

`gulp-imagemin`

[http://npm.taobao.org/package/gulp-imagemin](http://npm.taobao.org/package/gulp-imagemin)

`npm install --save-dev gulp-imagemin`

    const gulp = require('gulp');
    const imagemin = require('gulp-imagemin');
    const pngquant = require('imagemin-pngquant');
    
    gulp.task('default', () => {
        return gulp.src('src/images/*')
            .pipe(imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant()]
            }))
            .pipe(gulp.dest('dist/images'));
    });


### 添加浏览器前缀到CSS

`gulp-autoprefixer`

`npm install --save-dev gulp-autoprefixer`

[http://npm.taobao.org/package/gulp-autoprefixer](http://npm.taobao.org/package/gulp-autoprefixer)

    var gulp = require('gulp');
    var autoprefixer = require('gulp-autoprefixer');
    
    gulp.task('default', function () {
        return gulp.src('src/app.css')
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(gulp.dest('dist'));
    });


### 压缩css文件

`gulp-cssnano`

[http://npm.taobao.org/package/gulp-cssnano](http://npm.taobao.org/package/gulp-cssnano)

`npm install --save-dev gulp-cssnano`

    var gulp = require('gulp');
    var cssnano = require('gulp-cssnano');
    
    gulp.task('default', function() {
        return gulp.src('./main.css')
            .pipe(cssnano())
            .pipe(gulp.dest('./out'));
    });


### 编译 Sass

`gulp-ruby-sass`

[http://npm.taobao.org/package/gulp-ruby-sass](http://npm.taobao.org/package/gulp-ruby-sass)

`npm install --save-dev gulp-ruby-sass`

    var gulp = require('gulp');
    var sass = require('gulp-ruby-sass');
    
    gulp.task('sass', function () {
      return sass('source/file.scss')
        .on('error', sass.logError)
        .pipe(gulp.dest('result'));
    });


### 压缩JavaScript文件

`gulp-uglify`

[http://npm.taobao.org/package/gulp-uglify](http://npm.taobao.org/package/gulp-uglify)

`npm install --save-dev gulp-uglify`

    var gulp = require('gulp'),
       uglify = require('gulp-uglify');
    
    gulp.task('minify', function () {
       gulp.src('js/app.js')
          .pipe(uglify())
          .pipe(gulp.dest('build'))
    });


### 检查JavaScript文件

`gulp-jshint`

[http://npm.taobao.org/package/gulp-jshint](http://npm.taobao.org/package/gulp-jshint)

`npm install --save-dev gulp-jshint`


### 合并文件

`gulp-concat`

[http://npm.taobao.org/package/gulp-concat](http://npm.taobao.org/package/gulp-concat)

`npm install --save-dev gulp-concat`

    var concat = require('gulp-concat');
    gulp.task('scripts', function() {
      return gulp.src('./lib/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/'));
    });

指定顺序

    var concat = require('gulp-concat');
    gulp.task('scripts', function() {
      return gulp.src(['./lib/file3.js', './lib/file1.js', './lib/file2.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/'));
    });


### 浏览器重加载

#### livereload

`gulp-livereload`

[http://npm.taobao.org/package/gulp-livereload](http://npm.taobao.org/package/gulp-livereload)

livereload需要浏览器扩展支持

    // 监听文件的变化，生成css，重新加载网页
    var gulp = require('gulp'),
        less = require('gulp-less'),
        livereload = require('gulp-livereload'),
        watch = require('gulp-watch');
    
    gulp.task('less', function() {
       gulp.src('less/*.less')
          .pipe(watch())
          .pipe(less())
          .pipe(gulp.dest('css'))
          .pipe(livereload());
    });

#### browser-sync

`browser-sync`

[http://npm.taobao.org/package/browser-sync](http://npm.taobao.org/package/browser-sync)

`npm install --save-dev browser-sync`

`browser-sync`与`LiveReload`非常相似，但是它有更多的功能。改变代码时，`BrowserSync`会重新加载页面，如果是css文件，则直接添加进css中，页面并不需要再次刷新。在开发单页面应用时尤其高效。`BrowserSync`也可以在不同浏览器之间同步点击翻页、表单操作、滚动位置。

    var gulp = require('gulp'),
        browserSync = require('browser-sync');

    gulp.task('browser-sync', function () {
       var files = [
          'app/**/*.html',
          'app/assets/css/**/*.css',
          'app/assets/imgs/**/*.png',
          'app/assets/js/**/*.js'
       ];
    
       browserSync.init(files, {
          server: {
             baseDir: './app'
          }
       });
    });


### gulp-usemin

`gulp-usemin`

`npm install --save-dev gulp-usemin`

[http://npm.taobao.org/package/gulp-usemin](http://npm.taobao.org/package/gulp-usemin)

[https://github.com/zont/gulp-usemin](https://github.com/zont/gulp-usemin)

    var usemin = require('gulp-usemin');
    var uglify = require('gulp-uglify');
    var minifyHtml = require('gulp-minify-html');
    var minifyCss = require('gulp-minify-css');
    var rev = require('gulp-rev');
    
    
    gulp.task('usemin', function() {
      return gulp.src('./*.html')
        .pipe(usemin({
          css: [ rev() ],
          html: [ minifyHtml({ empty: true }) ],
          js: [ uglify(), rev() ],
          inlinejs: [ uglify() ],
          inlinecss: [ minifyCss(), 'concat' ]
        }))
        .pipe(gulp.dest('build/'));
    });


### 获取变动的文件信息

`gulp-watch-path`

`npm install --save-dev gulp-watch-path`

[http://npm.taobao.org/package/gulp-watch-path](http://npm.taobao.org/package/gulp-watch-path)

    gulp.watch('src/**/*', function (event) {
        var paths = require('gulp-watch-path')(event, 'src/', 'dist/', 'node');
        console.log(paths)
        /*
        paths {srcPath: 'src/file.js',
              srcDir: 'src/',
              distPath: 'dist/file.node',
              distDir: 'dist/',
              srcFilename: 'file.js',
              distFilename: 'file.node' }
        */
        gulp.src(paths.srcPath)
            .pipe(uglify())
            .pipe(gulp.dest(paths.distDir))
    })


### stream-combiner2

`stream-combiner2`

[http://npm.taobao.org/package/stream-combiner2](http://npm.taobao.org/package/stream-combiner2)

    var Combine = require('stream-combiner')
    var es      = require('event-stream')
    
    Combine(                                  // connect streams together with `pipe`
      process.openStdin(),                    // open stdin
      es.split(),                             // split stream to break on newlines
      es.map(function (data, callback) {      // turn this async function into a stream
        var repr = inspect(JSON.parse(data))  // render it nicely
        callback(null, repr)
      }),
      process.stdout                          // pipe it to stdout !
    )


### gulp-sourcemaps

`gulp-sourcemaps`

[http://npm.taobao.org/package/gulp-sourcemaps](http://npm.taobao.org/package/gulp-sourcemaps)

    var gulp = require('gulp');
    var plugin1 = require('gulp-plugin1');
    var plugin2 = require('gulp-plugin2');
    var sourcemaps = require('gulp-sourcemaps');
    
    gulp.task('javascript', function() {
      gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
          .pipe(plugin1())
          .pipe(plugin2())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
    });


### browserify

`browserify `

`npm install browserify --save-dev`

[http://npm.taobao.org/package/browserify](http://npm.taobao.org/package/browserify)


### vinyl-source-stream

`vinyl-source-stream`

### vinyl-buffer

`vinyl-buffer`

### gulp-plumber

### gulp-util