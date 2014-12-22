---
layout: post
title:  "win8系统下使用jekyll在github上写博客"
date:   2014-12-15
categories: cygwin github-page jekyll
tags: win8 cygwin ruby jekyll bundler github-page
---
决定在github上开始写博，并且使用github pages支持的[jekyll][jekyll]来生成页面。对于习惯于windows环境的人来说，要完成这一目标，需要解决几个问题：

1. [创建Github-Page](#Github-Page)
1. [安装cygwin](#cygwin)
2. [安装ruby](#ruby)
3. [安装使用jekyll](#jekyll)
3. [安装包管理器bundler](#bundler)
4. [安装github-pages-gem](#github-pages-gem)
5. [运行jekyll-serve服务](#jekyll-serve)
6. [下载github-pages仓库](#github-pages)
7. [提交代码到github](#github)

> 如果你想得到你从未拥有过的东西，那么你必须去做你从未做过的事

---

## 创建Github-Page
创建Github-Page其实很轻松，直接打开[Github][github]网站就能完成，Github也提供了完整的[教程][Creating-Pages]来协助用户。
以我的github为例，步骤如下：

1. 进入github创建一个新的仓库
2. 在`Repository name`输入仓库名
  * 创建用户首页，输入`kiinlam.github.io`，`kiinlam`替换为自己的用户名
  * 创建某个项目首页，输入项目名
3. 点击`Create repository`按钮创建
4. 点击右侧边栏中的`Settings`进入项目设置页面
5. 滚到下方，点击`Automatic page generator`按钮，自动生成page
6. 滚到下方，点击`Continue to layouts`按钮，选择模板
7. 点击右边的`Publish page`发布page，完成创建

个人首页将生成`master`分支，访问地址为`http://kiinlam.github.io`，项目首页将生成`gh-pages`分支，访问地址为`http://kiinlam.github.io/projectname`。个人首页与项目首页可以相互转换，只需要在`Settings`里进行设置，修改`Repository name`和分支即可。

你也可以直接进入已存在仓库的`Settings`里来生产项目首页，从步骤4开始。

---

## 安装cygwin。
[cygwin][cygwin]是一个在windows平台上运行的类UNIX模拟环境，可以搭建基础的开发环境。

基本步骤

* 在cygwin网站下载适合自己系统的安装包
* 选择Install from Internet
* 选择安装路径
* 选择下载的包存放路径
* 根据网络选择连接方式
* 选择镜像，国内建议用网易163/淘宝/中科大ustc的镜像
* 选择要安装的包，在保持默认的基础上，补充安装开发环境包Devel（即development）和Web下的wget（用来下载东西）
* 开始下载与安装

---

## 安装ruby
虽然cygwin提供了ruby的安装包下载，但我在使用时却经常遇到奇怪的问题，最后选择自己[下载ruby][ruby]来编译安装。

{% highlight bash linenos %}
# 下载（建议使用最新稳定版本）
$ wget http://cache.ruby-lang.org/pub/ruby/2.1/ruby-2.1.5.tar.gz
# 解压
$ tar xf ruby-2.1.5.tar.gz
# 进入文件夹
$ cd ruby-2.1.5
# 配置
$ ./configure
# 编译
$ make
# 安装
$ make install
# 检查是否成功，有输出版本号即成功
$ ruby -v
{% endhighlight %}

---

## 安装使用jekyll

安装jekyll后，可以方便的生成基本的文件架构，相当于一套简易的模板，你后期的开发只需要在这个模板上进行就可以了。在[jekyll][jekyll]网站可以找到更多资料。

    # 安装jekyll
    $ gem install jekyll
    # 新建一个项目，文件夹名为`kiinlam`
    $ jekyll new kiinlam
    # 进入项目
    $ cd kiinlam
    # 开启服务
    $ jekyll serve

浏览器访问`http://localhost:4000`或`127.0.0.1:4000`，即可看到页面。

如果出现`Liquid Exception: No such file or directory - C:\Windows\system32\cmd.exe in _posts/2014-12-14-welcome-to-jekyll.markdown`的错误提示，是因为默认生成的文章里使用了语法高亮的原因，可能与pygments插件版本有关，但在github上是正常的。建议解决方法是在`_config.yml`文件里加上一行`highlighter: null`来关闭语法高亮功能，在提交到github上时注释掉即可。

---

## 安装包管理器bundler
为了使用并最大程度的接近Github Pages的效果，需要安装[GitHub Pages Gem][GitHub-Pages-Gem]，使用bundler可以方便的进行管理。

只需要一个命令即可。

    # 安装bundler
    $ gem install bundler

---

## 安装github-pages-gem
github-pages-gem用于配置、维护本地jekyll环境并与GitHub Page环境同步，可以极大的简化了很多麻烦的步骤。

1. 在项目根目录创建新文件`Gemfile`
2. 加入以下内容到`Gemfile`文件中

        source 'https://rubygems.org'
        require 'json'
        require 'open-uri'
        versions = JSON.parse(open('https://pages.github.com/versions.json').read)
        gem 'github-pages', versions['github-pages']

3. 执行命令`bundle install`

---

## 运行jekyll-serve服务
执行以下命令可开启本地jekyll服务，默认端口为`4000`。

    $ bundle exec jekyll serve

然后用浏览器访问`http://localhost:4000`或`127.0.0.1:4000`。

要保持与github上的环境一致，只需要执行更新命令`bundle update`。

---

## 下载github-pages仓库
以上步骤完成了本地jekyll的开发，接下来要做的，就是把github上的仓库下载到本地，然后本地安装jekyll，修改配置文件，运行本地服务。

    # 克隆仓库代码到文件夹`kiinlam.github.io`，以我的github个人首页仓库为例
    $ git clone https://github.com/kiinlam/kiinlam.github.io kiinlam.github.io
    # 将*安装使用jekyll*那一节创建的文件夹里的所有内容复制过来，在windows系统里轻松解决
    # 进入文件夹
    $ cd kiinlam.github.io
    # 创建`Gemfile`文件
    $ touch Gemfile
    # 写入以下内容(`shift+enter`可以换行)
        $ echo "source 'https://rubygems.org'
        > require 'json'
        > require 'open-uri'
        > versions = JSON.parse(open('https://pages.github.com/versions.json').read)
        > gem 'github-pages', versions['github-pages']" > Gemfile
    # 安装github-pages-gem
    $ bundle install
    # 启动服务
    $ bundle exec jekyll serve

现在打开`127.0.0.1:4000`就可以看到页面了，记得把语法高亮的配置设为`null`。


---

## 提交代码到github

第一次使用push时，需要创建SSH key，参考[github提供的帮助][generating-ssh-keys]。

执行`ssh-add`时如果出现Could not open a connection to your authentication agent，需先输入命令

    $ ssh-agent bash

在项目根目录下，使用git提交代码

    # 加入所有新增文件
    $ git add .
    # 提交变化
    $ git commit -m 'add files'
    # 配置参数，替换命令中的email和名字为你自己的
    $ git config --global user.email "yourname@gmail.com"
    $ git config --global user.name "yourname"
    # 设置远程仓库地址，github通常使用SSH地址，替换最后的git地址
    $ git remote set-url origin git@github.com:kiinlam/kiinlam.github.io.git
    # 推送代码到github
    $ git push



---

## 参考资料
* [github help][github-help]
* [Generate A Site For Your Project](https://pages.github.com/)
* [Using Jekyll with Pages](https://help.github.com/articles/using-jekyll-with-pages/)
* [Deploying Jekyll to GitHub Pages][github-pages-gem-doc]
* [使用Github Pages建独立博客](http://beiyuu.com/github-pages/)
* [在Cygwin下配置 jekyll bootstrap](http://xialuxing.com/2012/05/11/cygwin-jekyll-bootstrap/)


[jekyll]:           http://jekyllrb.com
[github-pages-gem-doc]: http://jekyllrb.com/docs/github-pages/
[github-help]:      https://help.github.com/
[jekyll-gh]:        https://github.com/jekyll/jekyll
[jekyll-help]:      https://github.com/jekyll/jekyll-help
[cygwin]:           https://cygwin.com/
[ruby]:             https://www.ruby-lang.org/zh_cn/
[github]:           http://www.github.com/
[GitHub-Pages-Gem]: https://github.com/github/pages-gem
[Creating-Pages]:   https://help.github.com/articles/creating-pages-with-the-automatic-generator/
[generating-ssh-keys]: https://help.github.com/articles/generating-ssh-keys/
