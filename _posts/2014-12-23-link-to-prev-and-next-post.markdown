---
layout: post
title:  在jekyll的Post中链接到上一篇、下一篇文章
date:   2014-12-23
categories: jekyll
tags: jekyll
---

通常在文章底部都会放上前往上一篇或下一盘文章的链接，jekyll中也可以轻松实现，主要用到两个变量： `page.previous` 和 `page.next`。

在当前文章可以访问 `page` 对象，通过 `page.previous` 和 `page.next` 这两个属性，可以获取到当前文章的上一篇、下一篇文章的引用，均含有以下属性：

    # 作者
    "author"=>"Kiinlam",
    # 元信息
    "meta"=>"",
    # 布局
    "layout"=>"post",
    # 标题
    "title"=>"在jekyll中创建自定义页面",
    # 日期
    "date"=>2014-12-22 00:00:00 +0800,
    # 分类
    "categories"=>["jekyll"],
    # 标签
    "tags"=>["jekyll"],
    # 地址
    "url"=>"/creating-pages-in-jekyll",
    # 目录
    "dir"=>"/",
    # 文章id
    "id"=>"/creating-pages-in-jekyll",
    # 下一篇，空的
    "next"=>,
    # 上一篇，空的
    "previous"=>,
    # 文件路径
    "path"=>"_posts/2014-12-22-creating-pages-in-jekyll.markdown",
    # 文章内容
    "content"=>""
    # 摘要
    "excerpt"=>""

创建链接需要的东西都在里面，直接取，代码如下：

    {% raw %}
    <div class="post-recent">
      {% if page.previous %}
        <p>上一篇 <a href="{{ page.previous.url | prepend: site.baseurl }}">{{ page.previous.title }}</a></p>
      {% endif %}
      {% if page.next %}
        <p>下一篇 <a href="{{ page.next.url | prepend: site.baseurl }}">{{ page.next.title }}</a></p>
      {% endif %}
    </div>
    {% endraw %}

将以上代码复制到 `_layouts` 下的 `post.html` 里即可在文章里显示上一篇、下一篇文章了。

---

## 参考资料
* [jekyll variables][variables]


[jekyll]:      http://jekyllrb.com
[variables]:   http://jekyllrb.com/docs/variables/