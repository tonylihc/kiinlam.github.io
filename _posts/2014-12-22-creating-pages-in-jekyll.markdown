---
layout: post
title:  在jekyll中创建自定义页面
date:   2014-12-22
categories: jekyll
tags: jekyll
---

在jekyll博客系统中创建自定义页面，有两种基本方式：

1. [在root下创建](#root)
2. [在folder下创建](#folder)

---

## 在root下创建
最直接的方式是在根目录root下创建HTML文件，对应生成的访问地址如下：

    .
    |-- _config.yml
    |-- _includes/
    |-- _layouts/
    |-- _posts/
    |-- _site/
    |-- about.html    # => http://example.com/about.html
    |-- index.html    # => http://example.com/
    └── contact.html  # => http://example.com/contact.html

在根目录下的HTML文件，访问地址格式为：域名+文件名+扩展名。

---

## 在folder下创建
有些人不喜欢在网址里出现被访问的文件+扩展名，那么可以采用第二种方式，在根目录下创建文件夹，然后在每个文件夹下创建`index.html`文件。这种方式产生的网址可以不出现文件+扩展名，只出现目录名：

    .
    ├── _config.yml
    ├── _includes/
    ├── _layouts/
    ├── _posts/
    ├── _site/
    ├── about/
    |   └── index.html  # => http://example.com/about/
    ├── contact/
    |   └── index.html  # => http://example.com/contact/
    └── index.html      # => http://example.com/

---

## 通过 YAML front matter 自定义网址
第一种方式，会出现文件+扩展名，不美观。第二种方式，虽然美观，但却多创建了文件夹，而且创建的都是`index.html`这样的文件，单纯从文件名上分辨不出内容。

作为有追求的码农，都知道代码简洁与命名直观之道。

同时实现以上两种好处的方法很简单，在根目录下创建任意文件名的HTML文件，并在其 YAML front matter 中设置 `permalink` 与文件名相同即可。

如创建 `contact.html` ，然后在文件顶部设置：

    ---
    layout: page
    title: Contact Me
    permalink: /contact/
    ---

就这么简单。访问地址与第二种方式一样。

    .
    ├── _config.yml
    ├── _includes/
    ├── _layouts/
    ├── _posts/
    ├── _site/
    ├── about.html    # => http://example.com/about/
    ├── contact.html  # => http://example.com/contact/
    └── index.html    # => http://example.com/

鱼与熊掌兼得。

这种方式适合创建独立HTML页面，如果打算创建一个带分页的列表内容，如某分类下的文章列表，则需要采用第二种方法，因为jekyll的分页功能只在 `index.html` 文件里有效。

---

## 参考资料
* [Creating Pages][Creating-Pages]


[jekyll]:           http://jekyllrb.com
[Creating-Pages]:   http://jekyllrb.com/docs/pages/