---
layout: post
title:  "win8系统下使用jekyll在github上写博客"
date:   2014-12-15 01:24:27
categories: cygwin github-page jekyll
---
决定在github上开始写博，并且使用github pages支持的[jekyll][jekyll]来生成页面。对于习惯于windows环境的人来说，要完成这一目标，需要解决几个问题：

1. [安装cygwin](#安装cygwin)
2. 安装ruby
3. 安装包管理器bundler
4. 安装github-pages-gem
5. 运行jekyll服务
6. 使用git管理github-pages仓库

解决以上问题后，就可以开始专注写博了。

> 如果你想得到你从未拥有过的东西，那么你必须去做你从未做过的事

## 安装cygwin。
[cygwin][cygwin]是一个在windows平台上运行的类UNIX模拟环境
You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `jekyll serve`, which launches a web server and auto-regenerates your site when a file is updated.

To add new posts, simply add a file in the `_posts` directory that follows the convention `YYYY-MM-DD-name-of-post.ext` and includes the necessary front matter. Take a look at the source for this post to get an idea about how it works.

Jekyll also offers powerful support for code snippets:

{% highlight ruby %}
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
{% endhighlight %}

Check out the [Jekyll docs][jekyll] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll’s dedicated Help repository][jekyll-help].

[jekyll]:      http://jekyllrb.com
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-help]: https://github.com/jekyll/jekyll-help
[cygwin]: https://cygwin.com/
[GitHub-Pages-Gem]: https://github.com/github/pages-gem
