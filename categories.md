---
layout: page
title: Categories
permalink: /categories/
---

{% for category in site.categories %}
<h4>{{ category | first }}<span>({{ category | last | size }})</span></h4>
<ul class="arc-list">
    {% for post in category.last %}
        <li><a href="{{ post.url }}">{{ post.title }}</a> <small>{{ post.date | date:"%d/%m/%Y"}}</small></li>
    {% endfor %}
</ul>
{% endfor %}