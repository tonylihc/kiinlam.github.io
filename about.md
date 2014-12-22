---
layout: page
title: About
permalink: /about/
---

{% for category in site.categories %}
<h4>{{ category | first }}<span>({{ category | last | size }})</span></h4>
<ul class="arc-list">
    {% for post in category.last %}
        <li><a href="{{ post.url }}">{{ post.title }}</a> <small>{{ post.date | date:"%d/%m/%Y"}}</small></li>
    {% endfor %}
</ul>
{% endfor %}

{% for tag in site.tags %}
<a href="?tag={{ tag[0] }}"> {{ tag[0] }}</a>
{% endfor %}

This is the base Jekyll theme. You can find out more info about customizing your Jekyll theme, as well as basic Jekyll usage documentation at [jekyllrb.com](http://jekyllrb.com/)

You can find the source code for the Jekyll new theme at: [github.com/jglovier/jekyll-new](https://github.com/jglovier/jekyll-new)

You can find the source code for Jekyll at [github.com/jekyll/jekyll](https://github.com/jekyll/jekyll)
